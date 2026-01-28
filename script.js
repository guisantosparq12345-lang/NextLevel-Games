// 🔐 Proteção: redireciona se não estiver logado como admin
if (localStorage.getItem("admin") !== "true" && !window.location.pathname.includes("admin.html")) {
    alert("🔒 Você precisa logar como administrador!");
    window.location.href = "admin.html";
}

// 🎮 Lista de jogos
let jogos = [
    {
        nome: "The Witcher 3",
        genero: "RPG",
        preco: 59.90,
        imagem: "https://upload.wikimedia.org/wikipedia/en/0/0c/Witcher_3_cover_art.jpg"
    },
    {
        nome: "GTA V",
        genero: "Ação",
        preco: 79.90,
        imagem: "https://upload.wikimedia.org/wikipedia/en/a/a5/Grand_Theft_Auto_V.png"
    },
    {
        nome: "Minecraft",
        genero: "Sandbox",
        preco: 49.90,
        imagem: "https://upload.wikimedia.org/wikipedia/en/5/51/Minecraft_cover.png"
    },
    {
        nome: "God of War",
        genero: "Aventura",
        preco: 89.90,
        imagem: "https://upload.wikimedia.org/wikipedia/en/a/a7/God_of_War_4_cover.jpg"
    },
    {
        nome: "Spider-Man 2",
        genero: "Ação",
        preco: 99.90,
        imagem: "https://upload.wikimedia.org/wikipedia/en/1/1b/Spider-Man_2_PS5_cover.jpg"
    }
];

// ELEMENTOS
const catalogo = document.getElementById("catalogo");
const search = document.getElementById("search");
const listaCarrinho = document.getElementById("listaCarrinho");
const totalSpan = document.getElementById("total");

let carrinho = [];

// 🚪 Logout
function logout() {
    localStorage.removeItem("admin");
    window.location.href = "admin.html";
}

// 🧱 Mostrar jogos
function mostrarJogos(lista) {
    if (!catalogo) return;

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
                <button onclick='adicionarCarrinho(${JSON.stringify(jogo)})'>
                    Comprar
                </button>
            </div>
        `;

        catalogo.appendChild(card);
    });
}

// 🔎 Busca
if (search) {
    search.addEventListener("input", () => {
        const texto = search.value.toLowerCase();
        const filtrados = jogos.filter(j =>
            j.nome.toLowerCase().includes(texto)
        );
        mostrarJogos(filtrados);
    });
}

// 🛒 Carrinho
function adicionarCarrinho(jogo) {
    carrinho.push(jogo);
    atualizarCarrinho();
}

function atualizarCarrinho() {
    listaCarrinho.innerHTML = "";
    let total = 0;

    carrinho.forEach((item, index) => {
        total += item.preco;
        listaCarrinho.innerHTML += `
            <li>
                ${item.nome} - R$ ${item.preco.toFixed(2)}
                <button onclick="removerCarrinho(${index})">❌</button>
            </li>
        `;
    });

    totalSpan.textContent = total.toFixed(2);
}

function removerCarrinho(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Carrinho vazio!");
        return;
    }

    alert("✅ Compra realizada com sucesso!");
    carrinho = [];
    atualizarCarrinho();
}

// 🚀 Inicializar
mostrarJogos(jogos);
