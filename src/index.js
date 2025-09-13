import 'dotenv/config.js';
import express from 'express';
import { CreateUserController } from './controllers/create-user.js';

const app = express() 
app.use(express.json())

app.post('/api/users', async (req, res) => {
  const createUserController = new CreateUserController();
  const createUserResponse = await createUserController.execute(req);
  res.status(createUserResponse.statusCode).json(createUserResponse.body);
})


app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
})