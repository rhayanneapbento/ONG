export function salvarFormulario(dadosFormulario) {
    localStorage.setItem("dadosFormulario", JSON.stringify(dadosFormulario));
}

export function carregarFormulario() {
    const dadosSalvos = localStorage.getItem("dadosFormulario");

    if (dadosSalvos) {
        return JSON.parse(dadosSalvos);
    }

    return null;
}
