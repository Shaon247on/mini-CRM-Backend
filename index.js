"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const postgres_1 = require("./postgres/postgres");
const user_route_1 = __importDefault(require("./routes/user.route"));
const client_route_1 = __importDefault(require("./routes/client.route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: ['http://localhost:5173', 'https://mini-crm-backend-production.up.railway.app/'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use(express_1.default.json());
app.use('/api/users', user_route_1.default);
app.use('/api/', client_route_1.default);
const PORT = process.env.PGPORT || 8000;
app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
});
(0, postgres_1.connection)();
