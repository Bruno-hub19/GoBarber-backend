import { Router } from 'express';

import appointmentsRoutes from '@modules/appointments/infra/http/routes/appointments.routes';
import usersRoutes from '@modules/users/infra/http/routes/users.routes';
import sessionsRoutes from '@modules/users/infra/http/routes/sessions.routes';

const routes = Router();

routes.use('/appointment', appointmentsRoutes);
routes.use('/user', usersRoutes);
routes.use('/session', sessionsRoutes);

export default routes;
