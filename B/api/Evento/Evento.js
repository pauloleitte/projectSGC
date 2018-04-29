const restful = require('node-restful')
const mongoose = restful.mongoose

const eventoParticipante = new mongoose.Schema({
    nome: { type: String, required: false },
    idade: { type: Number, min: 1, max: 120, required: false },
    sexo: { type: String, required: false }
})

const eventoShema = new mongoose.Schema({
    nome: { type: String, required: true },
    local: { type: String, required: true },
    tipo: { type: String, required: true },
    hora_fim: { type: Number, required: true },
    dia_fim: { type: Number, min: 1, max: 31, required: true },
    mes_fim: { type: Number, min: 1, max: 12, required: true },
    ano_fim: { type: Number, min: 2018, max: 2100, required: true },
    hora_inicio: { type: Number, required: true },
    dia_inicio: { type: Number, min: 1, max: 31, required: true },
    mes_inicio: { type: Number, min: 1, max: 12, required: true },
    ano_inicio: { type: Number, min: 2018, max: 2100, required: true },
    atualizacao: { type: Date, default: Date.now },
    participantes: [eventoParticipante]
})

module.exports = restful.model('Evento', eventoShema)
