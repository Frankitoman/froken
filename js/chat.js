/* ==========================================================================
   FRØKEN — support assistant (Gemini via proxy)
   ========================================================================== */
(function () {
  'use strict';

  var CHAT_ENDPOINT = 'https://froken-gemini-proxy.francojmansilla.workers.dev';

  function tr(key) { return window.i18n ? window.i18n.t(key) : key; }
  function lang() { return window.i18n ? window.i18n.getLang() : 'en'; }

  var widget = document.getElementById('chatWidget');
  var fab = document.getElementById('chatFab');
  var panel = document.getElementById('chatPanel');
  var closeBtn = document.getElementById('chatClose');
  var messagesEl = document.getElementById('chatMessages');
  var quickEl = document.getElementById('chatQuick');
  var form = document.getElementById('chatForm');
  var input = document.getElementById('chatInput');
  var sendBtn = document.getElementById('chatSend');

  if (!widget || !form) return;

  var history = [];
  var isLoading = false;
  var hasOpenedOnce = false;

  function cleanText(text) {
    return text.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1').replace(/^[•\-]\s?/gm, '').trim();
  }

  function scrollToBottom() { messagesEl.scrollTop = messagesEl.scrollHeight; }

  // Two rAFs, not one: the browser needs a full frame painted at the
  // pre-transition state before the class change is what actually triggers
  // a transition, rather than possibly landing in the same frame and being
  // skipped. Cheaper and more broadly reliable here than @starting-style.
  function settleIn(el) {
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { el.classList.add('is-in'); });
    });
  }

  function addMessage(role, text) {
    var bubble = document.createElement('div');
    bubble.className = 'chat-msg chat-msg--' + role;
    bubble.textContent = text;
    messagesEl.appendChild(bubble);
    settleIn(bubble);
    scrollToBottom();
    return bubble;
  }

  function addTypingIndicator() {
    var bubble = document.createElement('div');
    bubble.className = 'chat-msg chat-msg--assistant chat-msg--typing';
    bubble.innerHTML = '<i></i><i></i><i></i>';
    messagesEl.appendChild(bubble);
    settleIn(bubble);
    scrollToBottom();
    return bubble;
  }

  function resetConversation() {
    history = [];
    hasOpenedOnce = false;
    messagesEl.innerHTML = '';
    quickEl.classList.remove('is-hidden');
    if (widget.classList.contains('is-open')) {
      hasOpenedOnce = true;
      addMessage('assistant', tr('chat_greeting'));
    }
  }

  function openChat() {
    widget.classList.add('is-open');
    fab.setAttribute('aria-expanded', 'true');
    panel.setAttribute('aria-hidden', 'false');
    if (!hasOpenedOnce) {
      hasOpenedOnce = true;
      addMessage('assistant', tr('chat_greeting'));
    }
    setTimeout(function () { input.focus(); }, 300);
  }

  function closeChat() {
    widget.classList.remove('is-open');
    fab.setAttribute('aria-expanded', 'false');
    panel.setAttribute('aria-hidden', 'true');
  }

  fab.addEventListener('click', function () {
    if (widget.classList.contains('is-open')) closeChat(); else openChat();
  });
  closeBtn.addEventListener('click', closeChat);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && widget.classList.contains('is-open')) closeChat();
  });

  function hideQuickChips() { quickEl.classList.add('is-hidden'); }

  quickEl.querySelectorAll('.chat-chip').forEach(function (chip) {
    chip.addEventListener('click', function () {
      var qKey = chip.getAttribute('data-q-key');
      sendMessage(tr(qKey));
    });
  });

  function setLoading(state) {
    isLoading = state;
    sendBtn.disabled = state;
    input.disabled = state;
  }

  function sendMessage(text) {
    text = (text || '').trim();
    if (!text || isLoading) return;

    hideQuickChips();
    addMessage('user', text);
    input.value = '';
    setLoading(true);
    var typingBubble = addTypingIndicator();

    fetch(CHAT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text, history: history, lang: lang() })
    })
      .then(function (res) {
        return res.json().then(function (data) {
          if (!res.ok) throw new Error(data && data.error ? data.error : 'error');
          return data;
        });
      })
      .then(function (data) {
        typingBubble.remove();
        var reply = cleanText(data.reply || tr('chat_fallback_error'));
        addMessage('assistant', reply);
        history.push({ role: 'user', text: text });
        history.push({ role: 'model', text: reply });
        if (history.length > 12) history = history.slice(-12);
      })
      .catch(function () {
        typingBubble.remove();
        addMessage('error', tr('chat_fallback_error'));
      })
      .finally(function () {
        setLoading(false);
        input.focus();
      });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    sendMessage(input.value);
  });

  if (window.i18n) window.i18n.onChange(resetConversation);
})();
