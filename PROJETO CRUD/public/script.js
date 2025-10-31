document.addEventListener('DOMContentLoaded', () => {
    carregar();

    document.getElementById('form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('id').value;
        const dados = {
            nome: document.getElementById('nome').value,
            cpf: document.getElementById('cpf').value,
            endereco: document.getElementById('endereco').value
        };

        const url = id ? `/api/beneficiarios/${id}` : '/api/beneficiarios';
        const method = id ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados)
            });

            const json = await res.json();

            if (!res.ok) {
                alert('ERRO: ' + json.error);
                return;
            }

            limparForm();
            carregar();
        } catch (err) {
            alert('Erro de conexão: ' + err.message);
        }
    });
});

async function carregar() {
    const res = await fetch('/api/beneficiarios');
    const lista = await res.json();
    const tbody = document.getElementById('lista');
    tbody.innerHTML = '';

    lista.forEach(b => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${b.nome}</td>
            <td>${b.cpf}</td>
            <td>${b.endereco}</td>
            <td>
                <button class="edit-btn" onclick="editar(${b.id})">Editar</button>
                <button class="delete-btn" onclick="excluir(${b.id})">Excluir</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

async function editar(id) {
    const res = await fetch(`/api/beneficiarios/${id}`);
    const b = await res.json();
    document.getElementById('id').value = b.id;
    document.getElementById('nome').value = b.nome;
    document.getElementById('cpf').value = b.cpf;
    document.getElementById('endereco').value = b.endereco;
}

async function excluir(id) {
    if (confirm('Tem certeza que deseja excluir?')) {
        await fetch(`/api/beneficiarios/${id}`, { method: 'DELETE' });
        carregar();
    }
}

function limparForm() {
    document.getElementById('form').reset();
    document.getElementById('id').value = '';
}