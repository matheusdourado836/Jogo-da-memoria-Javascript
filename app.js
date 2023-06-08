const express = require("express")
const cors = require("cors")
const app = express()

app.use(cors())

app.use(express.json())

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
  });


// Iniciar o servidor
app.listen(3000, () => {
    console.log(`Servidor rodando em http://localhost:${3000}`);
});