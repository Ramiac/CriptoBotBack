const mongoose = require('mongoose');

class Connection {
    constructor(){
        this.dataBaseConnectionMongoDb();
    }

    dataBaseConnectionMongoDb(){
        this.mongoDbConnection = mongoose.connect("mongodb://localhost/criptos", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useFindAndModify: false,
            // useCreateIndex: true,
        
        })
            .then(() => {
            console.log("Conexão estabelecida com o mongoDB");
            })
            .catch ((error) => {
            console.log(`Erro ao estabelecer conexão con MongoDB: ${error}`)
            })  
    }

}

module.exports = new Connection();