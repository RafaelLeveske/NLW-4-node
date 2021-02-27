import ICreateSurveyDTO from '@modules/surveys/dtos/ICreateSurveyDTO';
import ISurveysRepository from '@modules/surveys/repositories/ISurveysRepository';
import User from '@modules/users/infra/mongoose/schemas/User';
import { ObjectID } from 'mongodb';
import Survey, { SurveyModel } from '../schemas/Survey';

class SurveysRepository implements ISurveysRepository {
  public async findById(
    id: ObjectID | string,
  ): Promise<SurveyModel | null | undefined> {
    const survey = await Survey.findById(id);

    return survey;
  }

  public async create({
    title,
    description,
    user,
  }: ICreateSurveyDTO): Promise<SurveyModel> {
    const survey = await Survey.create({
      title,
      description,
    });

    await User.findOneAndUpdate(
      { _id: user.id },
      { $push: { surveys: survey.id } },
    );

    return survey;
  }

  public async save(survey: SurveyModel): Promise<SurveyModel | null> {
    const saveSurvey = await Survey.findOneAndUpdate(
      {
        _id: survey.id,
      },
      {
        $set: {
          title: survey.title,
          description: survey.description,
        },
      },
    );
    return saveSurvey;
  }

  public async destroy(
    survey: SurveyModel,
  ): Promise<SurveyModel | null | undefined> {
    const destroySurvey = await Survey.findByIdAndRemove(survey.id);

    return destroySurvey;
  }
}

export default SurveysRepository;
