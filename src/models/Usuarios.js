import { DataTypes, Model } from "sequelize";
import bcrypt from "bcrypt";

export default class Usuarios extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        nome: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: "Nome não pode ser vazio",
            },
            len: {
              args: [3, 100],
              msg: "Nome deve ter entre 3 e 100 caracteres",
            },
          },
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: {
            msg: "Email já existe",
          },
          validate: {
            isEmail: {
              msg: "Email inválido",
            },
          },
        },
        senha_hash: {
          type: DataTypes.STRING,
        },
        senha: {
          type: DataTypes.VIRTUAL,
          validate: {
            len: {
              args: [8, 15],
              msg: "A senha deve ter de 8 à 15 caractéres",
            },
          },
        },
        createdAt: {
          type: DataTypes.DATE,
        },
        updatedAt: {
          type: DataTypes.DATE,
        },
      },
      {
        sequelize,
        modelName: "Usuarios",
        tableName: "Usuarios",
      }
    );
    this.addHook("beforeSave", async (usuario) => {
      if (usuario.senha) {
        usuario.senha_hash = await bcrypt.hash(usuario.senha, 8);
      }
    });
    return this;
  }
  
    passwordCompare(password){
      return bcrypt.compare(password, this.senha_hash);
    }
}
