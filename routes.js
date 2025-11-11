// server/routes.js
const express = require('express');
const router = express.Router();
const db = require('./database');

// GET: Listar todas as doações
router.get('/doacoes', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM doacoes ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar doações' });
  }
});

// POST: Cadastrar nova doação
router.post('/doacoes', async (req, res) => {
  const { descricao, quantidade, unidade, cep, retirada } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO doacoes (descricao, quantidade, unidade, cep, retirada) VALUES (?, ?, ?, ?, ?)',
      [descricao, quantidade, unidade, cep, retirada ? 1 : 0]
    );
    res.json({ id: result.insertId, ...req.body });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao salvar' });
  }
});

// DELETE: Excluir doação
router.delete('/doacoes/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM doacoes WHERE id = ?', [req.params.id]);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao excluir' });
  }
});

module.exports = router;