import { criarTemplate } from "./templates.js";
import { salvarFormulario, carregarFormulario } from "./storage.js";

const app = document.getElementById("app");
const feedback = document.getElementById("feedback");

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

function mostrarErro(campo, mensagem) {
    campo.setAttribute("aria-invalid", "true");

    let erro = document.getElementById(`${campo.id}-erro`);

    if (!erro) {
        erro = document.createElement("div");
        erro.id = `${campo.id}-erro`;
        erro.className = "erro";
        erro.setAttribute("role", "alert");
        erro.setAttribute("aria-live", "assertive");

        campo.insertAdjacentElement("afterend", erro);
    }

    erro.textContent = mensagem;
    campo.setAttribute("aria-describedby", erro.id);
}

function removerErro(campo) {
    campo.removeAttribute("aria-invalid");
    campo.removeAttribute("aria-describedby");

    const erro = document.getElementById(`${campo.id}-erro`);

    if (erro) {
        erro.remove();
    }
}

function validarNome(nome) {
    return nome.trim().length >= 3;
}

function validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function validarMensagem(mensagem) {
    return mensagem.trim().length >= 10;
}

function validarFormulario() {
    const nome = document.getElementById("nome");
    const email = document.getElementById("email");
    const mensagem = document.getElementById("mensagem");

    let formularioValido = true;

    if (!validarNome(nome.value)) {
        mostrarErro(nome, "Digite um nome com pelo menos 3 caracteres.");
        formularioValido = false;
    } else {
        removerErro(nome);
    }

    if (!validarEmail(email.value)) {
        mostrarErro(email, "Digite um e-mail válido.");
        formularioValido = false;
    } else {
        removerErro(email);
    }

    if (!validarMensagem(mensagem.value)) {
        mostrarErro(mensagem, "Digite uma mensagem com pelo menos 10 caracteres.");
        formularioValido = false;
    } else {
        removerErro(mensagem);
    }

    if (!formularioValido) {
        feedback.textContent = "Verifique os campos do formulário.";
        feedback.setAttribute("role", "alert");
        feedback.setAttribute("aria-live", "assertive");

        return false;
    }

    feedback.textContent = "";
    feedback.removeAttribute("role");

    return true;
}

function iniciarFormulario() {
    const formulario = document.getElementById("formulario");
    const nome = document.getElementById("nome");
    const email = document.getElementById("email");
    const mensagem = document.getElementById("mensagem");

    formulario.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!validarFormulario()) {
            return;
        }

        const dadosFormulario = {
            nome: nome.value.trim(),
            email: email.value.trim(),
            mensagem: mensagem.value.trim()
        };

        salvarFormulario(dadosFormulario);

        feedback.textContent = "Mensagem enviada com sucesso.";
        feedback.setAttribute("role", "status");
        feedback.setAttribute("aria-live", "polite");

        Swal.fire({
            title: "Sucesso!",
            text: "Mensagem enviada com sucesso.",
            icon: "success"
        });
    });

    nome.addEventListener("input", function () {
        if (validarNome(nome.value)) {
            removerErro(nome);
        }
    });

    email.addEventListener("input", function () {
        if (validarEmail(email.value)) {
            removerErro(email);
        }
    });

    mensagem.addEventListener("input", function () {
        if (validarMensagem(mensagem.value)) {
            removerErro(mensagem);
        }
    });

    const dadosSalvos = carregarFormulario();

    if (dadosSalvos) {
        nome.value = dadosSalvos.nome;
        email.value = dadosSalvos.email;
        mensagem.value = dadosSalvos.mensagem;
    }
}

window.addEventListener("hashchange", navegar);

window.addEventListener("DOMContentLoaded", function () {
    navegar();
    iniciarFormulario();
});