"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserService = exports.createUserService = void 0;
const user_model_1 = require("../models/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const createUserService = async (userData) => {
    const hashedPassword = await bcrypt_1.default.hash(userData.password, 10);
    const newUser = await user_model_1.User.create({ ...userData, password: hashedPassword });
    return newUser;
};
exports.createUserService = createUserService;
const loginUserService = async (email, password) => {
    // Find user by email
    const user = await user_model_1.User.findOne({ where: { email } });
    if (!user) {
        throw new Error('User not found');
    }
    // Compare passwords
    const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid credentials');
    }
    return user;
};
exports.loginUserService = loginUserService;
