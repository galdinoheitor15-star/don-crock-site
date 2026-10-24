/* =========================================================
   DON CROCK — SISTEMA DE PEDIDOS (delivery e retirada)
   Monta o pedido no site e envia pronto para o WhatsApp da unidade.
   Os dados do cardápio ficam em menu.js.
   ========================================================= */
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const brl = v => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const img = id => `img/menu/${id}.webp`;
  const byId = Object.fromEntries(CARDAPIO.map(p => [p.id, p]));

  /* ---------- estado ---------- */
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
  };
  let cart = store.get('dc_cart', []).filter(l => byId[l.id]);
  const saved = store.get('dc_cliente', {});
  const save = () => { store.set('dc_cart', cart); renderCart(); };

  /* ---------- cardápio ---------- */
  const menuEl = $('#menuList'), chipsEl = $('#menuChips'), searchEl = $('#menuSearch');

  chipsEl.innerHTML = CATEGORIAS.map((c, i) =>
    `<button class="chip${i ? '' : ' active'}" data-cat="${c.id}">${c.emoji} ${c.nome}</button>`).join('');

  function cardHTML(p) {
    return `<article class="mitem" data-id="${p.id}" tabindex="0" role="button" aria-label="Adicionar ${esc(p.nome)}">
      <div class="mitem-txt">
        ${p.destaque ? '<span class="mbadge">🔥 Mais pedido</span>' : ''}
        <h4>${esc(p.nome)}</h4>
        <p>${esc(p.desc)}</p>
        <div class="mitem-foot"><b>${brl(p.preco)}</b><span class="madd" aria-hidden="true">+</span></div>
      </div>
      <div class="mitem-img"><img src="${img(p.id)}" alt="" loading="lazy" onerror="this.src='img/logo.jpg'"></div>
    </article>`;
  }

  function renderMenu(q = '') {
    const term = q.trim().toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
    const norm = s => s.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
    let html = '';
    for (const c of CATEGORIAS) {
      const items = CARDAPIO.filter(p => p.cat === c.id && (!term || norm(p.nome + ' ' + p.desc).includes(term)));
      if (!items.length) continue;
      html += `<div class="mcat" id="cat-${c.id}"><h3><span>${c.emoji}</span> ${c.nome} <small>${items.length}</small></h3>
        <div class="mgrid">${items.map(cardHTML).join('')}</div></div>`;
    }
    menuEl.innerHTML = html || `<p class="mempty">Nada encontrado para “${esc(q)}”. Tente “balde”, “combo” ou “milkshake”.</p>`;
  }
  renderMenu();

  searchEl.addEventListener('input', () => renderMenu(searchEl.value));
  chipsEl.addEventListener('click', e => {
    const b = e.target.closest('.chip'); if (!b) return;
    if (searchEl.value) { searchEl.value = ''; renderMenu(); }
    const t = $('#cat-' + b.dataset.cat);
    if (t) scrollTo({ top: t.getBoundingClientRect().top + scrollY - 150, behavior: 'smooth' });
  });
  // chip ativo conforme a rolagem
  const catIO = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    const id = e.target.id.replace('cat-', '');
    $$('.chip', chipsEl).forEach(c => c.classList.toggle('active', c.dataset.cat === id));
    const a = $(`.chip[data-cat="${id}"]`, chipsEl); if (a) chipsEl.scrollTo({ left: a.offsetLeft - 16, behavior: 'smooth' });
  }), { rootMargin: '-160px 0px -60% 0px' });
  new MutationObserver(() => $$('.mcat', menuEl).forEach(m => catIO.observe(m))).observe(menuEl, { childList: true });
  $$('.mcat', menuEl).forEach(m => catIO.observe(m));

  menuEl.addEventListener('click', e => { const c = e.target.closest('.mitem'); if (c) openProduct(c.dataset.id, c); });
  menuEl.addEventListener('keydown', e => { if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('.mitem')) { e.preventDefault(); openProduct(e.target.dataset.id, e.target); } });

  /* ---------- modal do produto ---------- */
  const pm = $('#productModal');
  let current = null, qty = 1, sourceEl = null;

  function openProduct(id, src) {
    const p = byId[id]; current = p; qty = 1; sourceEl = src;
    $('#pmImg').src = img(p.id);
    $('#pmName').textContent = p.nome;
    $('#pmDesc').textContent = p.desc;
    $('#pmPrice').textContent = brl(p.preco);
    $('#pmOpts').innerHTML = (p.opcoes || []).map(k => {
      const g = OPCOES[k];
      return `<fieldset class="optg"><legend>${g.titulo} <em>obrigatório</em></legend>
        <div class="opts">${g.itens.map((o, i) => `<label class="opt"><input type="radio" name="opt-${k}" value="${esc(o)}" ${i ? '' : 'checked'}><span>${esc(o)}</span></label>`).join('')}</div></fieldset>`;
    }).join('');
    $('#pmObs').value = '';
    updatePm();
    openLayer(pm);
  }
  function updatePm() { $('#pmQty').textContent = qty; $('#pmTotal').textContent = brl(current.preco * qty); }
  $('#pmMinus').onclick = () => { if (qty > 1) { qty--; updatePm(); } };
  $('#pmPlus').onclick = () => { if (qty < 50) { qty++; updatePm(); } };
  $('#pmAdd').onclick = () => {
    const opts = (current.opcoes || []).map(k => ({ t: OPCOES[k].titulo, v: ($(`input[name="opt-${k}"]:checked`, pm) || {}).value }));
    const obs = $('#pmObs').value.trim().slice(0, 140);
    const key = current.id + '|' + JSON.stringify(opts) + '|' + obs;
    const ex = cart.find(l => l.key === key);
    if (ex) ex.qty += qty; else cart.push({ key, id: current.id, qty, opts, obs });
    save();
    closeLayer(pm);
    flyToCart(sourceEl);
    toast(`${qty}× ${current.nome} na sacola!`);
  };

  /* ---------- sacola ---------- */
  const drawer = $('#cartDrawer'), bar = $('#cartBar');
  const subtotal = () => cart.reduce((s, l) => s + byId[l.id].preco * l.qty, 0);
  const count = () => cart.reduce((s, l) => s + l.qty, 0);

  function renderCart() {
    const n = count(), st = subtotal();
    bar.classList.toggle('show', n > 0);
    document.body.classList.toggle('has-cart', n > 0);
    $('#cbCount').textContent = n;
    $('#cbTotal').textContent = brl(st);
    $('#cartItems').innerHTML = cart.length ? cart.map((l, i) => {
      const p = byId[l.id];
      const det = [...l.opts.map(o => `${o.t}: ${o.v}`), l.obs && `Obs: ${l.obs}`].filter(Boolean).map(esc).join(' • ');
      return `<li class="cline">
        <img src="${img(p.id)}" alt="" onerror="this.src='img/logo.jpg'">
        <div><b>${esc(p.nome)}</b>${det ? `<small>${det}</small>` : ''}<span class="cprice">${brl(p.preco * l.qty)}</span></div>
        <div class="qty sm"><button data-i="${i}" data-d="-1" aria-label="Diminuir">−</button><span>${l.qty}</span><button data-i="${i}" data-d="1" aria-label="Aumentar">+</button></div>
      </li>`;
    }).join('') : '<li class="cempty"><span>🍗</span>Sua sacola está vazia.<br>Bora escolher algo crocante?</li>';
    $('#cartSubtotal').textContent = brl(st);
    $('#goCheckout').disabled = !cart.length;
    renderTotals();
  }
  $('#cartItems').addEventListener('click', e => {
    const b = e.target.closest('button[data-i]'); if (!b) return;
    const l = cart[+b.dataset.i]; l.qty += +b.dataset.d;
    if (l.qty <= 0) cart.splice(+b.dataset.i, 1);
    save();
  });
  $('#clearCart').onclick = () => { if (cart.length && confirm('Esvaziar a sacola?')) { cart = []; save(); } };

  bar.onclick = () => { showStep(1); openLayer(drawer); };
  $$('[data-open-cart]').forEach(b => b.onclick = e => { e.preventDefault(); showStep(1); openLayer(drawer); });
  $('#goCheckout').onclick = () => showStep(2);
  $('#backToCart').onclick = () => showStep(1);
  function showStep(n) {
    drawer.dataset.step = n;
    $('#drawerTitle').textContent = n === 1 ? 'Sua sacola' : 'Finalizar pedido';
    $('.drawer-body', drawer).scrollTop = 0;
  }

  /* ---------- checkout ---------- */
  const form = $('#checkoutForm');
  const unitSel = $('#fUnidade');
  unitSel.innerHTML = UNIDADES.map(u => `<option value="${u.id}">${esc(u.nome)}</option>`).join('');

  // restaura dados do cliente (só neste navegador)
  ['nome', 'tel', 'rua', 'num', 'bairro', 'ref'].forEach(k => { if (saved[k]) form.elements[k].value = saved[k]; });
  if (saved.unidade && UNIDADES.some(u => u.id === saved.unidade)) unitSel.value = saved.unidade;

  const tipo = () => form.elements.tipo.value;
  const pag = () => form.elements.pag.value;

  function syncForm() {
    const d = tipo() === 'delivery';
    $('#addrBox').hidden = !d;
    $$('#addrBox [data-req]').forEach(i => i.required = d);
    $('#trocoBox').hidden = pag() !== 'Dinheiro';
    const u = UNIDADES.find(x => x.id === unitSel.value);
    $('#unitInfo').textContent = d ? `Entrega feita pela unidade ${u.nome}.` : `Retire em: ${u.endereco}`;
    $('#unitLabel').textContent = d ? 'Unidade que vai entregar' : 'Unidade para retirada';
    renderTotals();
  }
  function renderTotals() {
    const st = subtotal(), d = form && tipo() === 'delivery';
    $('#ckSubtotal').textContent = brl(st);
    $('#ckFeeRow').hidden = !d;
    $('#ckFee').textContent = TAXA_ENTREGA == null ? 'a combinar' : brl(TAXA_ENTREGA);
    $('#ckTotal').textContent = brl(st + (d && TAXA_ENTREGA ? TAXA_ENTREGA : 0)) + (d && TAXA_ENTREGA == null ? ' + entrega' : '');
  }
  form.addEventListener('change', syncForm);
  syncForm();

  // máscara simples de telefone
  form.elements.tel.addEventListener('input', e => {
    let v = e.target.value.replace(/\D/g, '').slice(0, 11);
    if (v.length > 6) v = `(${v.slice(0, 2)}) ${v.slice(2, v.length - 4)}-${v.slice(-4)}`;
    else if (v.length > 2) v = `(${v.slice(0, 2)}) ${v.slice(2)}`;
    e.target.value = v;
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!cart.length) return;
    const f = form.elements, d = tipo() === 'delivery';
    if (!form.reportValidity()) return;
    if (f.tel.value.replace(/\D/g, '').length < 10) { f.tel.setCustomValidity('Informe o telefone com DDD'); f.tel.reportValidity(); f.tel.setCustomValidity(''); return; }
    const st = subtotal(), total = st + (d && TAXA_ENTREGA ? TAXA_ENTREGA : 0);
    const troco = parseFloat(String(f.troco.value).replace(',', '.'));
    if (pag() === 'Dinheiro' && f.troco.value && !(troco >= total)) { f.troco.setCustomValidity(`O troco precisa ser para ${brl(total)} ou mais`); f.troco.reportValidity(); f.troco.setCustomValidity(''); return; }

    const u = UNIDADES.find(x => x.id === unitSel.value);
    store.set('dc_cliente', { nome: f.nome.value, tel: f.tel.value, rua: f.rua.value, num: f.num.value, bairro: f.bairro.value, ref: f.ref.value, unidade: u.id });

    const L = [];
    L.push(`*🍗 NOVO PEDIDO — DON CROCK ${u.nome.toUpperCase()}*`);
    L.push('');
    L.push(`*Cliente:* ${f.nome.value.trim()}`);
    L.push(`*Telefone:* ${f.tel.value}`);
    L.push(`*Tipo:* ${d ? '🛵 Delivery' : '🏃 Retirada na loja'}`);
    L.push('');
    L.push('*Itens:*');
    cart.forEach(l => {
      const p = byId[l.id];
      L.push(`▪️ ${l.qty}x ${p.nome} — ${brl(p.preco * l.qty)}`);
      l.opts.forEach(o => L.push(`    • ${o.t}: ${o.v}`));
      if (l.obs) L.push(`    • Obs: ${l.obs}`);
    });
    L.push('');
    L.push(`*Subtotal:* ${brl(st)}`);
    if (d) L.push(`*Taxa de entrega:* ${TAXA_ENTREGA == null ? 'a combinar' : brl(TAXA_ENTREGA)}`);
    L.push(`*Total:* ${brl(total)}${d && TAXA_ENTREGA == null ? ' + entrega' : ''}`);
    L.push('');
    if (d) {
      L.push('*Endereço de entrega:*');
      L.push(`${f.rua.value.trim()}, ${f.num.value.trim()} — ${f.bairro.value.trim()}`);
      if (f.ref.value.trim()) L.push(`Referência: ${f.ref.value.trim()}`);
      L.push('');
    }
    L.push(`*Pagamento:* ${pag()}${pag() === 'Dinheiro' ? (f.troco.value ? ` (troco para ${brl(troco)})` : ' (sem troco)') : ''}`);
    if (f.obsGeral.value.trim()) L.push(`*Observações:* ${f.obsGeral.value.trim()}`);
    L.push('');
    L.push('_Pedido feito pelo site_');

    window.open(`https://wa.me/${u.whatsapp}?text=${encodeURIComponent(L.join('\n'))}`, '_blank', 'noopener');
    showDone(u, d);
  });

  function showDone(u, d) {
    drawer.dataset.step = 3;
    $('#drawerTitle').textContent = 'Pedido enviado!';
    $('#doneMsg').textContent = d
      ? `Seu pedido foi aberto no WhatsApp da unidade ${u.nome}. É só tocar em enviar — a loja confirma o valor da entrega e o tempo de preparo.`
      : `Seu pedido foi aberto no WhatsApp da unidade ${u.nome}. É só tocar em enviar — a loja avisa quando estiver pronto para retirada.`;
  }
  $('#doneNew').onclick = () => { cart = []; save(); closeLayer(drawer); };

  /* ---------- camadas (modal/gaveta) ---------- */
  let lastFocus = null;
  function openLayer(el) { lastFocus = document.activeElement; el.classList.add('open'); el.setAttribute('aria-hidden', 'false'); document.body.classList.add('lock'); setTimeout(() => (el.querySelector('[data-autofocus]') || el.querySelector('button')).focus({ preventScroll: true }), 50); }
  function closeLayer(el) { el.classList.remove('open'); el.setAttribute('aria-hidden', 'true'); if (!$('.layer.open')) document.body.classList.remove('lock'); if (lastFocus) lastFocus.focus({ preventScroll: true }); }
  $$('.layer').forEach(l => l.addEventListener('click', e => { if (e.target === l || e.target.closest('[data-close]')) closeLayer(l); }));
  addEventListener('keydown', e => { if (e.key === 'Escape') $$('.layer.open').forEach(closeLayer); });

  /* ---------- animações ---------- */
  function flyToCart(from) {
    const target = bar.classList.contains('show') ? $('.cb-icon', bar) : bar;
    const a = (from && from.querySelector('img') || from || document.body).getBoundingClientRect();
    const b = target.getBoundingClientRect();
    const f = document.createElement('div');
    f.className = 'fly'; f.textContent = '🍗';
    f.style.left = (a.left + a.width / 2) + 'px'; f.style.top = (a.top + a.height / 2) + 'px';
    document.body.appendChild(f);
    requestAnimationFrame(() => {
      f.style.transform = `translate(${b.left + b.width / 2 - a.left - a.width / 2}px, ${b.top + b.height / 2 - a.top - a.height / 2}px) scale(.5) rotate(540deg)`;
      f.style.opacity = '.2';
    });
    setTimeout(() => { f.remove(); bar.classList.remove('bump'); void bar.offsetWidth; bar.classList.add('bump'); }, 700);
  }
  let tt;
  function toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(tt); tt = setTimeout(() => t.classList.remove('show'), 2200); }

  // botões "Pedir" das unidades já escolhem a unidade
  $$('[data-unit]').forEach(b => b.addEventListener('click', () => { unitSel.value = b.dataset.unit; syncForm(); }));

  renderCart();
})();
