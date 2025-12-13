import { Router, Request, Response, NextFunction } from "express";
import { UserSchema } from "../validator/user";
import { User } from "../modals/user";

export const userRouter = Router();

//post record to MongoDb
userRouter.post("/", async (req: Request, res: Response) => {
  try {
    console.log("post records to db");
    const result = UserSchema.safeParse(req.body);
    console.log(JSON.stringify(result));

    if (!result.success) {
      const messgae = JSON.parse(result.error?.message);
      return res.status(400).json({
        errors: messgae.map((err: { path: any[]; message: any }) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      });
    }

    const { name, email, phone, address , userName} = req.body;

    const user = await User.create({ name, email, phone, address, userName });

    res.status(201).json({ message: "User created successfully", user });
  } catch (error : any) {
    console.log('Error while inserting', JSON.stringify(error));
    if(error.errorResponse.keyPattern.email){
      return res.status(400).json({ error: 'Already register'});
    }
    if(error.errorResponse.keyPattern.userName){
      return res.status(400).json({ error: 'Duplicate UserName'});
    }
    res.status(500).json({ error: (error as Error).message });
  }
});

//get all records from MongoDb
userRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(`get all reocrds`);
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
  "/:userName",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userName } = req.params;
      console.log(`get by userId ${userName}`);
      if (!userName) {
        return res.status(404).json({ status: "Not valid parameter" });
      }
      const users = await User.find({ userName });
      return res.status(200).json({
        message: "Users retrieved successfully",
        count: users.length,
        users,
      });
    } catch (error: unknown) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
);

// delete one user
userRouter.delete(
  "/:userName",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userName } = req.params;
      console.log(`delete by userId ${userName}`);
      if (!userName) {
        return res.status(404).json({ status: "Not valid parameter" });
      }
      const result = await User.deleteOne({ userName });
      res.status(200).json({
        message: "Users deleted successfully",
        deletedCount: result.deletedCount,
      });
    } catch (error: unknown) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
);

// delete one user // never implemets these endpoint
userRouter.delete(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("Delete all executed");
      const result = await User.deleteMany({});
      res.status(200).json({
        message: "Users deleted successfully",
        deletedCount: result.deletedCount,
      });
    } catch (error: unknown) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
);
