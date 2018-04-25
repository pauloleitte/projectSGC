const restful = require('node-restful')
const mongoose = restful.mongoose

const eventoPartipante = new mongoose.Schema({
    nome: { type: String, required: true },
    idade: { type: String, required: true },
    sexo: { type: String, required: true }
})

const eventoShema = new mongoose.Schema({
    nome: { type: String, required: true },
    local: { type: String, required: true },
    tipo: { type: String, required: true },
    inicio: { type: Date, required: true },
    fim: { type: Date, required: true },
    atualizacao: { type: Date, default: Date.now },
    partipantes: [eventoPartipante]
})

module.exports = restful.model('Evento', eventoShema)
