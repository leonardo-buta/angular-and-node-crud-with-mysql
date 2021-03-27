const db = require("../models");
const Client = db.clients;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    let errors = [];
    if (!req.body.firstName) {
        errors.push("First Name cannot be empty");
    }

    if (!req.body.lastName) {
        errors.push("Last Name cannot be empty");
    }

    if (!req.body.email) {
        errors.push("Email cannot be empty");
    }

    if (errors.length > 0) {
        res.status(400).send({
            message: "Validation errors has occurred",
            errors: errors
        });
        return;
    }

    let client = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    };

    Client.create(client)
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            res.status(500).send({
                message:
                    error.message || "Error creating the object"
            });
        });
};

exports.findAll = (req, res) => {
    let name = req.query.name;
    let condition = name ? { firstName: { [Op.like]: `%${name}` } } : null;

    Client.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            res.status(500).send({
                message:
                    error.message || "Error retrieving object"
            });
        });

};

exports.findOne = (req, res) => {
    let id = req.params.id;

    Client.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            res.status(500).send({
                message:
                    error.message || `Error retrieving the object with ${id}`
            });
        });
};

exports.update = (req, res) => {
    let id = req.params.id;

    Client.update(req.body, {
        where: { id: id }
    })
        .then(data => {
            if (data == 1) {
                res.send({ message: "Client updated" });
            } else {
                res.send({ message: "Error. Client not updated" });
            }

        })
        .catch(error => {
            res.status(500).send({
                message: "Error updating the client"
            });
        });

};

exports.delete = (req, res) => {
    let id = req.params.id;

    Client.destroy({
        where: { id: id }
    })
        .then(data => {
            if (data == 1) {
                res.send({ message: "Client deleted" });
            } else {
                res.send({ message: "Error. Client not deleted" });
            }
        })
        .catch(error => {
            res.status(500).send({
                message: "Error deleting Client"
            });
        });

};