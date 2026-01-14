import Alunos from "../models/Alunos";

class AlunosController{
    async index(req, res){
        const novoAluno = await Alunos.create({
            nome: 'Myrella',
            sobrenome: 'Gomes',
            idade: 23,
            peso: 66.5,
            altura: 1.61
        })
        res.json(novoAluno)
    }
}

export default new AlunosController();