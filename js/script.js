import { criarTemplate } from "./templates.js";
import { salvarFormulario, carregarFormulario } from "./storage.js";

const app = document.getElementById("app");

const rotas = {
    "#inicio": "<h2>Início</h2><p>Bem-vindo à ONG.</p>",
    "#contato": "<h2>Contato</h2><p>Entre em contato conosco.</p>"
};

const dados = [
    {
        titulo: "Projeto da ONG",
        descricao: "Nossa ONG realiza projetos para ajudar pessoas e melhorar a vida da comunidade."
    },
    {
        titulo: "Como ajudar",
        descricao: "Você pode apoiar nossos projetos e contribuir com a comunidade."
    }
];

function mostrarConteudo() {
    app.innerHTML = dados.map(criarTemplate).join("");
}

function navegar() {
    const rota = window.location.hash || "#inicio";

    if (rota === "#inicio") {
        mostrarConteudo();
    } else {
        app.innerHTML = rotas[rota] || rotas["#inicio"];
    }
}

function iniciarFormulario() {
    const formulario = document.getElementById("formulario");

    formulario.addEventListener("submit", function (event) {
        event.preventDefault();

        const dadosFormulario = {
            nome: document.getElementById("nome").value,
            email: document.getElementById("email").value,
            mensagem: document.getElementById("mensagem").value
        };

        salvarFormulario(dadosFormulario);

        Swal.fire({
            title: "Sucesso!",
            text: "Mensagem enviada com sucesso.",
            icon: "success"
        });
    });

    const dadosSalvos = carregarFormulario();

    if (dadosSalvos) {
        document.getElementById("nome").value = dadosSalvos.nome;
        document.getElementById("email").value = dadosSalvos.email;
        document.getElementById("mensagem").value = dadosSalvos.mensagem;
    }
}

window.addEventListener("hashchange", navegar);

window.addEventListener("DOMContentLoaded", function () {
    navegar();
    iniciarFormulario();
});
