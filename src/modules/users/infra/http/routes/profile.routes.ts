import { Router } from 'express';

import ProfileController from '@modules/users/infra/http/controllers/ProfileController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const profileRoutes = Router();

const profileController = new ProfileController();

profileRoutes.use(ensureAuthenticated);

profileRoutes.put('/', profileController.update);
profileRoutes.get('/show', profileController.show);

export default profileRoutes;
