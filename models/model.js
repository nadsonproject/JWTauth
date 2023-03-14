const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER_NAME, process.env.DB_USER_PASSWORD, {
    dialect: "postgres"
});

let check = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

const RoleJWT = sequelize.define('RoleJWT', {
    Id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    Name: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true
});

const UserJWT = sequelize.define('UserJWT', {
    Id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    Name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    RoleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'RoleJWT', key: 'Id' }
    }
}, {
    freezeTableName: true
});


// sequelize.sync()
//     .then(result => { console.log(result) })
//     .catch(err => console.log(err));

module.exports = {
    check, UserJWT, RoleJWT
}