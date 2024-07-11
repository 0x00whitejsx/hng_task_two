const Users = require("../db/models/user");
const validateSignupInput = require("./validations/validate");
const bcrypt = require("bcrypt")
const generateToken = require('../utiles/jwt_generator'); 
const catchAsync = require("../utiles/catchAsync");

const signup = catchAsync(async (req, res, next) => {
    const { firstName, lastName, email, password, phone } = req.body;

    // Validate input data
    const errors = await validateSignupInput({ firstName, lastName, email, password, phone });

    if (errors.length > 0) {
        return res.status(422).json({ errors });
    }

    try {
        const hashedPassword = bcrypt.hashSync(password, 10);
        // Create the new user
        const newUser = await Users.create({
            firstName, lastName, email, password: hashedPassword, phone
        });

        const result = newUser.toJSON();
        result.token = generateToken({ id: result.id });

        // Construct successful response payload
        const responseData = {
            status: "success",
            message: "Registration successful",
            data: {
                accessToken: result.token,
                user: {
                    userId: newUser.id,
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    email: newUser.email,
                    phone: newUser.phone,
                }
            }
        };

        return res.status(201).json(responseData);
    } catch (err) {
        console.error("Error creating user:", err);
        return res.status(400).json({
            status: "Bad request",
            message: "Registration unsuccessful",
            error: err.message
        });
    }
});

const login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            status: 'fail',
            message: "Please provide email and password"
        });
    }

    try {
        const user = await Users.findOne({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({
                status: 'fail',
                message: "Authentication failed"
            });
        }

        const token = generateToken({ id: user.id });

        const responseData = {
            status: "success",
            message: "Login successful",
            data: {
                accessToken: token,
                user: {
                    userId: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone,
                }
            }
        };

        return res.status(200).json(responseData);
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({
            status: 'error',
            message: "Internal Server Error"
        });
    }
});

const getUserDetail = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    try {
        const user = await Users.findOne({ where: { id } });

        if (user) {
            return res.status(200).json({
                status: "success",
                message: "User details retrieved successfully",
                data: {
                    userId: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone
                }
            });
        } else {
            return res.status(404).json({
                status: "error",
                message: "User not found"
            });
        }
    } catch (error) {
        console.error("Error retrieving user details:", error);
        return res.status(500).json({
            status: "error",
            message: "Internal Server Error",
            error: error.message
        });
    }
});

module.exports = { signup, login, getUserDetail };
