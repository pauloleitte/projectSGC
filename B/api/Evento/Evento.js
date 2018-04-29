const restful = require('node-restful')
const mongoose = restful.mongoose

const eventoParticipante = new mongoose.Schema({
    nome: { type: String, required: false },
    idade: { type: Number, required: false },
    sexo: { type: String, required: false }
})

const eventoShema = new mongoose.Schema({
    nome: { type: String, required: true },
    local: { type: String, required: true },
    tipo: { type: String, required: true },
    hora_fim: { type: Number, required: true },
    dia_fim: { type: Number, required: true },
    mes_fim: { type: Number, required: true },
    ano_fim: { type: Number, required: true },
    hora_inicio: { type: Number, required: true },
    dia_inicio: { type: Number, required: true },
    mes_inicio: { type: Number, required: true },
    ano_inicio: { type: Number, required: true },
    atualizacao: { type: Date, default: Date.now },
    participantes: [eventoParticipante]
})

module.exports = restful.model('Evento', eventoShema)
