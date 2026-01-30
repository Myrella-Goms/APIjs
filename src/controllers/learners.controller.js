import Learners from "../models/Learners";

class LearnersController {
  async getAll(req, res) {
    const learner = await Learners.findAll();
    try {
      const response = {
        nome: learner.nome,
        sobrenome: learner.sobrenome,
        idade: learner.idade,
        peso: learner.peso,
      };
      res.json(response);
      return response;
    } catch (error) {
      return res.status(400).json({
        errors: error.erros.map((err) => err.message),
      });
    }
  }

  async create(req, res) {
    try {
      const learner = await Learners.create(req.body);

      const response = {
        nome: learner.nome,
        sobrenome: learner.sobrenome,
        idade: learner.idade,
        peso: learner.peso,
      };

      res.json(response);
      return response;
    } catch (error) {
      return res.status(400).json({
        errors: error.errors.map((err) => err.message),
      });
    }
  }

  async createBulk(req, res) {

    try {
      const responses = [];

      for (let learnerData of req.body) {
        const learner = await this.create(learnerData);

        responses.push({
          nome: learner.nome,
          sobrenome: learner.sobrenome,
          idade: learner.idade,
          peso: learner.peso,
        });
      }

      res.json(responses);
      return responses;
    } catch (error) {
      return res.status(400).json({
        errors: error.errors?.map((err) => err.message),
      });
    }
  }

  async getById(req, res) {
    // const { id } = req.params;

    if (!req.params.id) {
      return res.status(400).json({
        errors: "Bad Request, missing ID params",
      });
    }

    try {
      const learner = await Learners.findByPk(req.params.id, {
        attributes: ["id", "nome", "sobrenome", "idade"],
      });

      if (!learner) {
        return res.status(400).json({
          errors: "Learner doesn't exist",
        });
      }

      res.json(learner);

      return learner;
    } catch (error) {
      return res.status(400).json({
        errors: error.erros.map((err) => err.message),
      });
    }
  }

  async update(req, res) {
    if (!req.params.id) {
      return res.status(400).json({
        errors: "Bad Request, missing ID params",
      });
    }

    try {
      const learner = await Learners.findByPk(req.params.id);

      if (!learner) {
        return res.status(400).json({
          errors: "Learner doesn't exist",
        });
      }

      const newLearner = await learner.update(req.body);

      const response = {
        nome: newLearner.nome,
        sobrenome: newLearner.sobrenome,
        idade: newLearner.idade,
        peso: newLearner.peso,
      };

      res.json(response);
      return response;
    } catch (error) {
      return res.status(400).json({
        errors: error.erros.map((err) => err.message),
      });
    }
  }

  async deleteLearner(req, res) {
    if (!req.params.id) {
      return res.status(400).json({
        errors: "Bad Request, missing ID params",
      });
    }
    try {
      const learner = await Learners.findByPk(req.params.id);

      if (!learner) {
        return res.status(400).json({
          errors: "Learner doesn't exist",
        });
      }

      await learner.destroy();
      return res.json({
        deleted: true,
      });
    } catch (error) {
      return res.status(400).json({
        errors: error.erros.map((err) => err.message),
      });
    }
  }
}

export default new LearnersController();
