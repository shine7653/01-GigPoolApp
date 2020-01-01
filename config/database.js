const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
module.exports = new Sequelize('swyn1f8m8n0cfy8z', 'lxlkww5lzbgnzvj4', 'kr2eie3njdw1u1e0', {
    host: 'qzkp8ry756433yd4.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});