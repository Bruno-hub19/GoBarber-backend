import { Router } from 'express';

import appointmentsRoutes from './appointments.routes';
import usersRoutes from './users.routes';

const routes = Router();

routes.use('/appointment', appointmentsRoutes);
routes.use('/user', usersRoutes);

export default routes;
