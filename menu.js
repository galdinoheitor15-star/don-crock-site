/* =========================================================
   DON CROCK — CONFIGURAÇÃO DA LOJA E CARDÁPIO
   Para mudar um preço, nome ou foto, edite só este arquivo.
   Preços em reais (use ponto: 24.99).
   ========================================================= */

/* Unidades: o pedido é enviado para o WhatsApp da unidade escolhida.
   ⚠️ Confirme os números de cada unidade com a loja. */
const UNIDADES = [
  { id: 'shopping', nome: 'Shopping Carpina', endereco: 'Praça de alimentação — PE-041, Bairro Novo, Carpina', whatsapp: '5581993574469', delivery: true },
  { id: 'centro',   nome: 'Centro (Cajá)',    endereco: 'Av. Rosita Freire, 417 — Cajá, Carpina',             whatsapp: '5581973461232', delivery: true },
  { id: 'vitoria',  nome: 'Vitória Park Shopping', endereco: 'Vitória Park Shopping — Vitória de Santo Antão', whatsapp: '5581993574469', delivery: true },
];

/* Taxa de entrega: deixe null para "a combinar" (o atendente informa no WhatsApp),
   ou coloque um valor fixo, ex.: 5.00 */
const TAXA_ENTREGA = null;

/* Grupos de opções reutilizáveis */
const OPCOES = {
  queijo:   { titulo: 'Queijo', itens: ['Cheddar', 'Muçarela'] },
  refriLata:{ titulo: 'Refrigerante (lata)', itens: ['Coca-Cola', 'Coca-Cola Zero', 'Kuat', 'Sprite', 'Fanta Laranja', 'Fanta Uva'] },
  bebidaBox:{ titulo: 'Bebida', itens: ['Coca-Cola (lata)', 'Coca-Cola Zero (lata)', 'Kuat (lata)', 'Sprite (lata)', 'Fanta Laranja (lata)', 'Fanta Uva (lata)', 'Suco de Cajá', 'Suco de Graviola', 'Suco de Acerola', 'Suco de Goiaba', 'Suco de Abacaxi c/ Hortelã', 'Milkshake de Morango', 'Milkshake de Chocolate', 'Milkshake de Ovomaltine'] },
  molho:    { titulo: 'Molho', itens: ['Especial da casa', 'Maionese temperada', 'Mostarda e mel', 'Barbecue', 'Baconese', 'Pimenta'] },
  molho2:   { titulo: '2º molho', itens: ['Especial da casa', 'Maionese temperada', 'Mostarda e mel', 'Barbecue', 'Baconese', 'Pimenta'] },
  refri1l:  { titulo: 'Refrigerante 1L', itens: ['Coca-Cola', 'Coca-Cola Zero', 'Guaraná Antarctica'] },
  suco:     { titulo: 'Sabor', itens: ['Cajá', 'Graviola', 'Acerola', 'Goiaba', 'Abacaxi com hortelã', 'Manga'] },
  milk:     { titulo: 'Sabor', itens: ['Chocolate', 'Morango', 'Ovomaltine'] },
  ponto:    { titulo: 'Ponto da carne', itens: ['Mal passada', 'Ao ponto', 'Bem passada'] },
  molhoSalada: { titulo: 'Molho da salada', itens: ['Mostarda e mel', 'Rosê'] },
};

const CATEGORIAS = [
  { id: 'baldes',  nome: 'Baldes de Frango', emoji: '🍗' },
  { id: 'burguers', nome: 'Burguers', emoji: '🍔' },
  { id: 'combos',  nome: 'Combos', emoji: '🥤' },
  { id: 'donbox',  nome: 'Donbox', emoji: '📦' },
  { id: 'acomp',   nome: 'Fritas & Molhos', emoji: '🍟' },
  { id: 'almoco',  nome: 'Almoço', emoji: '🍽️' },
  { id: 'bebidas', nome: 'Bebidas', emoji: '🧃' },
];

/* destaque: true mostra o selo "Mais pedido" */
const CARDAPIO = [
  // ---------- BALDES ----------
  { id: 'balde-p-variado', cat: 'baldes', nome: 'Balde P — Variado', preco: 29.99, desc: '6 pedaços variados (sobrecoxa, asinha, filé e coxinha da asa) + 1 molho.', opcoes: ['molho'] },
  { id: 'balde-m-variado', cat: 'baldes', nome: 'Balde M — Variado', preco: 44.99, desc: '10 pedaços variados de frango crocante + 1 molho.', opcoes: ['molho'] },
  { id: 'balde-g-variado', cat: 'baldes', nome: 'Balde G — Variado', preco: 50.99, desc: '12 pedaços variados de frango crocante + 1 molho.', opcoes: ['molho'], destaque: true },
  { id: 'mega-variado',    cat: 'baldes', nome: 'Megabalde — Variado', preco: 65.99, desc: '16 pedaços variados. Para a galera toda + 1 molho.', opcoes: ['molho'] },
  { id: 'balde-p-file',    cat: 'baldes', nome: 'Balde P — Só Filé', preco: 36.99, desc: '6 pedaços de filé de peito crocante + 1 molho.', opcoes: ['molho'] },
  { id: 'balde-m-file',    cat: 'baldes', nome: 'Balde M — Só Filé', preco: 51.99, desc: '10 pedaços de filé de peito crocante + 1 molho.', opcoes: ['molho'] },
  { id: 'balde-g-file',    cat: 'baldes', nome: 'Balde G — Só Filé', preco: 57.99, desc: '12 pedaços de filé de peito crocante + 1 molho.', opcoes: ['molho'] },
  { id: 'mega-file',       cat: 'baldes', nome: 'Megabalde — Só Filé', preco: 72.99, desc: '16 pedaços de filé de peito crocante + 1 molho.', opcoes: ['molho'] },
  { id: 'fominha-variado', cat: 'baldes', nome: 'Crock Fominha — Variado', preco: 61.99, desc: '10 pedaços variados + fritas 200g + 2 molhos + refri 1L.', opcoes: ['molho', 'molho2', 'refri1l'] },
  { id: 'fominha-file',    cat: 'baldes', nome: 'Crock Fominha — Só Filé', preco: 68.99, desc: '10 filés de peito + fritas 200g + 2 molhos + refri 1L.', opcoes: ['molho', 'molho2', 'refri1l'] },
  { id: 'muitafome-variado', cat: 'baldes', nome: 'Crock Muita Fome — Variado', preco: 85.99, desc: '16 pedaços variados + fritas + 2 molhos + refri 1L.', opcoes: ['molho', 'molho2', 'refri1l'], destaque: true },
  { id: 'muitafome-file',  cat: 'baldes', nome: 'Crock Muita Fome — Só Filé', preco: 92.99, desc: '16 filés de peito + fritas + 2 molhos + refri 1L.', opcoes: ['molho', 'molho2', 'refri1l'] },

  // ---------- BURGUERS ----------
  { id: 'don-crock',      cat: 'burguers', nome: 'Don Crock', preco: 27.99, desc: 'O assinatura: duas sobrecoxas crocantes no lugar do pão, queijo, alface, tomate e molho da casa.', opcoes: ['queijo'], destaque: true },
  { id: 'don-bbq',        cat: 'burguers', nome: 'Don Bbq', preco: 24.99, desc: 'Brioche na manteiga, 2 tiras de filé crocante, bacon, queijo e barbecue.', opcoes: ['queijo'] },
  { id: 'don-duplo',      cat: 'burguers', nome: 'Don Duplo', preco: 24.99, desc: 'Brioche, 2 tiras de filé crocante, alface, tomate, queijo e molho da casa.', opcoes: ['queijo'] },
  { id: 'don-australiano',cat: 'burguers', nome: 'Don Australiano', preco: 25.99, desc: 'Pão australiano, blend 150g, queijo, bacon, cebola caramelizada e molho da casa.', opcoes: ['queijo'] },
  { id: 'don-gourmet',    cat: 'burguers', nome: 'Don Gourmet', preco: 24.99, desc: 'Brioche, blend artesanal 120g, alface, tomate, queijo e molho da casa.', opcoes: ['queijo'] },
  { id: 'don-gourmet-duplo', cat: 'burguers', nome: 'Don Gourmet Duplo', preco: 29.99, desc: 'Dois blends artesanais, queijo em dobro e molho da casa.', opcoes: ['queijo'] },
  { id: 'don-suino',      cat: 'burguers', nome: 'Don Suíno', preco: 25.99, desc: 'Brioche, hambúrguer de pernil 120g, muçarela, bacon em cubos, alface e tomate.' },
  { id: 'don-camarao',    cat: 'burguers', nome: 'Don Camarão', preco: 31.99, desc: 'Brioche, camarões na manteiga, muçarela, alface, tomate e molho da casa.' },
  { id: 'baguete-frango', cat: 'burguers', nome: 'Don Baguete Frango', preco: 28.99, desc: 'Baguete crocante, 2 tiras de filé, cream cheese, queijo, alface e tomate.', opcoes: ['queijo'] },
  { id: 'baguete-carne',  cat: 'burguers', nome: 'Don Baguete Carne', preco: 30.99, desc: 'Baguete crocante recheada com carne artesanal suculenta.', opcoes: ['queijo'] },
  { id: 'kids-frango',    cat: 'burguers', nome: 'Don Kids (Frango)', preco: 19.99, desc: 'Brioche, filé de frango empanado, queijo e molho da casa.', opcoes: ['queijo'] },
  { id: 'kids-carne',     cat: 'burguers', nome: 'Don Kids (Carne)', preco: 21.99, desc: 'Brioche, hambúrguer de carne, queijo e molho da casa.', opcoes: ['queijo'] },

  // ---------- COMBOS (burguer + fritas + refri lata) ----------
  { id: 'combo-don-crock',      cat: 'combos', nome: 'Combo Don Crock', preco: 35.99, desc: 'Don Crock + fritas + refrigerante lata.', opcoes: ['queijo', 'refriLata'], destaque: true },
  { id: 'combo-don-bbq',        cat: 'combos', nome: 'Combo Don Bbq', preco: 32.99, desc: 'Don Bbq + fritas + refrigerante lata.', opcoes: ['queijo', 'refriLata'] },
  { id: 'combo-don-duplo',      cat: 'combos', nome: 'Combo Don Duplo Frango', preco: 32.99, desc: 'Don Duplo + fritas + refrigerante lata.', opcoes: ['queijo', 'refriLata'] },
  { id: 'combo-don-australiano',cat: 'combos', nome: 'Combo Don Australiano', preco: 33.99, desc: 'Don Australiano + fritas + refrigerante lata.', opcoes: ['queijo', 'refriLata'] },
  { id: 'combo-don-gourmet',    cat: 'combos', nome: 'Combo Don Gourmet', preco: 32.99, desc: 'Don Gourmet + fritas + refrigerante lata.', opcoes: ['queijo', 'refriLata'] },
  { id: 'combo-gourmet-duplo',  cat: 'combos', nome: 'Combo Don Gourmet Duplo', preco: 37.99, desc: 'Don Gourmet Duplo + fritas + refrigerante lata.', opcoes: ['queijo', 'refriLata'] },
  { id: 'combo-don-suino',      cat: 'combos', nome: 'Combo Don Suíno', preco: 33.99, desc: 'Don Suíno + fritas + refrigerante lata.', opcoes: ['refriLata'] },
  { id: 'combo-don-camarao',    cat: 'combos', nome: 'Combo Don Camarão', preco: 39.99, desc: 'Don Camarão + fritas + refrigerante lata.', opcoes: ['refriLata'] },
  { id: 'combo-baguete-frango', cat: 'combos', nome: 'Combo Baguete Frango', preco: 36.99, desc: 'Don Baguete Frango + fritas + refrigerante lata.', opcoes: ['queijo', 'refriLata'] },
  { id: 'combo-baguete-carne',  cat: 'combos', nome: 'Combo Baguete Carne', preco: 38.99, desc: 'Don Baguete Carne + fritas + refrigerante lata.', opcoes: ['queijo', 'refriLata'] },
  { id: 'combo-kids-frango',    cat: 'combos', nome: 'Combo Don Kids Frango', preco: 27.99, desc: 'Don Kids Frango + fritas + refrigerante lata.', opcoes: ['queijo', 'refriLata'] },
  { id: 'combo-kids-carne',     cat: 'combos', nome: 'Combo Don Kids Carne', preco: 29.99, desc: 'Don Kids Carne + fritas + refrigerante lata.', opcoes: ['queijo', 'refriLata'] },

  // ---------- DONBOX (burguer + fritas + 2 pedaços de frango + bebida) ----------
  { id: 'box-don-crock',      cat: 'donbox', nome: 'Donbox Don Crock', preco: 44.99, desc: 'Don Crock + fritas + 2 pedaços de frango + bebida.', opcoes: ['queijo', 'bebidaBox'], destaque: true },
  { id: 'box-don-bbq',        cat: 'donbox', nome: 'Donbox Don Bbq', preco: 41.99, desc: 'Don Bbq + fritas + 2 pedaços de frango + bebida.', opcoes: ['queijo', 'bebidaBox'] },
  { id: 'box-don-duplo',      cat: 'donbox', nome: 'Donbox Don Duplo Frango', preco: 41.99, desc: 'Don Duplo + fritas + 2 pedaços de frango + bebida.', opcoes: ['queijo', 'bebidaBox'] },
  { id: 'box-don-australiano',cat: 'donbox', nome: 'Donbox Don Australiano', preco: 42.99, desc: 'Don Australiano + fritas + 2 pedaços de frango + bebida.', opcoes: ['queijo', 'bebidaBox'] },
  { id: 'box-don-gourmet',    cat: 'donbox', nome: 'Donbox Don Gourmet', preco: 41.99, desc: 'Don Gourmet + fritas + 2 pedaços de frango + bebida.', opcoes: ['queijo', 'bebidaBox'] },
  { id: 'box-gourmet-duplo',  cat: 'donbox', nome: 'Donbox Don Gourmet Duplo', preco: 46.99, desc: 'Don Gourmet Duplo + fritas + 2 pedaços de frango + bebida.', opcoes: ['queijo', 'bebidaBox'] },
  { id: 'box-don-suino',      cat: 'donbox', nome: 'Donbox Don Suíno', preco: 42.99, desc: 'Don Suíno + fritas + 2 pedaços de frango + bebida.', opcoes: ['bebidaBox'] },
  { id: 'box-don-camarao',    cat: 'donbox', nome: 'Donbox Don Camarão', preco: 48.99, desc: 'Don Camarão + fritas + 2 pedaços de frango + bebida.', opcoes: ['bebidaBox'] },
  { id: 'box-baguete-frango', cat: 'donbox', nome: 'Donbox Baguete Frango', preco: 45.99, desc: 'Don Baguete Frango + fritas + 2 pedaços de frango + bebida.', opcoes: ['queijo', 'bebidaBox'] },
  { id: 'box-baguete-carne',  cat: 'donbox', nome: 'Donbox Baguete Carne', preco: 47.99, desc: 'Don Baguete Carne + fritas + 2 pedaços de frango + bebida.', opcoes: ['queijo', 'bebidaBox'] },
  { id: 'box-kids-frango',    cat: 'donbox', nome: 'Donbox Don Kids Frango', preco: 36.99, desc: 'Don Kids Frango + fritas + 2 pedaços de frango + bebida.', opcoes: ['queijo', 'bebidaBox'] },
  { id: 'box-kids-carne',     cat: 'donbox', nome: 'Donbox Don Kids Carne', preco: 38.99, desc: 'Don Kids Carne + fritas + 2 pedaços de frango + bebida.', opcoes: ['queijo', 'bebidaBox'] },

  // ---------- FRITAS & MOLHOS ----------
  { id: 'fritas-media',   cat: 'acomp', nome: 'Fritas Média (200g)', preco: 12.90, desc: 'Batata frita sequinha e crocante.' },
  { id: 'fritas-grande',  cat: 'acomp', nome: 'Fritas Grande (300g)', preco: 14.90, desc: 'Batata frita sequinha e crocante.' },
  { id: 'fritas-extra',   cat: 'acomp', nome: 'Fritas Extra (400g)', preco: 17.90, desc: 'Para quem não divide batata.' },
  { id: 'fritas-cheddar', cat: 'acomp', nome: 'Fritas Cheddar e Bacon', preco: 19.90, desc: '300g de fritas com cheddar cremoso e bacon crocante.', destaque: true },
  { id: 'molhos',         cat: 'acomp', nome: 'Molho extra', preco: 2.99, desc: 'Especial da casa, maionese temperada, mostarda e mel, barbecue, baconese ou pimenta.', opcoes: ['molho'] },

  // ---------- ALMOÇO ----------
  { id: 'parmegiana-frango', cat: 'almoco', nome: 'Parmegiana de Frango', preco: 27.90, desc: 'Filé de frango empanado com molho de tomate e queijo gratinado.', destaque: true },
  { id: 'parmegiana-carne',  cat: 'almoco', nome: 'Parmegiana de Carne', preco: 32.90, desc: 'Filé de carne empanado com molho de tomate e queijo gratinado.' },
  { id: 'sobrecoxa',         cat: 'almoco', nome: 'Sobrecoxa Desossada Crocante', preco: 27.90, desc: 'Sobrecoxa sem osso, empanada e crocante.' },
  { id: 'tiras-frango',      cat: 'almoco', nome: 'Tiras de Frango Crocante', preco: 29.90, desc: 'Tiras de filé de frango empanadas na hora.' },
  { id: 'frango-grelhado',   cat: 'almoco', nome: 'Frango Grelhado', preco: 25.90, desc: 'Suculento peito de frango grelhado.' },
  { id: 'strogonoff',        cat: 'almoco', nome: 'Strogonoff de Frango', preco: 26.90, desc: 'Clássico strogonoff de frango cremoso.' },
  { id: 'maminha',           cat: 'almoco', nome: 'Maminha Grelhada', preco: 35.90, desc: 'Maminha grelhada no ponto que você preferir.', opcoes: ['ponto'] },
  { id: 'iscas-carne',       cat: 'almoco', nome: 'Iscas de Carne Acebolada', preco: 30.90, desc: 'Iscas de carne macias com cebola.' },
  { id: 'escondidinho-carne',cat: 'almoco', nome: 'Escondidinho de Carne de Sol', preco: 24.99, desc: 'Purê cremoso com carne de sol e queijo gratinado.' },
  { id: 'escondidinho-frango', cat: 'almoco', nome: 'Escondidinho de Frango', preco: 21.99, desc: 'Purê cremoso com frango desfiado e queijo gratinado.' },
  { id: 'camarao-molho',     cat: 'almoco', nome: 'Fettuccine com Camarão', preco: 33.90, desc: 'Fettuccine com camarões ao molho de tomate.' },
  { id: 'tilapia',           cat: 'almoco', nome: 'Tilápia com Camarões', preco: 36.90, desc: 'Filé de tilápia com camarões no molho de tomate caseiro.' },
  { id: 'salada-frango',     cat: 'almoco', nome: 'Salada de Frango', preco: 24.90, desc: 'Mix de folhas, cenoura, tomate cereja, queijo branco e iscas de frango grelhado.', opcoes: ['molhoSalada'] },
  { id: 'salada-camarao',    cat: 'almoco', nome: 'Salada de Camarão', preco: 30.90, desc: 'Mix de folhas, cenoura, tomate cereja, queijo branco e camarão.', opcoes: ['molhoSalada'] },

  // ---------- BEBIDAS ----------
  { id: 'refri-lata', cat: 'bebidas', nome: 'Refrigerante Lata 350ml', preco: 7.00, desc: 'Coca-Cola, Coca Zero, Kuat, Sprite, Fanta Laranja ou Fanta Uva.', opcoes: ['refriLata'] },
  { id: 'refri-1l',   cat: 'bebidas', nome: 'Refrigerante 1 Litro', preco: 12.00, desc: 'Coca-Cola, Coca Zero ou Guaraná Antarctica.', opcoes: ['refri1l'] },
  { id: 'sucos',      cat: 'bebidas', nome: 'Suco 300ml', preco: 7.00, desc: 'Cajá, graviola, acerola, goiaba, abacaxi com hortelã ou manga.', opcoes: ['suco'] },
  { id: 'milk-300',   cat: 'bebidas', nome: 'Milkshake 300ml', preco: 14.99, desc: 'Chocolate, morango ou Ovomaltine.', opcoes: ['milk'] },
  { id: 'milk-500',   cat: 'bebidas', nome: 'Milkshake 500ml', preco: 16.99, desc: 'Chocolate, morango ou Ovomaltine.', opcoes: ['milk'] },
];
