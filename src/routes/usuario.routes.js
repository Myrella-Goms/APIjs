import { Router } from "express";
import user from  '../controllers/usuarios.controller';
import usuariosController from "../controllers/usuarios.controller";
import loginRequired from "../middlewares/login.required";

const usuarioRoutes = new Router();

usuarioRoutes.get('/findAll', loginRequired, usuariosController.getAll) //falha de segurança, pois não deveriamos listar todos os usuários
usuarioRoutes.get('/findById/:id', usuariosController.getById)

usuarioRoutes.post('/', user.create);
usuarioRoutes.put('/update/', loginRequired, usuariosController.update) //o usuario não deve informar o id que quer atualizar ou apagar uma conta, nós devemos pegar o id que está no token quando o usuario estiver logado
usuarioRoutes.delete('/delete/', loginRequired, usuariosController.deleteUser)

export default usuarioRoutes;

//precisamos de uma rota para criar, atualizar e apagar usuarios