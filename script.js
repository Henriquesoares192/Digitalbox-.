document.getElementById('login-form').addEventListener('submit', async e => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  const res = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha })
  });

  const data = await res.json();
  if (res.ok) {
    alert(`Bem-vindo, ${data.user.nome}! Você tem ${data.user.moedas} moedas.`);
    // Redirecionar para painel admin se quiser, ou área do usuário
  } else {
    alert(data.error);
  }
});
