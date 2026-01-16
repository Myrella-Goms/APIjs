"use strict";
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Usuarios",
      [
        {
          nome: "Luiz",
          email: "Luiz@yopmail.com",
          senha_hash: await bcrypt.hash("luizz44255", 8),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: "Maria",
          email: "maria@yopmail.com",
          senha_hash: await bcrypt.hash("marizinhaa123f4", 8),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: "Patricia",
          email: "patyy@yopmail.com",
          senha_hash: await bcrypt.hash("patybeijus23", 8),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },
};
