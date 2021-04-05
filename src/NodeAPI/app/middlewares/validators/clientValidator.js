const { body, param, validationResult } = require("express-validator");

exports.validateCreateClient = [
    body("firstName").exists().withMessage("Body must contain a firstName property")
        .bail()
        .isString().withMessage("firstName must be a string")
        .bail()
        .notEmpty({ ignore_whitespace: true }).withMessage("firstName cannot be empty")
        .bail()
        .isLength({ max: 255 }).withMessage("firstName length must be less or equal than 255"),
    body("lastName").exists().withMessage("Body must contain a lastName property")
        .bail()
        .isString().withMessage("lastName must be a string")
        .bail()
        .notEmpty({ ignore_whitespace: true }).withMessage("lastName cannot be empty")
        .bail()
        .isLength({ max: 255 }).withMessage("lastName length must be less or equal than 255"),
    body("email").exists().withMessage("Body must contain a email property")
        .bail()
        .notEmpty({ ignore_whitespace: true }).withMessage("email cannot be empty")
        .bail()
        .isLength({ max: 255 }).withMessage("email length must be less or equal than 255")
        .bail()
        .isEmail().withMessage("Invalid email"),
    (req, res, next) => {
        let errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        next();
    }
];

exports.validateUpdateClient = [
    param("id").exists().withMessage("Path URL must contain a ID property")
        .bail()
        .isInt({ gt: 0 }).withMessage("Path URL ID must be a number and greater than 0"),
    body("firstName").exists().withMessage("Body must contain a firstName property")
        .bail()
        .isString().withMessage("firstName must be a string")
        .bail()
        .notEmpty({ ignore_whitespace: true }).withMessage("firstName cannot be empty")
        .bail()
        .isLength({ max: 255 }).withMessage("firstName length must be less or equal than 255"),
    body("lastName").exists().withMessage("Body must contain a lastName property")
        .bail()
        .isString().withMessage("lastName must be a string")
        .bail()
        .notEmpty({ ignore_whitespace: true }).withMessage("lastName cannot be empty")
        .bail()
        .isLength({ max: 255 }).withMessage("lastName length must be less or equal than 255"),
    body("email").exists().withMessage("Body must contain a email property")
        .bail()
        .notEmpty({ ignore_whitespace: true }).withMessage("email cannot be empty")
        .bail()
        .isLength({ max: 255 }).withMessage("firstName length must be less or equal than 255")
        .bail()
        .isEmail().withMessage("Invalid email"),
    body("active").exists().withMessage("Body must contain a active property")
        .bail()
        .isBoolean().withMessage("Active property must be true or false"),
    (req, res, next) => {
        let errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        next();
    }
];

exports.validateDeleteClient = [
    param("id").exists().withMessage("Path URL must contain a ID property")
        .bail()
        .isInt({ gt: 0 }).withMessage("Path URL ID must be a number and greater than 0"),
    (req, res, next) => {
        let errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        next();
    }
];

exports.validateFindOneClient = [
    param("id").exists().withMessage("Path URL must contain a ID property")
        .bail()
        .isInt({ gt: 0 }).withMessage("Path URL ID must be a number and greater than 0"),
    (req, res, next) => {
        let errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        next();
    }
];
