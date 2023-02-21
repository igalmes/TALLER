// MODEL 
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db2');

class Categoria extends Model {} 
Categoria.init({
        nombre: DataTypes.STRING
}, { sequelize, modelName: 'categoria' });

module.exports = Categoria;


// extendemos propiedades a la clase categoria desde Model en sequelize
// pasamos los datos y las propiedades.
// le pasamos sequeelize