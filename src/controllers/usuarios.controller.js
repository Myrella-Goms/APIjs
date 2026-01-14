import Usuarios from "../models/Usuarios";

class UsuariosController {
  async create(req, res) {
    try {
      const novoUsuario = await Usuarios.create(req.body);
      res.json(novoUsuario);
      return novoUsuario;
    } catch (error) {
      res.status(404).json(error + "Bad Request");
      return error;
    }
  }

  async getAll(req, res) {
    try {
      const users = await Usuarios.findAll();
      res.json(users);
    } catch (error) {
      console.log(`Seu erro foi:  ${error}`);
      return error;
    }
  }

  async getById(req, res) {
    try {
      const userId = await Usuarios.findByPk(req.params.id);
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
      if (!req.params.id) {
        return res.status(400).json({
          erros: ["User Id necessário para atualizar informações do usuário"],
        });
      }
      const userId = await Usuarios.findByPk(req.params.id);

      if (!userId) {
        throw new Error("User Id inválido");
      }

      const updateUser = await userId.update(req.body);
      res.json(updateUser);
      return updateUser;
    } catch (error) {
      return error;
    }
  }

  async deleteUser(req, res) {
    if (!req.params.id) {
      return res.status(400).json({
        erros: ["User Id necessário para deletar usuário"],
      });
    }
    try {
      
      const userId = await Usuarios.findByPk(req.params.id);

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
