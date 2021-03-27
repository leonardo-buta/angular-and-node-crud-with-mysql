module.exports = (sequelize, Sequelize) => {
    const Client = sequelize.define("client", {
        firstName: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        lastName: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        email: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        active: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        }
    });
};