var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/arbyte',{ useUnifiedTopology: true , useNewUrlParser: true });
var db = mongoose.connection
db.on('error',console.error.bind(console,"Não foi possivel conectar"))
db.once('open',console.info.bind(console,"Conectado com sucesso"))

module.exports = db