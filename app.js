const API = '/api/doacoes';

function show(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  if (id === 'lista') carregar();
}

document.getElementById('form')?.addEventListener('submit', async e => {
  e.preventDefault();
  const payload = {
    descricao: document.getElementById('descricao').value,
    quantidade: +document.getElementById('quantidade').value,
    unidade: document.getElementById('unidade').value,
    cep: document.getElementById('cep').value.replace(/\D/g, ''),
    retirada: document.getElementById('retirada').checked
  };

  await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  e.target.reset();
  show('confirmacao');
});

async function carregar() {
  const res = await fetch(API);
  const data = await res.json();
  const tbody = document.querySelector('#tabela tbody');
  const empty = document.getElementById('empty');
  tbody.innerHTML = '';

  if (data.length === 0) {
    empty.style.display = 'block';
    return;
  }
  empty.style.display = 'none';

  data.forEach(d => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${d.descricao}</strong></td>
      <td>${d.quantidade} ${d.unidade}</td>
      <td>${d.cep.replace(/(\d{5})(\d{3})/, '$1-$2')}</td>
      <td>${d.retirada ? 'Sim' : 'Não'}</td>
      <td class="acoes">
        <button class="delete" onclick="excluir(${d.id})">Excluir</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

window.excluir = async id => {
  if (confirm('Excluir?')) {
    await fetch(`${API}/${id}`, { method: 'DELETE' });
    carregar();
  }
};

show('home');