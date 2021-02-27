import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ISurveysRepository from '../repositories/ISurveysRepository';
import { SurveyModel } from '../infra/mongoose/schemas/Survey';

interface IRequest {
  title: string;
  description: string;
  user_id: string;
}

@injectable()
class CreateSurveyService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('SurveysRepository')
    private surveysRepository: ISurveysRepository,
  ) {}

  public async execute({
    title,
    description,
    user_id,
  }: IRequest): Promise<SurveyModel> {
    const userId = await this.usersRepository.findById(user_id);

    if (!userId) {
      throw new AppError('User does not exists');
    }

    const survey = await this.surveysRepository.create({
      title,
      description,
      user: userId,
    });

    return survey;
  }
}

export default CreateSurveyService;
