import express from "express";
import compression from "compression";
import cors from "cors";
import { blogRouter } from "./routes/blog.routes";

const app = express();
app.use(cors());
app.use(express.json());
app.use(compression());
app.use("/", blogRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
