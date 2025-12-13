import cors from "cors";

export const corsOptions: cors.CorsOptions = {
  origin: ["http://localhost:4000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
