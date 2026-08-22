/* ==========================================================================
   FRØKEN — i18n engine (English / Dansk)
   ========================================================================== */
(function () {
  'use strict';

  var STORAGE_KEY = 'froken_lang';
  var SUPPORTED = ['en', 'da'];

  var DICT = {
    en: {
      meta_title: 'FRØKEN, considered womenswear',
      meta_description: 'FRØKEN is a Copenhagen label for considered, minimal womenswear: quality fabrics, quiet detail, made to last beyond the season.',

      nav_shop: 'Shop',
      nav_outerwear: 'Outerwear',
      nav_knitwear: 'Knitwear',
      nav_dresses: 'Dresses',
      nav_tops: 'Tops',
      nav_accessories: 'Accessories',
      nav_about: 'About',
      nav_contact: 'Contact',
      nav_cart_aria: 'Open cart',

      hero_eyebrow: 'Autumn/Winter Collection',
      hero_title_1: 'Considered',
      hero_title_2: 'by design.',
      hero_lead: 'Quiet, precise clothing for women who buy less and wear it longer. Made from natural fibres, cut for real life.',
      hero_cta: 'Shop the collection',
      hero_cta_secondary: 'Our philosophy',

      tension_line: 'Most clothing is worn a handful of times before it is replaced.',

      cat_heading_eyebrow: 'Shop by category',
      cat_heading: 'Five categories. No noise.',
      cat_outerwear_desc: 'Coats and jackets built to be worn for years.',
      cat_knitwear_desc: 'Merino, cashmere blends and cotton knits.',
      cat_dresses_desc: 'Silk, linen and knit dresses for every register.',
      cat_tops_desc: 'Blouses, shirts and fine-knit layers.',
      cat_accessories_desc: 'Leather goods and the finishing details.',
      range_note: 'Twenty pieces. That is the whole shop.',
      range_note_cta: 'See it all',

      materials_eyebrow: 'Held, not just seen',
      materials_heading: 'Cloth, up close.',
      materials_lead: 'Rest your cursor on a swatch. Hold still and it tells you what it is.',
      materials_1_name: 'Wool Wrap Coat',
      materials_1_fact: 'Camel wool-blend, brushed for a soft hand and warmth without weight.',
      materials_2_name: 'Cashmere-Blend Vest',
      materials_2_fact: 'Stone cashmere-blend knit, spun to keep its shape wear after wear.',
      materials_3_name: 'Silk Slip Dress',
      materials_3_fact: 'Bone silk, bias-cut so the weave catches the light as it falls.',
      materials_4_name: 'Poplin Shirt',
      materials_4_fact: 'Crisp cotton poplin, woven tight enough to hold a sharp collar.',
      materials_5_name: 'Leather Tote',
      materials_5_fact: 'Full-grain black leather, finished by hand and built to darken with age.',

      products_eyebrow: 'The Collection',
      products_heading: 'All products',
      filter_all: 'All',

      stock_in: 'In stock',
      stock_low: 'Low stock',
      stock_out: 'Sold out',

      size_label: 'Size',
      add_to_cart: 'Add to bag',
      added_to_cart: 'Added',
      select_size_first: 'Select a size',
      notify_me: 'Notify me',

      about_eyebrow: 'Our philosophy',
      about_heading: 'Fewer, better things.',
      about_p1: 'FRØKEN was founded in Copenhagen on a simple idea: clothing should be considered before it is bought, and worn long after the season it was made for.',
      about_p2: 'We work with a small number of mills across Europe, choosing natural fibres and finishes that age well. Every piece is designed to be worn on its own terms: no logos, no noise, nothing that needs explaining.',
      about_stat_1: '5',
      about_stat_1_label: 'Categories, kept tight',
      about_stat_2: '20',
      about_stat_2_label: 'Pieces, considered',
      about_stat_3: '100%',
      about_stat_3_label: 'Natural fibres',

      cart_title: 'Your bag',
      cart_empty: 'Your bag is empty.',
      cart_qty_down_aria: 'Decrease quantity',
      cart_qty_up_aria: 'Increase quantity',
      cart_remove_aria: 'Remove item',
      cart_subtotal: 'Subtotal',
      cart_note: 'Shipping and taxes calculated at checkout.',
      cart_checkout: 'Request order',
      cart_continue: 'Continue shopping',
      cart_order_intro: 'Hello, I would like to order the following from FRØKEN:',
      cart_order_total: 'Total',
      cart_close_aria: 'Close cart',

      contact_eyebrow: 'Visit or write',
      contact_heading: 'Get in touch',
      contact_lead: 'Our studio and shop is open Tuesday to Saturday. For sizing questions or anything else, write to us or ask the assistant.',
      contact_address_label: 'Studio & shop',
      contact_hours_label: 'Hours',
      contact_hours_value: 'Tue–Fri 11:00–18:00, Sat 11:00–15:00',

      feedback_eyebrow: 'Help us improve',
      feedback_title: 'Report an issue or leave feedback',
      feedback_lead: 'Notice something wrong, or have a suggestion for the site? Tell us directly, it goes straight to our inbox.',
      feedback_placeholder: 'What did you notice?',
      feedback_email_placeholder: 'Your email (optional)',
      feedback_submit: 'Send',
      feedback_note: 'Opens your email client with the message pre-filled.',

      footer_shop: 'Shop',
      footer_studio: 'Studio',
      footer_rights: 'All rights reserved.',
      footer_credit: 'Site by Franco Mansilla',

      chat_greeting: 'Hi, I’m the FRØKEN assistant. Ask me about sizing, stock, an order, or anything else.',
      chat_placeholder: 'Write a message…',
      chat_send_aria: 'Send message',
      chat_fallback_error: 'Sorry, something went wrong. Please try again in a moment.',
      chat_chip1: 'What sizes do you carry?',
      chat_chip1_q: 'What sizes do you carry?',
      chat_chip2: 'How do I know if something is in stock?',
      chat_chip2_q: 'How do I know if something is in stock?',
      chat_chip3: 'What are your opening hours?',
      chat_chip3_q: 'What are your opening hours?',
      chat_open_aria: 'Open chat assistant',
      chat_close_aria: 'Close chat',
    },

    da: {
      meta_title: 'FRØKEN, gennemtænkt dametøj',
      meta_description: 'FRØKEN er et københavnsk mærke for gennemtænkt, minimalistisk dametøj: kvalitetsstoffer, stille detaljer, lavet til at holde længere end sæsonen.',

      nav_shop: 'Shop',
      nav_outerwear: 'Yderbeklædning',
      nav_knitwear: 'Strik',
      nav_dresses: 'Kjoler',
      nav_tops: 'Toppe',
      nav_accessories: 'Accessories',
      nav_about: 'Om os',
      nav_contact: 'Kontakt',
      nav_cart_aria: 'Åbn kurv',

      hero_eyebrow: 'Efterår/Vinter-kollektion',
      hero_title_1: 'Gennemtænkt',
      hero_title_2: 'af design.',
      hero_lead: 'Stille, præcist tøj til kvinder, der køber mindre og bruger det længere. Lavet af naturlige fibre, skåret til det virkelige liv.',
      hero_cta: 'Se kollektionen',
      hero_cta_secondary: 'Vores filosofi',

      tension_line: 'Det meste tøj bæres nogle få gange, før det udskiftes.',

      cat_heading_eyebrow: 'Shop efter kategori',
      cat_heading: 'Fem kategorier. Ingen støj.',
      cat_outerwear_desc: 'Frakker og jakker bygget til at holde i årevis.',
      cat_knitwear_desc: 'Merino, cashmere-blends og bomuldsstrik.',
      cat_dresses_desc: 'Kjoler i silke, hør og strik til enhver anledning.',
      cat_tops_desc: 'Bluser, skjorter og finstrikkede lag.',
      cat_accessories_desc: 'Læderprodukter og de sidste detaljer.',
      range_note: 'Tyve stykker. Det er hele butikken.',
      range_note_cta: 'Se det hele',

      materials_eyebrow: 'Følt, ikke kun set',
      materials_heading: 'Stof, tæt på.',
      materials_lead: 'Hold musen stille over en prøve. Bliv stående, og den fortæller dig, hvad den er.',
      materials_1_name: 'Uld-wrapfrakke',
      materials_1_fact: 'Camel-farvet uldblanding, børstet for en blød overflade og varme uden vægt.',
      materials_2_name: 'Cashmere-blend vest',
      materials_2_fact: 'Strikket cashmere-blanding i stenfarve, spundet til at holde formen brug efter brug.',
      materials_3_name: 'Silke-slipkjole',
      materials_3_fact: 'Hvid silke, skråskåret så vævningen fanger lyset, når den falder.',
      materials_4_name: 'Poplinskjorte',
      materials_4_fact: 'Skarp bomuldspoplin, vævet tæt nok til at holde en skarp krave.',
      materials_5_name: 'Læder-tote',
      materials_5_fact: 'Fuldkorns sort læder, håndfærdiggjort og bygget til at mørkne med tiden.',

      products_eyebrow: 'Kollektionen',
      products_heading: 'Alle produkter',
      filter_all: 'Alle',

      stock_in: 'På lager',
      stock_low: 'Få tilbage',
      stock_out: 'Udsolgt',

      size_label: 'Størrelse',
      add_to_cart: 'Læg i kurv',
      added_to_cart: 'Tilføjet',
      select_size_first: 'Vælg en størrelse',
      notify_me: 'Giv mig besked',

      about_eyebrow: 'Vores filosofi',
      about_heading: 'Færre, bedre ting.',
      about_p1: 'FRØKEN blev grundlagt i København med en simpel idé: tøj skal overvejes, før det købes, og bæres længe efter den sæson, det blev lavet til.',
      about_p2: 'Vi arbejder med et lille antal væverier i Europa og vælger naturlige fibre og finish, der ældes smukt. Hvert stykke er designet til at stå alene: ingen logoer, ingen støj, intet der kræver en forklaring.',
      about_stat_1: '5',
      about_stat_1_label: 'Kategorier, holdt stramme',
      about_stat_2: '20',
      about_stat_2_label: 'Stykker, gennemtænkt',
      about_stat_3: '100%',
      about_stat_3_label: 'Naturlige fibre',

      cart_title: 'Din kurv',
      cart_empty: 'Din kurv er tom.',
      cart_qty_down_aria: 'Formindsk antal',
      cart_qty_up_aria: 'Forøg antal',
      cart_remove_aria: 'Fjern vare',
      cart_subtotal: 'Subtotal',
      cart_note: 'Fragt og moms beregnes ved checkout.',
      cart_checkout: 'Send bestilling',
      cart_continue: 'Fortsæt med at shoppe',
      cart_order_intro: 'Hej, jeg vil gerne bestille følgende fra FRØKEN:',
      cart_order_total: 'Total',
      cart_close_aria: 'Luk kurv',

      contact_eyebrow: 'Besøg eller skriv',
      contact_heading: 'Kom i kontakt',
      contact_lead: 'Vores studie og butik har åbent tirsdag til lørdag. Har du spørgsmål om størrelser eller andet, så skriv til os eller spørg assistenten.',
      contact_address_label: 'Studie & butik',
      contact_hours_label: 'Åbningstider',
      contact_hours_value: 'Tir–fre 11:00–18:00, lør 11:00–15:00',

      feedback_eyebrow: 'Hjælp os med at blive bedre',
      feedback_title: 'Rapportér en fejl eller giv feedback',
      feedback_lead: 'Har du bemærket noget, der ikke virker, eller har du et forslag? Fortæl os det direkte, det lander i vores indbakke.',
      feedback_placeholder: 'Hvad bemærkede du?',
      feedback_email_placeholder: 'Din email (valgfrit)',
      feedback_submit: 'Send',
      feedback_note: 'Åbner din emailklient med beskeden udfyldt på forhånd.',

      footer_shop: 'Shop',
      footer_studio: 'Studie',
      footer_rights: 'Alle rettigheder forbeholdes.',
      footer_credit: 'Side af Franco Mansilla',

      chat_greeting: 'Hej, jeg er FRØKENs assistent. Spørg mig om størrelser, lager, en bestilling eller andet.',
      chat_placeholder: 'Skriv en besked…',
      chat_send_aria: 'Send besked',
      chat_fallback_error: 'Beklager, noget gik galt. Prøv venligst igen om et øjeblik.',
      chat_chip1: 'Hvilke størrelser har I?',
      chat_chip1_q: 'Hvilke størrelser har I?',
      chat_chip2: 'Hvordan ved jeg, om noget er på lager?',
      chat_chip2_q: 'Hvordan ved jeg, om noget er på lager?',
      chat_chip3: 'Hvad er jeres åbningstider?',
      chat_chip3_q: 'Hvad er jeres åbningstider?',
      chat_open_aria: 'Åbn chatassistent',
      chat_close_aria: 'Luk chat',
    },
  };

  function detectDefaultLang() {
    try {
      var stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored && SUPPORTED.indexOf(stored) !== -1) return stored;
    } catch (e) {}
    var nav = (navigator.language || 'en').slice(0, 2).toLowerCase();
    return SUPPORTED.indexOf(nav) !== -1 ? nav : 'en';
  }

  var currentLang = detectDefaultLang();
  var listeners = [];

  function t(key) {
    var dict = DICT[currentLang] || DICT.en;
    if (dict && dict[key] != null) return dict[key];
    return (DICT.en[key] != null) ? DICT.en[key] : key;
  }

  function getLang() { return currentLang; }

  function applyToDOM(root) {
    var scope = root || document;
    scope.querySelectorAll('[data-i18n]').forEach(function (el) {
      el.innerHTML = t(el.getAttribute('data-i18n'));
    });
    scope.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      el.setAttribute('placeholder', t(el.getAttribute('data-i18n-placeholder')));
    });
    scope.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria')));
    });
    scope.querySelectorAll('[data-i18n-alt]').forEach(function (el) {
      el.setAttribute('alt', t(el.getAttribute('data-i18n-alt')));
    });
  }

  function setLang(lang) {
    if (SUPPORTED.indexOf(lang) === -1) return;
    currentLang = lang;
    try { window.localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
    document.documentElement.setAttribute('lang', lang);
    applyToDOM(document);
    var titleEl = document.querySelector('title');
    if (titleEl) titleEl.textContent = t('meta_title');
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', t('meta_description'));
    document.querySelectorAll('[data-lang-btn]').forEach(function (btn) {
      btn.classList.toggle('is-active', btn.getAttribute('data-lang-btn') === lang);
    });
    listeners.forEach(function (fn) { fn(lang); });
  }

  function onChange(fn) { listeners.push(fn); }

  document.addEventListener('DOMContentLoaded', function () {
    document.documentElement.setAttribute('lang', currentLang);
    applyToDOM(document);
    var titleEl = document.querySelector('title');
    if (titleEl) titleEl.textContent = t('meta_title');
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', t('meta_description'));
    document.querySelectorAll('[data-lang-btn]').forEach(function (btn) {
      btn.classList.toggle('is-active', btn.getAttribute('data-lang-btn') === currentLang);
      btn.addEventListener('click', function () { setLang(btn.getAttribute('data-lang-btn')); });
    });
  });

  window.i18n = { t: t, getLang: getLang, setLang: setLang, applyToDOM: applyToDOM, onChange: onChange };
})();
