const telefone = document.getElementById("telefone");
const cep = document.getElementById("cep");

telefone.addEventListener("input", function () {
    let valor = telefone.value.replace(/\D/g, "");

    if (valor.length > 11) {
        valor = valor.slice(0, 11);
    }

    if (valor.length > 7) {
        telefone.value =
            "(" + valor.slice(0, 2) + ") " +
            valor.slice(2, 7) + "-" +
            valor.slice(7);
    } else if (valor.length > 2) {
        telefone.value =
            "(" + valor.slice(0, 2) + ") " +
            valor.slice(2);
    } else if (valor.length > 0) {
        telefone.value = "(" + valor;
    } else {
        telefone.value = "";
    }
});

cep.addEventListener("input", function () {
    let valor = cep.value.replace(/\D/g, "");

    if (valor.length > 8) {
        valor = valor.slice(0, 8);
    }

    if (valor.length > 5) {
        cep.value =
            valor.slice(0, 5) + "-" +
            valor.slice(5);
    } else {
        cep.value = valor;
    }
});