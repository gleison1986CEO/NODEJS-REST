//API REST NODEJS SWIFT IOS // SWIFT UI
//API REST NODEJS SWIFT IOS // SWIFT UI
//API REST NODEJS SWIFT IOS // SWIFT UI
//API REST NODEJS SWIFT IOS // SWIFT UI
//API REST NODEJS SWIFT IOS // SWIFT UI
//API REST NODEJS SWIFT IOS // SWIFT UI
//Jesus lhe respondeu: "Se você conhecesse o dom de Deus e quem está pedindo água, você lhe teria pedido e dele receberia água viva". 

let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let mysql = require('mysql');

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


let conn = mysql.createConnection({
    host : 'localhost',
    user: 'root',
    password: '',
    database: 'api-SWIFT-IOS'
})

conn.connect();

app.get('/', (req, res) => {
    return res.json({
        error: false, 
        message: 'Seja bem vindo!'
    });
})

app.get('/Descricao', (req, res) => {
    conn.query("SELECT * FROM teste", (error, results) => {
        if (error) throw error;

        let message = ""
        if (results === undefined || results.length == 0) {
            message = "";
        } else {
            message = "QUERY";
        }

        return res.json({
            error: false,
            message: message,
            data: results
        });
    })
})

app.descricao('/criarDescricao', (req, res) => {
    let titulo = req.body.titulo;
    let descricao = req.body.descricao;

   
    if (!titulo || !descricao) {
        return res
        .status(400)
        .send({
            error: true,
            message: "Adcione um Titulo"
        });
    } else {
        let values = [titulo, descricao];
        conn.query('INSERT INTO teste (titulo, descricao) VALUES(?, ?)', values, (error, results, fields) => {
            if (error) throw error;
            return res.send({
                error: false,
                message: 'Adicionado',
                data: []
            })
        });
    }
})

app.put('/atualizarDescricao', (req, res) => {
    let id = req.body.id;
    let titulo = req.body.titulo;
    let descricao = req.body.descricao;

    if (!titulo || !descricao || !id) {
        return res
        .status(400)
        .send({
            error: true,
            message: "Voce nao escolheu um ID"
        });
    } else {
        let values = [titulo, descricao, id];
        conn.query('UPDATE teste SET titulo = ?, descricao = ? WHERE id = ?', values, (error, results, fields) => {
            if (error) throw error;

            let message = ""
            if (results.changedRows === 0) {
                message = ""
            } else {
                message = "Atualizado"
            }

            return res.send({
                error: false,
                message: message,
                data: []
            })
        });
    }
})

app.delete('/deletardescricao', (req, res) => {
    let id = req.body.id;

   
    if (!id) {
        return res
        .status(400)
        .send({
            error: true,
            message: "Voce nao escolheu um ID"
        });

    } else {
        let values = [id];
        conn.query('DELETE FROM teste WHERE id = ?', values, (error, results, fields) => {
            if (error) throw error;

            let message = "";

            if (results.affectedRows === 0) {
                message = "";
            } else {
                message = "Deletado";
            }

            return res.send({
                error: false,
                message: message,
                data: []
            })
        });
    }
})


app.listen(port, () => {
    console.log("PORTA %d", port);
})

module.exports = app;

//API REST NODEJS SWIFT IOS // SWIFT UI
//API REST NODEJS SWIFT IOS // SWIFT UI
//API REST NODEJS SWIFT IOS // SWIFT UI
//API REST NODEJS SWIFT IOS // SWIFT UI
//API REST NODEJS SWIFT IOS // SWIFT UI
//API REST NODEJS SWIFT IOS // SWIFT UI
//Jesus lhe respondeu: "Se você conhecesse o dom de Deus e quem está pedindo água, você lhe teria pedido e dele receberia água viva". 