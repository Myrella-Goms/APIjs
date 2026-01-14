import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import Aluno from '../models/Aluno';
import Usuarios from '../models/Usuarios';

dotenv.config();

const models = [Aluno, Usuarios];

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: console.log,
});

models.forEach((model) => model.init(sequelize));
export default sequelize;