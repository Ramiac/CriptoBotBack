const User = require("../models/User");
const bcrypt = require('bcryptjs'); // decriptar password por exemplo
const jwt = require("jsonwebtoken");
const config = require("../../config/auth")


class LoginController {
    async index(req, res){
        const { email, password } = req.body; 
        const userExiste = await User.findOne({ email });  // do mongoose
        // part 1 exist?
        if(!userExiste) {
            return res.status(400).json({
                erro: true,
                message: "Usuário não existe"
            });  // .status do express
        }

        // part 2 senha?
        if(!(await bcrypt.compare(password, userExiste.password))) {
            return res.status(400).json({
                erro: true,
                message: "Senha está inválida"
            }); 
        }

        // part 3 ok
        // TOOL PARA CRIAR O TOKEN https://emn178.github.io/online-tools/sha256.html
        // está tudo certo? Retorna a senha por email
        return res.status(200).json({
            user: {
                name: userExiste.name,
                email: userExiste.email, 
            },
            token: jwt.sign({id: userExiste._id }, config.secret, { expires: config.expireIN })
        }); 
    }
}

module.exports = new LoginController();