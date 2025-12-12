import { Router, Request, Response, NextFunction } from "express";
import { UserSchema } from "../validator/user";
import { User } from "../modals/user";

export const userRouter = Router();

//post record
userRouter.post("/", async (req: Request, res: Response) => {
  try {
    const result = UserSchema.safeParse(req.body);

    console.log(JSON.stringify(result));
    if (!result.success) {
      const messgae = JSON.parse(result.error?.message);
      return res.status(400).json({
        
        errors: messgae.map((err: { path: any[]; message: any; }) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      });
    }

    const { name, email, phone, address } = req.body;

    const user = await User.create({ name, email, phone, address });

    res.status(201).json({ message: "User created successfully", user });
  } catch (error: unknown) {
    res.status(500).json({ error: (error as Error).message });
  }
});

userRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find();
    res.status(200).json({
      message: "Users retrieved successfully",
      count: users.length,
      users,
    });
  } catch (error: unknown) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// get one record
userRouter.get(
  "/getone:userId",
  (req: Request, res: Response, next: NextFunction) => {}
);

// delete user
userRouter.delete(
  "/:userId",
  (req: Request, res: Response, next: NextFunction) => {}
);

// get all users
userRouter.get(
  "/get_all",
  (req: Request, res: Response, next: NextFunction) => {}
);
