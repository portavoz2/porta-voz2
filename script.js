// script.js - Porta-Voz2 (static demo)
const ADMIN_EMAIL = "anilfofilipecomate@gmail.com";
const CONTACT_PHONE = "258877225947";

const books = [
  {id:1, title:"Amor de Deus: Paz Interior — 5 Pontos Relevantes", price:350, desc:"Livro que ajuda a encontrar paz interior através do amor de Deus.", img:"https://picsum.photos/seed/amor/400/300"},
  {id:2, title:"Como se Livrar da Maldição da Pobreza", price:420, desc:"Estratégias práticas e espirituais para prosperidade.", img:"https://picsum.photos/seed/pobreza/400/300"},
  {id:3, title:"Libertação Espiritual: Como Vencer as Correntes Invisíveis", price:500, desc:"Guia de libertação espiritual com exemplos e versículos.", img:"https://picsum.photos/seed/libertacao/400/300"},
  {id:4, title:"Prosperidade: Caminho para uma Vida Abundante", price:380, desc:"Reflexões e passos para uma vida próspera.", img:"https://picsum.photos/seed/prosperidade/400/300"},
  {id:5, title:"Paz Interior — Guia Completo", price:300, desc:"Guia prático para alcançar paz interior diariamente.", img:"https://picsum.photos/seed/paz/400/300"}
];

function formatMT(n){ return n.toLocaleString('pt-MZ') + " MT"; }

function renderBooks(){
  const container = document.getElementById('books');
  container.innerHTML = '';
  books.forEach(b=>{
    const el = document.createElement('div');
    el.className = 'book';
    el.innerHTML = `
      <img src="${b.img}" alt="${b.title}">
      <h3>${b.title}</h3>
      <p class="muted small">${b.desc}</p>
      <div class="price">${formatMT(b.price)}</div>
      <div class="actions">
        <button class="btn buy" data-id="${b.id}">Comprar</button>
        <button class="btn" onclick="viewDetails(${b.id})">Detalhes</button>
      </div>
    `;
    container.appendChild(el);
  });
  document.querySelectorAll('.buy').forEach(btn=>{
    btn.addEventListener('click', ()=> openCheckout(parseInt(btn.dataset.id)));
  });
}

function viewDetails(id){
  const b = books.find(x=>x.id===id);
  alert(b.title + "\n\n" + b.desc + "\nPreço: " + formatMT(b.price));
}

/* Checkout (simulado) */
const modal = document.getElementById('checkoutModal');
const orderSummary = document.getElementById('orderSummary');
const paymentResult = document.getElementById('paymentResult');
document.getElementById('closeModal').addEventListener('click', ()=> closeModal());

function openCheckout(bookId){
  const book = books.find(b=>b.id===bookId);
  orderSummary.innerHTML = `<p><strong>Produto:</strong> ${book.title}</p><p><strong>Preço:</strong> ${formatMT(book.price)}</p>`;
  modal.setAttribute('aria-hidden','false');
  paymentResult.innerHTML = '';
  // attach payment buttons
  document.querySelectorAll('.pay-btn').forEach(btn=>{
    btn.onclick = ()=> simulatePayment(btn.dataset.method, book);
  });
}

function closeModal(){ modal.setAttribute('aria-hidden','true'); }

function simulatePayment(method, book){
  paymentResult.innerHTML = '<p class="muted small">Processando ' + method + '...</p>';
  setTimeout(()=>{
    paymentResult.innerHTML = '<p><strong>Pagamento via E-mola com '+ method + ' usa o numero abaixo!</strong></p><p>Resumo: ' + book.title + ' — ' + formatMT(book.price) + '</p><p>Envie o comprovante para ' + ADMIN_EMAIL + ' ou contacte ' + CONTACT_PHONE + '.</p>';
    // In a real site: call backend to create order, verify payment, send email, etc.
  }, 900);
}

/* Contact form (simulated) */
document.getElementById('contactForm').addEventListener('submit', (e)=>{
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const msg = document.getElementById('message').value;
  document.getElementById('contactResult').innerText = 'Obrigado, ' + name + '. A sua mensagem foi enviada (simulado). Enviaremos resposta para ' + email + ' em breve.';
  e.target.reset();
});

/* Admin page simple protection: check email */
if(window.location.pathname.endsWith('admin.html')){
  // handled in admin.html
}

renderBooks();
