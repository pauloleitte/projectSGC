const restful = require('node-restful')
const mongoose = restful.mongoose

const congregacaoSchema = new mongoose.Schema({
	nomeCongregacao: { type: String, required: true},
	ministerio: {type: String, required: true},
	rua: {type: String, required: true},
	bairro: {type: String, required: true},
	cidade: {type: String, required: true},
	estado: {type: String, required: true},
	cep: {type: String, required: true},
	telefone: {type: String, required: true},
	email: {type: String, required: true},
	numero: {type: String, required: false},
	complemento: {type: String, required: false}
})

module.exports = restful.model('Congregacao', congregacaoSchema)
