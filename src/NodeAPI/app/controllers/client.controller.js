const db = require("../models");
const Client = db.clients;
const Op = db.Sequelize.Op;
const { body, param, validationResult } = require("express-validator");

exports.validate = (method) => {
    switch (method) {
        case "createClient": {
            return [
                body("firstName").exists().withMessage("Body must contain a firstName property")
                    .isString().withMessage("firstName must be a string")
                    .notEmpty({ ignore_whitespace: true }).withMessage("firstName cannot be empty")
                    .isLength({ max: 255 }).withMessage("firstName length must be less or equal than 255"),
                body("lastName").exists().withMessage("Body must contain a lastName property")
                    .isString().withMessage("lastName must be a string")
                    .notEmpty({ ignore_whitespace: true }).withMessage("lastName cannot be empty")
                    .isLength({ max: 255 }).withMessage("lastName length must be less or equal than 255"),
                body("email").exists().withMessage("Body must contain a email property")
                    .notEmpty({ ignore_whitespace: true }).withMessage("email cannot be empty")
                    .isLength({ max: 255 }).withMessage("firstName length must be less or equal than 255")
                    .bail()
                    .isEmail().withMessage("Invalid email")
            ]
        }
        case "clientUpdate": {
            return [
                param("id").exists().withMessage("Path URL must contain a ID property")
                    .isInt({ gt: 0 }).withMessage("Path URL ID must be a number and greater than 0"),
                body("firstName").exists().withMessage("Body must contain a firstName property")
                    .isString().withMessage("firstName must be a string")
                    .notEmpty({ ignore_whitespace: true }).withMessage("firstName cannot be empty")
                    .isLength({ max: 255 }).withMessage("firstName length must be less or equal than 255"),
                body("lastName").exists().withMessage("Body must contain a lastName property")
                    .isString().withMessage("lastName must be a string")
                    .notEmpty({ ignore_whitespace: true }).withMessage("lastName cannot be empty")
                    .isLength({ max: 255 }).withMessage("lastName length must be less or equal than 255"),
                body("email").exists().withMessage("Body must contain a email property")
                    .notEmpty({ ignore_whitespace: true }).withMessage("email cannot be empty")
                    .isLength({ max: 255 }).withMessage("firstName length must be less or equal than 255")
                    .bail()
                    .isEmail().withMessage("Invalid email"),
                body("active").exists().withMessage("Body must contain a active property")
                    .isBoolean().withMessage("Active property must be true or false")
            ]
        }
        case "deleteClient": {
            return [
                param("id").exists().withMessage("Path URL must contain a ID property")
                    .isInt({ gt: 0 }).withMessage("Path URL ID must be a number and greater than 0")
            ]
        }
        case "findOneClient": {
            return [
                param("id").exists().withMessage("Path URL must contain a ID property")
                    .isInt({ gt: 0 }).withMessage("Path URL ID must be a number and greater than 0")
            ]
        }
    }
}

exports.create = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
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
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

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

exports.update = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let id = req.params.id;

        let updated = await Client.update(req.body, {
            where: { id: id }
        });

        if (updated == 1) {
            let client = await Client.findByPk(id);
            res.send({ message: "Client updated", record: client });
        } else {
            res.status(400).send({ message: "Error. Client not updated. Check if id is valid" });
        }
    }
    catch (e) {
        return res.status(400).json({ message: e.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let id = req.params.id;

        let deleted = await Client.destroy({
            where: { id: id }
        });

        if (deleted == 1) {
            res.send({ message: "Client deleted" });
        } else {
            res.status(400).send({ message: "Error. Client not deleted. Check if id is valid" });
        }
    }
    catch (e) {
        return res.status(400).json({ message: e.message });
    }
};
