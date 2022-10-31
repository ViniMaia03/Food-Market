// Variáveis

const form = document.getElementById("form");
const nome = document.getElementById("inputNome");
const email = document.getElementById("inputEmail");
const cnpj = document.getElementById("inputCnpj");
const senha = document.getElementById("inputSenha");
const senhaConfirmada = document.getElementById("inputSenhaConfirmada");

// Script 

form.addEventListener("submit", (e) => {
    e.preventDefault();

    checkInput();
});

function checkInput() {
    const nomeValue = nome.value;
    const emailValue = email.value;
    const cnpjValue = cnpj.value;
    const senhaValue = senha.value;
    const senhaConfirmadaValue = senhaConfirmada.value;

    if (nomeValue === "") {
        setErrorFor(nome, "O nome de usuário é obrigatório.");
    } else {
        setSuccsessFor(nome);
    }

    if (emailValue === "") {
        setErrorFor(email, "O email é obrigatório.");
    } else if (!checkEmail(emailValue)) {
        setErrorFor(email, "Insira um email válido.");
    } else {
        setSuccsessFor(email);
    }

    if (cnpjValue === "") {
        setErrorFor(cnpj, "O CNPJ é obrigatório.");
    } else if (!checkCnpj(cnpjValue)) {
        setErrorFor (cnpj, "Insira um CNPJ válido");
    } else {
        setSuccsessFor(cnpj);
    }

    if (senhaValue === "") {
        setErrorFor(senha, "A senha é obrigatória.");
    } else if (senhaValue.length < 8) {
        setErrorFor(senha, "A senha precisa ter no mínimo 8 caracteres.");
    } else {
        setSuccsessFor(senha);
    }

    if (senhaConfirmadaValue === "") {
        setErrorFor(senhaConfirmada, "");
    } else if (senhaValue != senhaConfirmadaValue) {
        setErrorFor(senhaConfirmada, "")
    } else {
        setSuccsessFor(senhaConfirmada);
    }
}

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector("small");

    small.innerText = message;

    formControl.className = "form-control error";
}

function setSuccsessFor(input, message) {
    const formControl = input.parentElement;

    formControl.className = "form-control success";
}

// Validação do Formulário

function validar() {
    const validacao = document.getElementById("#form");

    if (validacao.valid) {
        window.location.href = "inicioLogado.html";
    } else {
        alert("Revise suas informações.")
    }
}


// Regex para o email e CNPJ

function checkEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
  }

  function checkCnpj(cnpj) {
    return /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})$/.test(cnpj)
  }