document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const mainContent = document.getElementById("main-content");
  const moedaForm = document.getElementById("moeda-form");
  const resultado = document.getElementById("resultado");

  // Senha de login
  const senhaCorreta = "Henriquesenhaadminsecreta7181827";

  // Login
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const senha = document.getElementById("senha").value;
    if (senha === senhaCorreta) {
      loginForm.style.display = "none";
      mainContent.style.display = "block";
    } else {
      alert("Senha incorreta!");
    }
  });

  // Adicionar moedas (simulação)
  moedaForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const usuario = document.getElementById("usuario").value;
    const quantidade = document.getElementById("quantidade").value;

    resultado.innerText = `✅ ${quantidade} moedas foram adicionadas à conta de ${usuario}.`;
    moedaForm.reset();
  });

  // Copiar QR Code PIX
  document.getElementById("copiarPix").addEventListener("click", () => {
    const codigoPix = document.getElementById("codigoPix").innerText;
    navigator.clipboard.writeText(codigoPix).then(() => {
      alert("Código Pix copiado com sucesso!");
    });
  });
});
