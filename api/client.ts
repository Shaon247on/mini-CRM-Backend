import { Router } from "express";
import * as clientController from "../controllers/client.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.post("/clients", (req, res, next) => authenticate(req, res, next), clientController.create);
router.get("/clients", (req, res, next) => authenticate(req, res, next), clientController.getByUser);
router.get("/clients/:id", (req, res, next) => authenticate(req, res, next), clientController.getById);
router.put("/clients/:id", (req, res, next) => authenticate(req, res, next), clientController.update);
router.delete("/clients/:id", (req, res, next) => authenticate(req, res, next), clientController.remove);

export default router;
