import { Router } from 'express';

const routes = Router();

routes.post('/user', (request, response) => {
  const { name, email, phone } = request.body;

  const newUser = {
    name,
    email,
    phone,
  };

  return response.json(newUser);
});

export default routes;
