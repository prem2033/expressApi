import express, { Router, Request, Response, NextFunction } from "express";
import { User } from "../modals/users/create";

const router = express.Router();

//post record
router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, email, phone, address } = req.body;

    if (!name || !email || !phone || !address) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const user = await User.create({ name, email, phone, address });

    res.status(201).json({ message: "User created successfully", user });
  } catch (error: unknown) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// get one record
router.get(
  "/getone:userId",
  (req: Request, res: Response, next: NextFunction) => {}
);

// delete user
router.delete(
  "/:userId",
  (req: Request, res: Response, next: NextFunction) => {}
);

// get all users
router.get("/get_all", (req: Request, res: Response, next: NextFunction) => {});
