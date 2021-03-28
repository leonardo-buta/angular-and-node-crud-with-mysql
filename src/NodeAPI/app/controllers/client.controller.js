const db = require("../models");
const Client = db.clients;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
    try {
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

        let [client, created] = await Client.findOrCreate({
            where: { email: req.body.email }, defaults: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                active: true
            }
        });

        if (created) {
            res.send({ message: "Client created", record: client });
        } else {
            res.status(400).send({ message: "Email already in use" });
        }
    } catch (e) {
        return res.status(400).json({ message: e.message });
    }
}

exports.findAll = async (req, res) => {
    try {
        let firstName = req.query.firstName;
        let lastName = req.query.lastName;
        let email = req.query.email;

        let condition = {
            ...(firstName && { firstName: { [Op.like]: `%${firstName}%` } }),
            ...(lastName && { lastName: { [Op.like]: `%${lastName}%` } }),
            ...(email && { email: { [Op.like]: `%${email}%` } })
        };

        let clients = await Client.findAll({ where: condition });

        res.send({ count: clients.length, result: clients });
    } catch (e) {
        return res.status(400).json({ message: e.message });
    }
};

exports.findOne = async (req, res) => {
    try {
        let id = req.params.id;
        let client = await Client.findByPk(id);

        if (client) {
            res.send(client);
        } else {
            res.sendStatus(404);
        }
    } catch (e) {
        return res.status(400).json({ message: e.message });
    }
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
