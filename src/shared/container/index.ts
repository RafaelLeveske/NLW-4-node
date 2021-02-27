import { container } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/mongoose/repositories/UsersRepository';
import '@modules/users/providers';
import ISurveysRepository from '../../modules/surveys/repositories/ISurveysRepository';
import SurveysRepository from '../../modules/surveys/infra/mongoose/repositories/SurveysRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<ISurveysRepository>(
  'SurveysRepository',
  SurveysRepository,
);
