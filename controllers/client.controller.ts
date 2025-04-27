import { Request, Response } from "express";
import { clientSchema } from "../schemas/client.schema";

// to get the client all services
import * as clientService from "../services/client.service";
import { Client } from "../models/client.model";

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
    const creatorId = req.query.creatorId as string; // Get creatorId from the query string
    const clients = await clientService.getClientsByCreator(Number(creatorId));
    res.json(clients);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Get the client ID from the URL parameters
    const creatorId = req.query.creatorId as string; // Get creatorId from the query string

    // Fetch the client by ID and ensure the creatorId matches the client's creatorId
    const client = await clientService.getClientById(Number(id), Number(creatorId));

    if (!client) {
      res.status(404).json({ error: "Client not found" });
      return
    }

    res.json(client);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { name, email, phone, company, notes, creatorId } = req.body;

    const validated = clientSchema.parse({ ...req.body, creatorId });
    
    const updatedClient = await Client.update(
      {
        name,
        email,
        phone,
        company,
        notes,
        creatorId, // Take it from body instead of req.user.id
      },
      {
        where: { creatorId: creatorId },
      }
    );
    
    res.status(200).json({ message: "Client updated" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const creatorId = (req as any).body.creatorId;
    await clientService.deleteClient(id, creatorId);
    res.status(200).json({ message: "Client deleted" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};