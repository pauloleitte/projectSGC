const restful = require('node-restful')
const mongoose = restful.mongoose

const membroFinanceiro = new mongoose.Schema({

	vl_dizimo: {type: Number, min: 0 , required: true},
	mes_dizimo: {type: Number, min: 1, max: 12 , required: true},
	ano_dizimo: {type: Number, min: 1900, max: 2100, required: true}
})

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
	'Secretário','Vice Secretário']},
	dizimos: [membroFinanceiro]
})

module.exports = restful.model('Membro', membroSchema)
