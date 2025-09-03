// Função que pega os tipos de caracteres selecionados
function getChartTypes() {
  const uppercaseCheckbox =
    document.querySelector("#include_uppercase").checked;
  const lowercaseCheckbox =
    document.querySelector("#include_lowercase").checked;
  const numberCheckbox = document.querySelector("#include_numbers").checked;
  const symbolCheckbox = document.querySelector("#include_symbols").checked;

  const charTypes = [];

  if (uppercaseCheckbox) {
    charTypes.push("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
  }

  if (lowercaseCheckbox) {
    charTypes.push("abcdefghijklmnopqrstuvwxyz");
  }

  if (numberCheckbox) {
    charTypes.push("0123456789");
  }

  if (symbolCheckbox) {
    charTypes.push("!@#$%^&*()_+~`|}{[]:;?><,./-=");
  }

  return charTypes;
}

// Função que valida e retorna o tamanho da senha
function getPasswordLength() {
  const size = document.querySelector("#size").value;
  if (isNaN(size) || size < 4 || size > 128) {
    message("Tamanho inválido, insira um número entre 4 e 128!", "warning");
    return null;
  }

  return size;
}

// Função que retorna um caractere aleatório de um dos tipos escolhidos
function randomCharType(charTypes) {
  const randomIndex = Math.floor(Math.random() * charTypes.length);

  return charTypes[randomIndex][
    Math.floor(Math.random() * charTypes[randomIndex].length)
  ];
}

// Função que cria as senhas
function generatePassword(size, charTypes) {
  let passwordGenerated = "";

  while (passwordGenerated.length < size) {
    passwordGenerated += randomCharType(charTypes);
  }
  return passwordGenerated;
}

// Função para mostrar mensagens usando Toastify
// Toastify ({ text, duration, close, gravity, position, backgroundColor }))
function message(text, status = "sucess") {
  Toastify({
    text: text,
    duration: 3000,
    close: true,
    gravity: "top",
    style: {
      background:
        status === "sucess"
          ? "Green"
          : "#dc2626",
      boxShadow: "none",
    },
  }).showToast();
}

// Evento do botão "Gerar Senha"
document.querySelector("#generate").addEventListener("click", function () {
  const size = getPasswordLength();
  const charTypes = getChartTypes();

  const passwordGenerated = generatePassword(size, charTypes);

  if (!size) {
    return;
  }
  if (!charTypes.length) {
    message("Selecione ao menos um tipo de caractere!", "error");
    return;
  }

  document.querySelector("#password_container").classList.add("show");
  document.querySelector("#password").textContent = passwordGenerated;
});

// Evento do botão "Copiar senha"
document.querySelector("#copy").addEventListener("click", function () {
  navigator.clipboard.writeText(
    document.querySelector("#password").textContent
  );
  message("Senha copiada para a área de transferência!", "sucess");
});
