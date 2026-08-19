/* ==========================================================================
   FRØKEN — product catalogue + cart
   ========================================================================== */
(function () {
  'use strict';

  var STORAGE_KEY = 'froken_cart';
  var SIZES_APPAREL = ['XS', 'S', 'M', 'L', 'XL'];
  var SIZES_ONE = ['One Size'];
  var SIZES_BELT = ['S', 'M', 'L'];

  var PRODUCTS = [
    // -------- Outerwear --------
    {
      id: 'outerwear-1', category: 'outerwear', price: 3200, stock: 'in-stock',
      image: 'assets/images/products/outerwear-1.jpg', sizes: SIZES_APPAREL,
      name: { en: 'Wool Wrap Coat', da: 'Uld-wrapfrakke' },
      desc: { en: 'Camel wool-blend coat with a self-tie belt and clean, undecorated lines.', da: 'Camel-farvet uldblandingsfrakke med selvbindende bælte og rene, udekorerede linjer.' },
    },
    {
      id: 'outerwear-2', category: 'outerwear', price: 2400, stock: 'low-stock',
      image: 'assets/images/products/outerwear-2.jpg', sizes: SIZES_APPAREL,
      name: { en: 'Structured Blazer', da: 'Struktureret blazer' },
      desc: { en: 'Sharply tailored black blazer, single-breasted, built to anchor any outfit.', da: 'Skarpt skræddersyet sort blazer, enkeltradet, bygget til at samle ethvert outfit.' },
    },
    {
      id: 'outerwear-3', category: 'outerwear', price: 2800, stock: 'in-stock',
      image: 'assets/images/products/outerwear-3.jpg', sizes: SIZES_APPAREL,
      name: { en: 'Oversized Trench', da: 'Oversized trenchcoat' },
      desc: { en: 'Bone cotton trench, oversized fit, updated with a dropped shoulder.', da: 'Hvid bomuldstrenchcoat, oversized pasform, opdateret med et faldet skulderparti.' },
    },
    {
      id: 'outerwear-4', category: 'outerwear', price: 1900, stock: 'sold-out',
      image: 'assets/images/products/outerwear-4.jpg', sizes: SIZES_APPAREL,
      name: { en: 'Quilted Field Jacket', da: 'Quiltet feltjakke' },
      desc: { en: 'Charcoal quilted jacket in a light, packable fabric for in-between weather.', da: 'Antracit quiltet jakke i et let, pakbart stof til overgangsvejr.' },
    },

    // -------- Knitwear --------
    {
      id: 'knitwear-1', category: 'knitwear', price: 1100, stock: 'in-stock',
      image: 'assets/images/products/knitwear-1.jpg', sizes: SIZES_APPAREL,
      name: { en: 'Merino Crewneck', da: 'Merino-sweater' },
      desc: { en: 'Fine-gauge merino crewneck in camel, cut close but never tight.', da: 'Finmasket merino-sweater i camel, tætsiddende uden at stramme.' },
    },
    {
      id: 'knitwear-2', category: 'knitwear', price: 1350, stock: 'in-stock',
      image: 'assets/images/products/knitwear-2.jpg', sizes: SIZES_APPAREL,
      name: { en: 'Cable-Knit Cardigan', da: 'Kabelstrikket cardigan' },
      desc: { en: 'Bone cardigan in a subtle cable stitch, horn buttons, relaxed length.', da: 'Hvid cardigan i en diskret kabelstrik, hornknapper, afslappet længde.' },
    },
    {
      id: 'knitwear-3', category: 'knitwear', price: 850, stock: 'low-stock',
      image: 'assets/images/products/knitwear-3.jpg', sizes: SIZES_APPAREL,
      name: { en: 'Ribbed Turtleneck', da: 'Ribstrikket turtleneck' },
      desc: { en: 'Black ribbed turtleneck in a fine cotton-wool blend, made to layer.', da: 'Sort ribstrikket turtleneck i en fin bomuld-uld-blanding, lavet til at lagdele.' },
    },
    {
      id: 'knitwear-4', category: 'knitwear', price: 1450, stock: 'in-stock',
      image: 'assets/images/products/knitwear-4.jpg', sizes: SIZES_APPAREL,
      name: { en: 'Cashmere-Blend Vest', da: 'Cashmere-blend vest' },
      desc: { en: 'Sleeveless stone-coloured knit vest, cashmere blend, worn open or closed.', da: 'Ærmeløs strikvest i stenfarve, cashmere-blend, båret åben eller lukket.' },
    },

    // -------- Dresses --------
    {
      id: 'dresses-1', category: 'dresses', price: 1800, stock: 'in-stock',
      image: 'assets/images/products/dresses-1.jpg', sizes: SIZES_APPAREL,
      name: { en: 'Silk Slip Dress', da: 'Silke-slipkjole' },
      desc: { en: 'Bias-cut bone silk slip, bare straps, falls just below the knee.', da: 'Skråskåret silke-slipkjole i hvid, tynde stropper, falder lige under knæet.' },
    },
    {
      id: 'dresses-2', category: 'dresses', price: 2100, stock: 'low-stock',
      image: 'assets/images/products/dresses-2.jpg', sizes: SIZES_APPAREL,
      name: { en: 'Tailored Midi Dress', da: 'Tailored midikjole' },
      desc: { en: 'Black tailored midi with a structured waist and back seam detail.', da: 'Sort tailored midikjole med struktureret talje og detaljer i ryggen.' },
    },
    {
      id: 'dresses-3', category: 'dresses', price: 1650, stock: 'in-stock',
      image: 'assets/images/products/dresses-3.jpg', sizes: SIZES_APPAREL,
      name: { en: 'Wrap Knit Dress', da: 'Wrap-strikkjole' },
      desc: { en: 'Camel knit wrap dress, self-tie waist, designed to move with you.', da: 'Camel-farvet strik-wrapkjole, selvbindende talje, designet til at bevæge sig med dig.' },
    },
    {
      id: 'dresses-4', category: 'dresses', price: 1400, stock: 'sold-out',
      image: 'assets/images/products/dresses-4.jpg', sizes: SIZES_APPAREL,
      name: { en: 'Linen Shirt Dress', da: 'Hørskjortekjole' },
      desc: { en: 'Stone-coloured linen shirt dress with a self-belt, worn open as a layer.', da: 'Hørskjortekjole i stenfarve med selvbælte, båret åben som et lag.' },
    },

    // -------- Tops --------
    {
      id: 'tops-1', category: 'tops', price: 950, stock: 'in-stock',
      image: 'assets/images/products/tops-1.jpg', sizes: SIZES_APPAREL,
      name: { en: 'Silk Blouse', da: 'Silkebluse' },
      desc: { en: 'Fluid bone silk blouse with a hidden button placket and forgiving fit.', da: 'Flydende silkebluse i hvid med skjult knaplukning og tilgivende pasform.' },
    },
    {
      id: 'tops-2', category: 'tops', price: 750, stock: 'in-stock',
      image: 'assets/images/products/tops-2.jpg', sizes: SIZES_APPAREL,
      name: { en: 'Poplin Shirt', da: 'Poplinskjorte' },
      desc: { en: 'Crisp white poplin shirt, slightly oversized, made to be worn untucked.', da: 'Skarp hvid poplinskjorte, let oversized, lavet til at bæres udenfor bukserne.' },
    },
    {
      id: 'tops-3', category: 'tops', price: 550, stock: 'low-stock',
      image: 'assets/images/products/tops-3.jpg', sizes: SIZES_APPAREL,
      name: { en: 'Fine-Knit Tank', da: 'Finstrikket top' },
      desc: { en: 'Black fine-knit tank in a soft viscose blend, cut for easy layering.', da: 'Sort finstrikket top i en blød viskoseblanding, skåret til nem lagdeling.' },
    },
    {
      id: 'tops-4', category: 'tops', price: 650, stock: 'in-stock',
      image: 'assets/images/products/tops-4.jpg', sizes: SIZES_APPAREL,
      name: { en: 'Draped Camisole', da: 'Drapeaux-camisole' },
      desc: { en: 'Camel draped camisole in a matte satin, cut on the bias for movement.', da: 'Camel-farvet drapeaux-camisole i mat satin, skråskåret for bevægelse.' },
    },

    // -------- Accessories --------
    {
      id: 'accessories-1', category: 'accessories', price: 1600, stock: 'in-stock',
      image: 'assets/images/products/accessories-1.jpg', sizes: SIZES_ONE,
      name: { en: 'Leather Tote', da: 'Læder-tote' },
      desc: { en: 'Structured black leather tote, sized for a laptop, finished by hand.', da: 'Struktureret sort læder-tote, plads til en bærbar, håndfærdiggjort.' },
    },
    {
      id: 'accessories-2', category: 'accessories', price: 550, stock: 'in-stock',
      image: 'assets/images/products/accessories-2.jpg', sizes: SIZES_ONE,
      name: { en: 'Wool Scarf', da: 'Uldtørklæde' },
      desc: { en: 'Oversized camel wool scarf, soft brushed finish, generous length.', da: 'Oversized uldtørklæde i camel, blød børstet finish, generøs længde.' },
    },
    {
      id: 'accessories-3', category: 'accessories', price: 450, stock: 'in-stock',
      image: 'assets/images/products/accessories-3.jpg', sizes: SIZES_BELT,
      name: { en: 'Leather Belt', da: 'Læderbælte' },
      desc: { en: 'Slim black leather belt with a matte horn buckle.', da: 'Slankt sort læderbælte med mat hornspænde.' },
    },
    {
      id: 'accessories-4', category: 'accessories', price: 1350, stock: 'low-stock',
      image: 'assets/images/products/accessories-4.jpg', sizes: SIZES_ONE,
      name: { en: 'Structured Crossbody', da: 'Struktureret crossbody' },
      desc: { en: 'Bone leather crossbody with a structured top handle and slim strap.', da: 'Hvid læder-crossbody med struktureret håndtag og smal rem.' },
    },
  ];

  function tr(key) { return window.i18n ? window.i18n.t(key) : key; }
  function lang() { return window.i18n ? window.i18n.getLang() : 'en'; }
  function pName(p) { return p.name[lang()] || p.name.en; }
  function pDesc(p) { return p.desc[lang()] || p.desc.en; }
  function fmtPrice(n) { return n.toLocaleString('da-DK') + ' DKK'; }

  function stockLabel(stock) {
    if (stock === 'in-stock') return tr('stock_in');
    if (stock === 'low-stock') return tr('stock_low');
    return tr('stock_out');
  }

  var cart = [];
  try {
    var saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) cart = JSON.parse(saved);
  } catch (e) { cart = []; }

  function saveCart() {
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); } catch (e) {}
  }

  function findProduct(id) {
    for (var i = 0; i < PRODUCTS.length; i++) if (PRODUCTS[i].id === id) return PRODUCTS[i];
    return null;
  }

  function addToCart(productId, size, qty) {
    qty = qty || 1;
    var existing = cart.find(function (item) { return item.id === productId && item.size === size; });
    if (existing) existing.qty += qty;
    else cart.push({ id: productId, size: size, qty: qty });
    saveCart();
    renderCart();
    updateCartCount();
  }

  function removeFromCart(productId, size) {
    cart = cart.filter(function (item) { return !(item.id === productId && item.size === size); });
    saveCart();
    renderCart();
    updateCartCount();
  }

  function changeQty(productId, size, delta) {
    var item = cart.find(function (i) { return i.id === productId && i.size === size; });
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) return removeFromCart(productId, size);
    saveCart();
    renderCart();
    updateCartCount();
  }

  function cartTotal() {
    return cart.reduce(function (sum, item) {
      var p = findProduct(item.id);
      return sum + (p ? p.price * item.qty : 0);
    }, 0);
  }

  function updateCartCount() {
    var count = cart.reduce(function (sum, item) { return sum + item.qty; }, 0);
    document.querySelectorAll('.cart-count').forEach(function (el) {
      el.textContent = count;
      el.classList.toggle('is-visible', count > 0);
    });
  }

  function renderProducts(filter) {
    var grid = document.getElementById('productGrid');
    if (!grid) return;
    var items = filter && filter !== 'all' ? PRODUCTS.filter(function (p) { return p.category === filter; }) : PRODUCTS;

    grid.innerHTML = items.map(function (p) {
      var sizeOptions = p.sizes.map(function (s) { return '<option value="' + s + '">' + s + '</option>'; }).join('');
      var disabled = p.stock === 'sold-out';
      return (
        '<article class="product-card" data-id="' + p.id + '">' +
          '<div class="product-card__photo">' +
            '<span class="product-card__stock product-card__stock--' + p.stock + '">' + stockLabel(p.stock) + '</span>' +
            '<img src="' + p.image + '" alt="' + pName(p) + '" loading="lazy">' +
          '</div>' +
          '<div class="product-card__body">' +
            '<h3 class="product-card__name">' + pName(p) + '</h3>' +
            '<p class="product-card__desc">' + pDesc(p) + '</p>' +
            '<span class="product-card__price">' + fmtPrice(p.price) + '</span>' +
            '<div class="product-card__controls">' +
              '<select class="product-card__size" aria-label="' + tr('size_label') + '" ' + (disabled ? 'disabled' : '') + '>' + sizeOptions + '</select>' +
              '<button type="button" class="btn btn--dark product-card__add" ' + (disabled ? 'disabled' : '') + '>' +
                (disabled ? tr('notify_me') : tr('add_to_cart')) +
              '</button>' +
            '</div>' +
          '</div>' +
        '</article>'
      );
    }).join('');

    grid.querySelectorAll('.product-card__add').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (btn.disabled) return;
        var card = btn.closest('.product-card');
        var id = card.getAttribute('data-id');
        var size = card.querySelector('.product-card__size').value;
        addToCart(id, size, 1);
        var original = btn.textContent;
        btn.textContent = tr('added_to_cart');
        btn.classList.add('is-added');
        setTimeout(function () {
          btn.textContent = original;
          btn.classList.remove('is-added');
        }, 1400);
      });
    });

    if (window.initPhotoFade) window.initPhotoFade(grid);
  }

  function renderCart() {
    var body = document.getElementById('cartBody');
    var footer = document.getElementById('cartFooter');
    if (!body) return;

    if (cart.length === 0) {
      body.innerHTML = '<p class="cart-empty">' + tr('cart_empty') + '</p>';
      if (footer) footer.style.display = 'none';
      return;
    }
    if (footer) footer.style.display = '';

    body.innerHTML = cart.map(function (item) {
      var p = findProduct(item.id);
      if (!p) return '';
      return (
        '<div class="cart-item" data-id="' + p.id + '" data-size="' + item.size + '">' +
          '<img src="' + p.image + '" alt="' + pName(p) + '" class="cart-item__img">' +
          '<div class="cart-item__info">' +
            '<span class="cart-item__name">' + pName(p) + '</span>' +
            '<span class="cart-item__size">' + tr('size_label') + ': ' + item.size + '</span>' +
            '<span class="cart-item__price">' + fmtPrice(p.price) + '</span>' +
          '</div>' +
          '<div class="cart-item__qty">' +
            '<button type="button" class="cart-item__qty-btn" data-action="down" aria-label="' + tr('cart_qty_down_aria') + '">–</button>' +
            '<span>' + item.qty + '</span>' +
            '<button type="button" class="cart-item__qty-btn" data-action="up" aria-label="' + tr('cart_qty_up_aria') + '">+</button>' +
          '</div>' +
          '<button type="button" class="cart-item__remove" aria-label="' + tr('cart_remove_aria') + '">' +
            '<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 3l10 10M13 3L3 13" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>' +
          '</button>' +
        '</div>'
      );
    }).join('');

    body.querySelectorAll('.cart-item__qty-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var item = btn.closest('.cart-item');
        var delta = btn.getAttribute('data-action') === 'up' ? 1 : -1;
        changeQty(item.getAttribute('data-id'), item.getAttribute('data-size'), delta);
      });
    });
    body.querySelectorAll('.cart-item__remove').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var item = btn.closest('.cart-item');
        removeFromCart(item.getAttribute('data-id'), item.getAttribute('data-size'));
      });
    });

    var totalEl = document.getElementById('cartTotal');
    if (totalEl) totalEl.textContent = fmtPrice(cartTotal());
  }

  function openCart() {
    document.getElementById('cartDrawer').classList.add('is-open');
    document.getElementById('cartBackdrop').classList.add('is-open');
  }
  function closeCart() {
    document.getElementById('cartDrawer').classList.remove('is-open');
    document.getElementById('cartBackdrop').classList.remove('is-open');
  }

  document.addEventListener('DOMContentLoaded', function () {
    renderProducts('all');
    renderCart();
    updateCartCount();

    document.querySelectorAll('[data-cart-open]').forEach(function (el) {
      el.addEventListener('click', function (e) { e.preventDefault(); openCart(); });
    });
    var closeBtn = document.getElementById('cartClose');
    if (closeBtn) closeBtn.addEventListener('click', closeCart);
    var backdrop = document.getElementById('cartBackdrop');
    if (backdrop) backdrop.addEventListener('click', closeCart);

    document.querySelectorAll('[data-filter]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        document.querySelectorAll('[data-filter]').forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');
        renderProducts(btn.getAttribute('data-filter'));
      });
    });

    var checkoutBtn = document.getElementById('cartCheckout');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', function () {
        if (cart.length === 0) return;
        var lines = [tr('cart_order_intro'), ''];
        cart.forEach(function (item) {
          var p = findProduct(item.id);
          if (!p) return;
          lines.push('- ' + pName(p) + ' (' + tr('size_label') + ' ' + item.size + ') x' + item.qty + ' — ' + fmtPrice(p.price * item.qty));
        });
        lines.push('');
        lines.push(tr('cart_order_total') + ': ' + fmtPrice(cartTotal()));
        var mailto = 'mailto:hello@froken-studio.dk?subject=' + encodeURIComponent('Order request — FRØKEN') + '&body=' + encodeURIComponent(lines.join('\n'));
        window.location.href = mailto;
      });
    }

    if (window.i18n) {
      window.i18n.onChange(function () {
        var activeFilter = document.querySelector('[data-filter].is-active');
        renderProducts(activeFilter ? activeFilter.getAttribute('data-filter') : 'all');
        renderCart();
      });
    }
  });

  window.FROKEN_PRODUCTS = PRODUCTS;
})();
