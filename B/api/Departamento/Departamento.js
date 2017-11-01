const restful = require('node-restful')
const mongoose = restful.mongoose

const departamentoSchema = new mongoose.Schema({
    nomeDepartamento: { type: String, required: true}
})

module.exports = restful.model('Deparamento', departamentoSchema)