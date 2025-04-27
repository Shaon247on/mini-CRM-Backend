
import { ClientCreationAttributes, Client } from "../models/client.model";

export const createClient = async (data: ClientCreationAttributes) => {
  return await Client.create(data);
};

export const getClientsByCreator = async (creatorId: number | undefined) => {
  return await Client.findAll({ where: { creatorId } });
};

export const getClientById = async(id: number | undefined, creatorId: number | undefined)=>{
  return await Client.findOne({where:{id, creatorId}})
}

export const updateClient = async (id: number, data: Partial<ClientCreationAttributes>, creatorId: number | undefined) => {
  return await Client.update(data, { where: { id, creatorId } });
};

export const deleteClient = async (id: number, creatorId: number | undefined) => {
  return await Client.destroy({ where: { id, creatorId } });
};
