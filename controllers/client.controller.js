"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.getById = exports.getByUser = exports.create = void 0;
const client_schema_1 = require("../schemas/client.schema");
// to get the client all services
const clientService = __importStar(require("../services/client.service"));
const client_model_1 = require("../models/client.model");
const create = async (req, res) => {
    try {
        const validated = client_schema_1.clientSchema.parse(req.body);
        const client = await clientService.createClient(validated);
        res.status(201).json(client);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.create = create;
const getByUser = async (req, res) => {
    try {
        const creatorId = req.query.creatorId; // Get creatorId from the query string
        const clients = await clientService.getClientsByCreator(Number(creatorId));
        res.json(clients);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getByUser = getByUser;
const getById = async (req, res) => {
    try {
        const { id } = req.params; // Get the client ID from the URL parameters
        const creatorId = req.query.creatorId; // Get creatorId from the query string
        // Fetch the client by ID and ensure the creatorId matches the client's creatorId
        const client = await clientService.getClientById(Number(id), Number(creatorId));
        if (!client) {
            res.status(404).json({ error: "Client not found" });
            return;
        }
        res.json(client);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getById = getById;
const update = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { name, email, phone, company, notes, creatorId } = req.body;
        const validated = client_schema_1.clientSchema.parse({ ...req.body, creatorId });
        const updatedClient = await client_model_1.Client.update({
            name,
            email,
            phone,
            company,
            notes,
            creatorId, // Take it from body instead of req.user.id
        }, {
            where: { creatorId: creatorId },
        });
        res.status(200).json({ message: "Client updated" });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.update = update;
const remove = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const creatorId = req.body.creatorId;
        await clientService.deleteClient(id, creatorId);
        res.status(200).json({ message: "Client deleted" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.remove = remove;
