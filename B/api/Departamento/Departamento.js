const restful = require('node-restful')
const mongoose = restful.mongoose

const departamentoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    atualizacao: { type: Date, default: Date.now }
})

module.exports = restful.model('Deparamento', departamentoSchema)