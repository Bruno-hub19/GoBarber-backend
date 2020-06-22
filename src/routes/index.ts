import { Router } from 'express';
import appointmentsRoutes from './appointments.routes';

const routes = Router();

routes.use('/appointment', appointmentsRoutes);

export default routes;
