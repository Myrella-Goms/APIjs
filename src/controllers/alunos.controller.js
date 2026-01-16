import Alunos from "../models/Alunos";

class AlunosController {
  async getAll(req, res) {
    const aluno = await Alunos.findAll();
    
  }
}

export default new AlunosController();
