const mongoose = require('mongoose')
//module.exports = mongoose.connect('mongodb://localhost/db_sgc')
module.exports = mongoose.connect('mongodb://paulo:12345@ds125469.mlab.com:25469/heroku_pdq2l8td')


mongoose.Error.messages.general.required = "O Atributo '{PATH}' é obrigatório!"
mongoose.Error.messages.Number.min = "O '{VALUE}' informado é menor que o limite mínimo de '{MIN}'."
mongoose.Error.messages.Number.max = "O '{VALUE}' informado é maior que o limite maximo de '{MAX}'."
mongoose.Error.messages.String.enum = "'{VALUE}' não é valido para o atributo '{PATH}'."
