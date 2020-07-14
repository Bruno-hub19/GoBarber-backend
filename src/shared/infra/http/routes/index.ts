import { Router } from 'express';

import appointmentsRoutes from './appointments.routes';
import usersRoutes from './users.routes';
import sessionsRoutes from './sessions.routes';

const routes = Router();

routes.use('/appointment', appointmentsRoutes);
routes.use('/user', usersRoutes);
routes.use('/session', sessionsRoutes);

export default routes;
