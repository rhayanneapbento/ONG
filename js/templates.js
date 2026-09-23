export function criarTemplate(item) {
    return `
        <div class="card">
            <h2>${item.titulo}</h2>
            <p>${item.descricao}</p>
        </div>
    `;
}
