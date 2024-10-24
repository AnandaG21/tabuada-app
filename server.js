const express = require('express');
const app = express();
const port = 3000;

// Definir a rota principal que vai capturar os parâmetros da URL
app.get('/', (req, res) => {
    // Obter os parâmetros da URL (tabuada e sequencia)
    const tabuada = parseInt(req.query.tabuada); // O número da tabuada
    const sequencia = parseInt(req.query.sequencia) || 10; // Sequência padrão de 10 se não for fornecida

    // Formulário HTML para o usuário inserir o número e a sequência
    let formulario = `
        <form action="/" method="GET">
            <label for="tabuada">Número da Tabuada:</label><br>
            <input type="number" id="tabuada" name="tabuada" min="1" required><br><br>

            <label for="sequencia">Quantidade de multiplicações (Opcional, padrão 10):</label><br>
            <input type="number" id="sequencia" name="sequencia" min="1" placeholder="Digite a quantidade"><br><br>

            <button type="submit">Calcular Tabuada</button>
        </form>
    `;

    // Verificar se o número da tabuada foi informado e é um número válido
    if (isNaN(tabuada)) {
        return res.send(`
            <!DOCTYPE html>
            <html lang="pt-BR">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Tabuada</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    h1 { color: #4169E1; }
                    form { margin-bottom: 20px; }
                </style>
            </head>
            <body>
                <h1>Por favor, informe um número válido para a tabuada.</h1>
                ${formulario}
            </body>
            </html>
        `);
    }

    // Gerar a tabuada do número fornecido
    let resultado = `<h1>Tabuada do ${tabuada}</h1><ul>`;
    for (let i = 0; i <= sequencia; i++) {
        resultado += `<li>${tabuada} x ${i} = ${tabuada * i}</li>`;
    }
    resultado += '</ul>';

    // Enviar a página HTML com o formulário e o resultado da tabuada
    res.send(`
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Tabuada</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                h1 { color: #4169E1; }
                ul { list-style-type: none; padding: 0; }
                li { margin: 5px 0; font-size: 18px; }
                form { margin-bottom: 20px; }
            </style>
        </head>
        <body>
            ${formulario}
            ${resultado}
        </body>
        </html>
    `);
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
