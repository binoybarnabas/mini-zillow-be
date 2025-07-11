import express, { Request, Response } from "express";
import userRoutes from './routes/user.routes';
import authRotes from './routes/auth.routes'
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use('/users',userRoutes);
app.use('/auth',authRotes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
