import express, { Request, Response } from "express";
import userRoutes from './routes/user.routes';
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use('/users',userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
