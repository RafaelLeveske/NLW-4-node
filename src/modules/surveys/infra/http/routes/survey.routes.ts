import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import SurveysController from '../controllers/SurveysController';

const surveysRouter = Router();
const surveysController = new SurveysController();

surveysRouter.use(ensureAuthenticated);

surveysRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().max(100).required(),
      description: Joi.string().required(),
    },
  }),
  surveysController.create,
);

export default surveysRouter;
