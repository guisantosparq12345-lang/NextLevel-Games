// ===== Usuários simulados =====
const users = [
    { username: "admin", password: "admin123", role: "admin" },
    { username: "user", password: "user123", role: "user" }
];

// ===== Estado =====
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
let jogos = JSON.parse(localStorage.getItem("games")) || [
    {nome:"The Witcher 3", genero:"RPG", preco:59.9, imagem:"https://upload.wikimedia.org/wikipedia/en/0/0c/Witcher_3_cover_art.jpg"},
    {nome:"GTA V", genero:"Ação", preco:79.9, imagem:"https://upload.wikimedia.org/wikipedia/en/a/a5/Grand_Theft_Auto_V.png"}
];
let carrinho = [];

// ===== Elementos =====
const loginForm = document.getElementById("loginForm");
const lojaContent = document.getElementById("lojaContent");
const adminContent = document.getElementById("adminContent");
const adminTab = document.getElementById("adminTab");
const catalogo = document.getElementById("catalogo");
const adminCatalogo = document.getElementById("adminCatalogo");
const search = document.getElementById("search");
const carrinhoLista = document.getElementById("carrinhoLista");
const totalSpan = document.getElementById("total");

// ===== Funções de Aba =====
function abrirAba(aba){
    loginForm.style.display = "none";
    lojaContent.style.display = "none";
    adminContent.style.display = "none";

    if(aba==="login") loginForm.style.display="block";
    if(aba==="loja") lojaContent.style.display="block";
    if(aba==="admin") adminContent.style.display="block";
}

// ===== Login =====
function login(){
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const user = users.find(u => u.username===username && u.password===password);
    if(!user) return alert("Usuário ou senha incorretos!");

    currentUser = user;
    localStorage.setItem("currentUser", JSON.stringify(user));
    alert(`Bem-vindo, ${user.username}!`);

    lojaContent.style.display = "block";
    loginForm.style.display = "none";

    if(user.role==="admin") adminTab.style.display = "inline-block";
    mostrarJogos(jogos);
    mostrarJogosAdmin();
}

// ===== Logout =====
function logout(){
    localStorage.removeItem("currentUser");
    location.reload();
}

// ===== Loja =====
function mostrarJogos(lista){
    catalogo.innerHTML = "";
    lista.forEach((jogo, idx) => {
        const card = document.createElement("div");
        card.className="card";
        card.innerHTML=`
            <img src="${jogo.imagem}" style="width:100%">
            <h3>${jogo.nome}</h3>
            <p>${jogo.genero}</p>
            <strong>R$ ${Number(jogo.preco).toFixed(2)}</strong><br>
            <button onclick='adicionarCarrinho(${idx})'>Comprar</button>
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

// ===== Carrinho =====
function adicionarCarrinho(idx){
    carrinho.push(jogos[idx]);
    atualizarCarrinho();
}

function atualizarCarrinho(){
    carrinhoLista.innerHTML = "";
    let total = 0;
    carrinho.forEach((item,i)=>{
        total+=Number(item.preco);
        carrinhoLista.innerHTML+=`<li>${item.nome} - R$ ${item.preco.toFixed(2)} <button onclick="removerCarrinho(${i})">❌</button></li>`;
    });
    totalSpan.textContent = total.toFixed(2);
}

function removerCarrinho(i){
    carrinho.splice(i,1);
    atualizarCarrinho();
}

function finalizarCompra(){
    if(carrinho.length===0) return alert("Carrinho vazio!");
    alert("Compra realizada com sucesso!");
    carrinho=[];
    atualizarCarrinho();
}

// ===== Admin =====
function mostrarJogosAdmin(){
    if(!currentUser || currentUser.role!=="admin") return;
    adminCatalogo.innerHTML="";
    jogos.forEach((jogo, idx)=>{
        const card = document.createElement("div");
        card.className="card";
        card.innerHTML=`
            <img src="${jogo.imagem}" style="width:100%">
            <h3>${jogo.nome}</h3>
            <p>${jogo.genero}</p>
            <strong>R$ ${Number(jogo.preco).toFixed(2)}</strong><br>
            <button onclick="editarJogo(${idx})">✏️ Editar</button>
            <button onclick="removerJogo(${idx})">❌ Remover</button>
        `;
        adminCatalogo.appendChild(card);
    });
}

function adicionarJogo(){
    if(!currentUser || currentUser.role!=="admin") return alert("Apenas admins podem adicionar jogos!");
    const nome = document.getElementById("gameName").value;
    const genero = document.getElementById("gameGenre").value;
    const preco = parseFloat(document.getElementById("gamePrice").value);
    const imagem = document.getElementById("gameImage").value;

    if(!nome||!genero||isNaN(preco)||!imagem) return alert("Preencha todos os campos!");
    jogos.push({nome,genero,preco,imagem});
    localStorage.setItem("games", JSON.stringify(jogos));
    mostrarJogos(jogos);
    mostrarJogosAdmin();
}

function removerJogo(idx){
    if(!confirm("Deseja remover este jogo?")) return;
    jogos.splice(idx,1);
    localStorage.setItem("games", JSON.stringify(jogos));
    mostrarJogos(jogos);
    mostrarJogosAdmin();
}

function editarJogo(idx){
    const jogo = jogos[idx];
    const novoNome = prompt("Nome:", jogo.nome);
    const novoGenero = prompt("Gênero:", jogo.genero);
    const novoPreco = parseFloat(prompt("Preço:", jogo.preco));
    const novaImagem = prompt("URL da Imagem:", jogo.imagem);

    if(!novoNome||!novoGenero||isNaN(novoPreco)||!novaImagem) return;
    jogos[idx]={nome:novoNome, genero:novoGenero, preco:novoPreco, imagem:novaImagem};
    localStorage.setItem("games", JSON.stringify(jogos));
    mostrarJogos(jogos);
    mostrarJogosAdmin();
}

// ===== Inicialização =====
if(currentUser){
    lojaContent.style.display="block";
    if(currentUser.role==="admin") adminTab.style.display="inline-block";
    mostrarJogos(jogos);
    mostrarJogosAdmin();
} else {
    loginForm.style.display="block";
}
