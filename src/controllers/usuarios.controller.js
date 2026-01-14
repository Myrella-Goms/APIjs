import Usuarios from "../models/Usuarios";

class UsuariosController {
  async create(req, res) {
    try {
      const novoUsuario = await Usuarios.create(req.body);

      const response = {
        id: novoUsuario.id,
        nome: novoUsuario.nome,
        email: novoUsuario.email
      };

      res.json(response);
      return novoUsuario;
    } catch (error) {
      res.status(404).json(error + "Bad Request");
      return error;
    }
  }

  async getAll(req, res) {
    try {
      const users = await Usuarios.findAll({attributes: ['id', 'nome', 'email']}); //exibe apenas os atributos que eu quero
      res.json(users);
    } catch (error) {
      console.log(`Seu erro foi:  ${error}`);
      return error;
    }
  }

  async getById(req, res) {
    try {
      const userId = await Usuarios.findByPk(req.params.id, {attributes: ['id', 'nome', 'email']});
      if (!userId) {
        console.log(`User id não existe`);
        
        throw new Error(`Usuario com id: ${userId} inválido`);
      }
      res.json(userId);
      return userId;
    } catch (error) {
      return error;
    }
  }

  async update(req, res) {
    try {
      const userId = await Usuarios.findByPk(req.userId);

      if (!userId) {
        throw new Error("User Id inválido");
      }

      const updateUser = await userId.update(req.body);

      const response = {
        id: updateUser.id,
        nome: updateUser.nome,
        email: updateUser.email
      };
      res.json(response);
      return updateUser;
    } catch (error) {
      return error;
    }
  }

  async deleteUser(req, res) {
    try {
      
      const userId = await Usuarios.findByPk(req.userId);

      if (!userId) {
        throw new Error("User Id inválido");
      }
      
      const deleteUser = await userId.destroy()
      res.json(userId);
      return deleteUser
    } catch (error) {
      console.log(error);
      return error
    }
  }
}

export default new UsuariosController();
