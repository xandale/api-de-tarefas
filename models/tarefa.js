  //Model de Tarefa (id, descricao, id_usuario, completed: true/false)

import {database} from "../database.js"
import { DataTypes } from "sequelize"

const Tarefa = database.define('Tarefa', {
    id: {
        primaryKey: true,
        type:DataTypes.INTEGER,
        autoIncrement: true
    },
    titulo: {
        type: DataTypes.STRING,
        // não nulo
        allowNull:false
    },
    descricao: {
        type: DataTypes.TEXT,
    },
    status: {
        type: DataTypes.STRING,
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Usuario', 
          key: 'id',
        },
    }
},{
    freezeTableName: true, // Isso desabilita a pluralização
    timestamps: false
})

export {Tarefa}