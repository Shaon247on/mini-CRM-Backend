"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const validate_middleware_1 = require("../middlewares/validate.middleware");
const user_schema_1 = require("../schemas/user.schema");
const router = express_1.default.Router();
// User registration route
router.post('/register', (0, validate_middleware_1.validate)(user_schema_1.createUserSchema), user_controller_1.createUser);
// User login route
router.post('/login', (0, validate_middleware_1.validate)(user_schema_1.loginUserSchema), user_controller_1.loginUser);
exports.default = router;
