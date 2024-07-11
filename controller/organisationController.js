const Organisation = require('../db/models/organisation'); // Correct import
const { validationResult, body } = require('express-validator');

const createOrganisation = [
    // Validate request body
    body('name').notEmpty().withMessage('Name is required'),
    body('description').optional().isString(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: "Bad Request",
                message: "Client error",
                statusCode: 400,
                errors: errors.array()
            });
        }

        const { name, description } = req.body;
        console.log(name)
        const createdBy = req.user.id;  // Ensure req.user is properly set by the authentication middleware
            console.log("here is the user" + createdBy)
        try {
            const newOrganisation = await Organisation.create({ name, description, createdBy });

            res.status(201).json({
                status: "success",
                message: "Organisation created successfully",
                data: {
                    orgId: newOrganisation.id,
                    name: newOrganisation.name,
                    description: newOrganisation.description
                }
            });
        } catch (error) {
            res.status(500).json({
                status: "error",
                message: "An error occurred",
                error: error.message
            });
        }
    }
];

const getAllOrganisations = async (req, res) => {
    try {
        const organisations = await Organisation.findAll({ where: { createdBy: req.user.id } });
        res.status(200).json({
            status: "success",
            message: "Organisations retrieved successfully",
            data: {
                organisations: organisations.map(org => ({
                    orgId: org.id,
                    name: org.name,
                    description: org.description
                }))
            }
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "An error occurred",
            error: error.message
        });
    }
};

const getOrganisation = async (req, res) => {
    const { orgId } = req.params;
    try {
        const organisation = await Organisation.findOne({ where: { id: orgId, createdBy: req.user.id } });

        if (organisation) {
            res.status(200).json({
                status: "success",
                message: "Organisation retrieved successfully",
                data: {
                    orgId: organisation.id,
                    name: organisation.name,
                    description: organisation.description
                }
            });
        } else {
            res.status(404).json({
                status: "error",
                message: "Organisation not found"
            });
        }
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "An error occurred",
            error: error.message
        });
    }
};


const addUserToOrganisation = async (req, res) => {
    const { orgId } = req.params;
    const { userId } = req.body;

    try {
        const organisation = await Organisation.findOne({ where: { id: orgId, createdBy: req.user.id } });

        if (!organisation) {
            return res.status(404).json({
                status: "error",
                message: "Organisation not found"
            });
        }

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "User not found"
            });
        }

        await organisation.addUser(user);

        res.status(200).json({
            status: "success",
            message: "User added to organisation successfully",
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "An error occurred",
            error: error.message
        });
    }
};

module.exports = { createOrganisation, getAllOrganisations, getOrganisation, addUserToOrganisation };
