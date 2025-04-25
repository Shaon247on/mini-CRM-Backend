import { Client, ClientAttributes } from "../models/client.model";

export const createClientService = async (data: ClientAttributes) => {
  const newClient = await Client.create(data);
  return newClient;
};

export const getClientsByCreatorIdService = async (creatorId: number) => {
  return await Client.findAll({ where: { creatorId } });
};

export const getClientByIdService = async (id: number) => {
  const client = await Client.findByPk(id);
  if (!client) {
    throw new Error("Client not found");
  }
  return client;
};

export const updateClientService = async (
  id: number,
  data: Partial<ClientAttributes>
) => {
  const client = await getClientByIdService(id);
  await client.update(data);
  return client;
};

export const deleteClientService = async (id: number) => {
  const client = await getClientByIdService(id);
  await client.destroy();
};
