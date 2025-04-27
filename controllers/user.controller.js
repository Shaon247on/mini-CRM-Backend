"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.createUser = void 0;
const user_service_1 = require("../services/user.service");
const jwt_util_1 = require("../utils/jwt.util");
const createUser = async (req, res) => {
    try {
        const newUser = await (0, user_service_1.createUserService)(req.body);
        res.status(201).json({ message: 'User created successfully', user: newUser });
    }
    catch (error) {
        res.status(500).json({ message: 'User creation failed', error: error.message });
    }
};
exports.createUser = createUser;
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Verify user credentials
        const user = await (0, user_service_1.loginUserService)(email, password);
        // Generate JWT Token
        const token = (0, jwt_util_1.generateToken)(user.id, user.email);
        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                photo: user.photo,
                role: user.role,
            },
        });
    }
    catch (error) {
        res.status(401).json({ message: error.message });
    }
};
exports.loginUser = loginUser;
