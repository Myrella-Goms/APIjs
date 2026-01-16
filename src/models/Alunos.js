import { DataTypes, Model } from "sequelize";

export default class Alunos extends Model {
  static init(sequelize) {
    return super.init(
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
              args: [3, 255],
              msg: "Nome deve ter entre 3 e 255 caracteres",
            },
          },
        },
        sobrenome: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: "Sobrenome não pode ser vazio",
            },
            len: {
              args: [3, 255],
              msg: "Sobrenome deve ter entre 3 e 255 caracteres",
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
        idade: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
            isInt: {
              msg: "Idade deve ser um número inteiro",
            },
          },
        },
        peso: {
          type: DataTypes.FLOAT,
          allowNull: false,
          validate: {
            isFloat: {
              msg: "Peso deve ser um número",
            },
          },
        },
        altura: {
          type: DataTypes.FLOAT,
          allowNull: false,
          validate: {
            isFloat: {
              msg: "Altura deve ser um número",
            },
          },
        },
      },
      {
        sequelize,
        modelName: "Aluno",
        tableName: "alunos",
      }
    );
  }
}
