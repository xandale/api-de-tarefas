//um Model de Usuario (id, nome, senha e email
import {database} from "../database.js"
import { DataTypes } from "sequelize"

const Usuario = database.define('Usuario', {
    id: {
        primaryKey: true,
        type:DataTypes.INTEGER,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        // não nulo
        allowNull:false
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        // checando se é algo como um email
        validate: {
            isEmail: true,
          },
    }
},{
    freezeTableName: true, // Isso desabilita a pluralização
    timestamps: false
})

export {Usuario}