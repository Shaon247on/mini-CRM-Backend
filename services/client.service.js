"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteClient = exports.updateClient = exports.getClientById = exports.getClientsByCreator = exports.createClient = void 0;
const client_model_1 = require("../models/client.model");
const createClient = async (data) => {
    return await client_model_1.Client.create(data);
};
exports.createClient = createClient;
const getClientsByCreator = async (creatorId) => {
    return await client_model_1.Client.findAll({ where: { creatorId } });
};
exports.getClientsByCreator = getClientsByCreator;
const getClientById = async (id, creatorId) => {
    return await client_model_1.Client.findOne({ where: { id, creatorId } });
};
exports.getClientById = getClientById;
const updateClient = async (id, data, creatorId) => {
    return await client_model_1.Client.update(data, { where: { id, creatorId } });
};
exports.updateClient = updateClient;
const deleteClient = async (id, creatorId) => {
    return await client_model_1.Client.destroy({ where: { id, creatorId } });
};
exports.deleteClient = deleteClient;
