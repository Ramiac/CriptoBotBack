const mongoose = require('mongoose')

const Cripto = mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
        symbol: {
            type: String,
            require: true,
        },
        compareCurrency: {
            type: String,
            require: true,
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('cripto', Cripto)