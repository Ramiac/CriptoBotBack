const Cripto = require('../models/Cripto');
const yup = require('yup');
const axios = require('axios');

class  CritpoController {
    async create (req, res) {

        let schema = yup.object().shape({
            name: yup.string().required(),
            symbol: yup.string().required(),
            compareCurrency: yup.string().required(),
        })

        if(!(await schema.isValid(req.body)) ){
            return res.status(400).json({
                error: true,
                message: "dados invalidos"
            })
        }

        let criptoExiste = await Cripto.findOne(
            { 
                name: res.req.body.name, 
                compareCurrency: req.body.compareCurrency 
            });
        if (criptoExiste) {
            return res.status(400).json({
                error: true, 
                message: "Cripto já está na lista"
            })
        }

        const {name, symbol, compareCurrency} = req.body;

        const data = { name, symbol, compareCurrency };

        await Cripto.create( data, (err) => {
            if(err) return  res.status(400).json({
                error: true,
                message: "Error ao tentar inserir cripto no MongoDb",
            })

            return res.status(200).json({
                error: false,
                message: "Cripto cadastrado com sucesso",
            })
        })

    }

    async delete (req, res){
        let schema = yup.object().shape({
            name: yup.string().required()
        })

        if(!(await schema.isValid(req.body)) ){
            return res.status(400).json({
                error: true,
                message: "dados invalidos"
            })
        }

        let criptoExiste = await Cripto.findOne(
            { 
                name: res.req.body.name, 
                compareCurrency: req.body.compareCurrency 
            });
            
        if (!criptoExiste) {
            return res.status(400).json({
                error: true, 
                message: "Cripto não está na lista"
            })
        }

        const {name} = req.body;

        const data = { name };

        Cripto.findOneAndDelete( data , (err) => { 
            if(err) return  res.status(400).json({
                error: true,
                message: "Error ao tentar deletar cripto no MongoDb",
            })

            return res.status(200).json({
                error: false,
                message: "Cripto deletada com sucesso",
            })
        });

    }

    async read (req, res){
        let criptos = await Cripto.find();
        if (criptos.length >0){
            return res.status(200).json({
                error: false,
                message: "lista carregada com sucesso",
                criptos,
            })
        }else {
            return res.status(400).json({
                error: true, 
                message: "Nenhuma cripto na lista"
            })
        }
    }

    async fetch (req, res) {
        let symbol = req.query.symbol;
        let convert = req.query.convert

        try {
            var responseCMC = await axios.get(`https://pro-api.coinmarketcap.com/v2/tools/price-conversion?amount=1&symbol=${symbol}&convert=${convert}`, {
              headers: {
                'X-CMC_PRO_API_KEY': '1b3e397a-5047-4d7e-a9b8-754024b0f8b9',
              }
            });
          } catch(ex) {
            return res.status(400).json({
                error: true, 
                message: "Erro ao conectar o CoincMarketCap endpoint"
            })
          }
          if (responseCMC) {
              var quote;
              switch(convert){
                case "BRL":
                    quote = responseCMC.data.data[0].quote.BRL;
                    break;
                case "USD":
                    quote = responseCMC.data.data[0].quote.USD;
                    break;
                case "EUR":
                    quote = responseCMC.data.data[0].quote.EUR;
                    break;
                case "BTC":
                    quote = responseCMC.data.data[0].quote.BTC;
                    break;
              }

            return res.status(200).json({
                error: false,
                message: "OK",
                quote
            })

          }
    }

}

module.exports = new CritpoController();