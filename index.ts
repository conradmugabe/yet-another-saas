import express from "express";
import compression from "compression";

const app = express();
app.use(express.json());
app.use(compression());

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
