import express from "express";
import home from "./src/routes/home.routes";
import sequelize from "./src/database/dbconnection";
import "./src/models/Learners"; // Importa o modelo
import "./src/models/Usuarios"; // Importa o modelo
import usuarioRoutes from "./src/routes/usuario.routes";
import authRoutes from "./src/routes/auth.routes";
import learnerRoutes from "./src/routes/learner.routes";

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
    this.database();
  }

  async database() {
    try {
      await sequelize.authenticate();
      console.log("✅ Conexão com banco de dados estabelecida!");
    } catch (error) {
      console.error("❌ Erro ao conectar ao banco:", error);
    }
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use("/", home);
    this.app.use("/users/", usuarioRoutes);
    this.app.use("/auth", authRoutes);
    this.app.use("/learners", learnerRoutes);
  }
}

export default new App().app; //exportando o express
