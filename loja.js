// 🔹 Loja sem login

// Jogos
let jogos = JSON.parse(localStorage.getItem("games")) || [];

// Carrinho local
let carrinho = [];

// Elementos
const catalogo = document.getElementById("catalogo");
const search = document.getElementById("search");
const listaCarrinho = document.getElementById("listaCarrinho");
const totalSpan = document.getElementById("total");

// Mostrar jogos
function mostrarJogos(lista){
    catalogo.innerHTML = "";
    lista.forEach((jogo, idx) => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <img src="${jogo.imagem}">
            <div class="info">
                <h3>${jogo.nome}</h3>
                <span>${jogo.genero}</span><br>
                <strong>R$ ${jogo.preco.toFixed(2)}</strong><br><br>
                <button onclick='adicionarCarrinho(${idx})'>Comprar</button>
            </div>
        `;
        catalogo.appendChild(card);
    });
}

// Busca
if(search){
    search.addEventListener("input", () => {
        const texto = search.value.toLowerCase();
        const filtrados = jogos.filter(j => j.nome.toLowerCase().includes(texto));
        mostrarJogos(filtrados);
    });
}

// Carrinho
function adicionarCarrinho(idx){
    carrinho.push(jogos[idx]);
    atualizarCarrinho();
}

function removerCarrinho(idx){
    carrinho.splice(idx, 1);
    atualizarCarrinho();
}

function atualizarCarrinho(){
    listaCarrinho.innerHTML = "";
    let total = 0;
    carrinho.forEach((item, idx)=>{
        total += item.preco;
        listaCarrinho.innerHTML += `
            <li>
                ${item.nome} - R$ ${item.preco.toFixed(2)}
                <button onclick="removerCarrinho(${idx})">❌</button>
            </li>
        `;
    });
    totalSpan.textContent = total.toFixed(2);
}

function finalizarCompra(){
    if(carrinho.length === 0) return alert("Carrinho vazio!");
    alert("✅ Compra realizada!");
    carrinho = [];
    atualizarCarrinho();
}

// Inicializar
mostrarJogos(jogos);
atualizarCarrinho();
