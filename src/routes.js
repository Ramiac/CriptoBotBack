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

routes.post("/criptoAdd", CriptoController.store);
routes.post("/criptoDelete", CriptoController.delete);
routes.get("/criptoFetch", CriptoController.fetch); // use '?symbol="string"'

module.exports = routes;