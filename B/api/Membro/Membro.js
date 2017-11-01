const restful = require('node-restful')
const mongoose = restful.mongoose

const membroSchema = new mongoose.Schema({
	nomeMembro: {type: String, required: true},
	rua: {type: String, required: true},
	complemento: {type: String, required: false},
	numero: {type: String, required: false},
	bairro: {type: String, required: true},
	cidade: {type: String, required: true},
	estado: {type: String, required: true},
	cep: {type: String, required: true},
	telefone: {type: String, required: false},
	email: {type: String, required: false},
	dataNascimento: {type: String},
	sexo: {type: String, required: true, enum: ['Masculino','Feminino']},
	estado_civil: {type: String, required: true, enum: ['Solteiro','Casado','Divorciado','Viuvo']},
	cargo: {type: String, required: false, enum: ['Líder', 'Vice Líder', 'Regente','Vice Regente', 'Pastor','Co Pastor', 'Tesoureiro','Vice Tesoureiro',
	'Secretário','Vice Secretário']}
})
module.exports = restful.model('Membro', membroSchema)
