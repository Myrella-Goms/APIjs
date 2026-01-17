import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import Learner from "../models/Learners";
import Usuarios from "../models/Usuarios";

dotenv.config();

const models = [Learner, Usuarios];

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
  logging: console.log,
});

models.forEach((model) => model.init(sequelize));
export default sequelize;
