# Projeto CRUD – Gestão de Beneficiários (ODS 2)

Aplicação web para cadastrar e gerenciar beneficiários de ONG.

## Tecnologias
- HTML, CSS, JavaScript
- Node.js (portátil)
- Express
- MySQL

## Como Executar
1. Baixe o Node.js portátil: https://nodejs.org/dist/v22.11.0/node-v22.11.0-win-x64.zip
2. Extraia em `node-portable/`
3. Edite `server/database.js` → senha: `15052006`
4. Crie o banco no MySQL Workbench:
   ```sql
   CREATE DATABASE ong;
   USE ong;
   CREATE TABLE beneficiarios (...);