import { Router } from "express";
import * as clientController from "../controllers/client.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.post("/clients", authenticate, clientController.create);
router.get("/clients", authenticate, clientController.getByUser);
router.put("/clients/:id", authenticate, clientController.update);
router.delete("/clients/:id", authenticate, clientController.remove);

export default router;

// Expected Payloads
// POST /clients
// {
//   name: "John Doe",
//   email: "john@example.com",
//   phone: "017xxxxxxxx",
//   company: "Acme Inc.",
//   notes: "Important client"
// }

// PUT /clients/:id (e.g. /clients/3)
// Same as POST with updated values.

// DELETE /clients/:id
// No body required.

// GET /clients
// No body required; JWT user ID used internally.