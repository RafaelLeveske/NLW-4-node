import { Router } from 'express';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import surveysRouter from '@modules/surveys/infra/http/routes/survey.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/surveys', surveysRouter);

export default routes;
