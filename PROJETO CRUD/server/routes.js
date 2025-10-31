const express = require('express');
const router = express.Router();
const db = require('./database');

// LISTAR TODOS
router.get('/beneficiarios', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM beneficiarios WHERE ativo = 1 ORDER BY nome');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao listar' });
    }
});

// BUSCAR POR ID
router.get('/beneficiarios/:id', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM beneficiarios WHERE id = ? AND ativo = 1', [req.params.id]);
        rows.length ? res.json(rows[0]) : res.status(404).json({ error: 'Não encontrado' });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar' });
    }
});

// CADASTRAR COM VALIDAÇÃO DE CPF
router.post('/beneficiarios', async (req, res) => {
    const { nome, cpf, endereco } = req.body;

    try {
        // VERIFICA SE CPF JÁ EXISTE
        const [exists] = await db.query('SELECT id FROM beneficiarios WHERE cpf = ? AND ativo = 1', [cpf]);
        if (exists.length > 0) {
            return res.status(400).json({ error: 'CPF já cadastrado!' });
        }

        const [result] = await db.query(
            'INSERT INTO beneficiarios (nome, cpf, endereco) VALUES (?, ?, ?)',
            [nome, cpf, endereco]
        );
        res.status(201).json({ id: result.insertId, nome, cpf, endereco });
    } catch (err) {
        res.status(400).json({ error: 'Erro ao cadastrar: ' + err.message });
    }
});

// EDITAR
router.put('/beneficiarios/:id', async (req, res) => {
    const { nome, cpf, endereco } = req.body;
    try {
        // VERIFICA SE NOVO CPF JÁ EXISTE (exceto o próprio registro)
        const [exists] = await db.query(
            'SELECT id FROM beneficiarios WHERE cpf = ? AND id != ? AND ativo = 1',
            [cpf, req.params.id]
        );
        if (exists.length > 0) {
            return res.status(400).json({ error: 'CPF já cadastrado por outro beneficiário!' });
        }

        const [result] = await db.query(
            'UPDATE beneficiarios SET nome = ?, cpf = ?, endereco = ? WHERE id = ?',
            [nome, cpf, endereco, req.params.id]
        );
        result.affectedRows ? res.json({ id: req.params.id, nome, cpf, endereco }) : res.status(404).json({ error: 'Não encontrado' });
    } catch (err) {
        res.status(400).json({ error: 'Erro ao editar' });
    }
});

// EXCLUIR (soft delete)
router.delete('/beneficiarios/:id', async (req, res) => {
    try {
        const [result] = await db.query('UPDATE beneficiarios SET ativo = 0 WHERE id = ?', [req.params.id]);
        result.affectedRows ? res.json({ message: 'Excluído com sucesso' }) : res.status(404).json({ error: 'Não encontrado' });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao excluir' });
    }
});

module.exports = router;