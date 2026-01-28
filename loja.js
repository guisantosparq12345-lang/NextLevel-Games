const currentUser = JSON.parse(localStorage.getItem("currentUser"));
if(!currentUser) {
    alert("🔒 Faça login para acessar a loja!");
    window.location.href = "login.html";
}

// Jogos
let jogos = JSON.parse(localStorage.getItem("games")) || [];

// Carrinho do usuário
let carrinho = currentUser.cart || [];

// Elementos
const catalogo = document.getElementById("catalogo");
const search = document.getElementById("search");
const listaCarrinho = document.getElementById("listaCarrinho");
const totalSpan = document.getElementById("total");

function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
}

function mostrarJogos(lista){
    catalogo.innerHTML = "";
    lista.forEach(jogo => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <img src="${jogo.imagem}">
            <div class="info">
                <h3>${jogo.nome}</h3>
                <span>${jogo.genero}</span><br>
                <strong>R$ ${jogo.preco.toFixed(2)}</strong><br><br>
                <button onclick='adicionarCarrinho(${JSON.stringify(jogo)})'>Comprar</button>
            </div>
        `;
        catalogo.appendChild(card);
    });
}

if(search){
    search.addEventListener("input", ()=>{
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
    // salva no usuário
    currentUser.cart = carrinho;
    let users = JSON.parse(localStorage.getItem("users"));
    const index = users.findIndex(u=>u.username===currentUser.username);
    users[index] = currentUser;
    localStorage.setItem("users", JSON.stringify(users));
}

function removerCarrinho(idx){
    carrinho.splice(idx,1);
    atualizarCarrinho();
}

function finalizarCompra(){
    if(carrinho.length===0) return alert("Carrinho vazio!");
    alert("✅ Compra realizada!");
    carrinho=[];
    atualizarCarrinho();
}

// Inicializa
mostrarJogos(jogos);
atualizarCarrinho();
