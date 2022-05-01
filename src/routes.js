const { Router } = require('express');

const CriptoController = require('./app/controllers/CriptoController');

// const UserController = require('./app/Controllers/UserController');
// const LoginController = require('./app/controllers/LoginController');
// const AuthMiddleware = require('./app/middlewares/AuthMiddleware');

const routes = new Router();

// routes.post("/user", UserController.index);
// routes.get("/getUser", UserController.show);
// routes.post("/userAdd", UserController.store);

// routes.post("/loginUser", LoginController.index);


// ###### CRIPTO endpoints ######
routes.post("/criptos/criptoAdd", CriptoController.create);
routes.post("/criptos/criptoDelete", CriptoController.delete);
routes.get("/criptos/criptoList", CriptoController.read);
routes.get("/criptos/criptoFetch", CriptoController.fetch); // use '?symbol="string"'

module.exports = routes;