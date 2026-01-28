// Jogos carregados do admin
let jogos = JSON.parse(localStorage.getItem("games")) || [];

// Elementos
const catalogo = document.getElementById("catalogo");
const search = document.getElementById("search");
const listaCarrinho = document.getElementById("listaCarrinho");
const totalSpan = document.getElementById("total");

let carrinho = [];

// Mostrar jogos
function mostrarJogos(lista) {
    if(!catalogo) return;
    catalogo.innerHTML = "";

    lista.forEach((jogo, idx) => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="${jogo.imagem}" alt="${jogo.nome}">
            <h3>${jogo.nome}</h3>
            <p>${jogo.genero}</p>
            <strong>R$ ${Number(jogo.preco).toFixed(2)}</strong><br>
            <button>Adicionar ao Carrinho</button>
        `;

        card.querySelector("button").addEventListener("click", () => adicionarCarrinho(jogo));
        catalogo.appendChild(card);
    });
}

// Buscar
if(search){
    search.addEventListener("input", () => {
        const texto = search.value.toLowerCase();
        const filtrados = jogos.filter(j => j.nome.toLowerCase().includes(texto));
        mostrarJogos(filtrados);
    });
}

// Carrinho
function adicionarCarrinho(jogo){
    carrinho.push(jogo);
    atualizarCarrinho();
}

function removerCarrinho(idx){
    carrinho.splice(idx,1);
    atualizarCarrinho();
}

function atualizarCarrinho(){
    listaCarrinho.innerHTML = "";
    let total = 0;

    carrinho.forEach((item, idx) => {
        total += item.preco;
        const li = document.createElement("li");
        li.innerHTML = `${item.nome} - R$ ${item.preco.toFixed(2)} <button onclick="removerCarrinho(${idx})">❌</button>`;
        listaCarrinho.appendChild(li);
    });

    totalSpan.textContent = total.toFixed(2);
}

function finalizarCompra(){
    if(carrinho.length === 0) return alert("Carrinho vazio!");
    alert("✅ Compra realizada com sucesso!");
    carrinho = [];
    atualizarCarrinho();
}

// Inicializar catálogo
mostrarJogos(jogos);
