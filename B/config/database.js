const mongoose = require('mongoose')
mongoose.Promise = global.Promise
//const url = 'mongodb://localhost/db_sgc'
const url_heroku = 'mongodb://paulo:12345@ds125469.mlab.com:25469/heroku_pdq2l8td'
const url_azure ='mongodb://sgc-backend:WxeK6tbaFgTGLAb5HpPmjkm5vKXCZW8yQT5Xxm0w0QOa4H0QqzxtlgCQ3EDOmQ8PkYwBkCIwejCSCZReEVoQWQ==@sgc-backend.documents.azure.com:10255/?ssl=true'
module.exports = mongoose.connect(url_azure, {useMongoClient: true})


mongoose.Error.messages.general.required = "O Atributo '{PATH}' é obrigatório!"
mongoose.Error.messages.Number.min = "O '{VALUE}' informado é menor que o limite mínimo de '{MIN}'."
mongoose.Error.messages.Number.max = "O '{VALUE}' informado é maior que o limite maximo de '{MAX}'."
mongoose.Error.messages.String.enum = "'{VALUE}' não é valido para o atributo '{PATH}'."
