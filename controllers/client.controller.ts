import { Request, Response } from "express";
import { clientSchema } from "../schemas/client.schema";

// to get the client all services
import * as clientService from "../services/client.service";

export const create = async (req: Request, res: Response) => {
  try {
    const validated = clientSchema.parse(req.body);
    const client = await clientService.createClient(validated);
    res.status(201).json(client);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getByUser = async (req: Request, res: Response) => {
  try {
    const creatorId = (req as any).user.id;
    const clients = await clientService.getClientsByCreator(creatorId);
    res.json(clients);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const creatorId = (req as any).user.id;
    const validated = clientSchema.parse({ ...req.body, creatorId });
    await clientService.updateClient(id, validated, creatorId);
    res.status(200).json({ message: "Client updated" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const creatorId = (req as any).user.id;
    await clientService.deleteClient(id, creatorId);
    res.status(200).json({ message: "Client deleted" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};