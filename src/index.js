import 'dotenv/config.js';
import express from 'express';
import { CreateUserController } from './controllers/create-user.js';
import { GetUserByIdController } from './controllers/get-user-by-id.js';

const app = express() 
app.use(express.json())

app.post('/api/users', async (req, res) => {
  const createUserController = new CreateUserController();
  const createUserResponse = await createUserController.execute(req);
  res.status(createUserResponse.statusCode).json(createUserResponse.body);
})

app.get('/api/users/:userId', async (req, res) => {
  const getUserByIdController = new GetUserByIdController();
  const getUserByIdResponse = await getUserByIdController.execute(req);
  res.status(getUserByIdResponse.statusCode).json(getUserByIdResponse.body);
});
  

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
})