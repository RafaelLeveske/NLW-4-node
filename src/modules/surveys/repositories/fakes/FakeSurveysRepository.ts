import { ObjectID } from 'mongodb';
import ICreateSurveyDTO from '@modules/surveys/dtos/ICreateSurveyDTO';
import ISurveysRepository from '../ISurveysRepository';
import Survey, { SurveyModel } from '../../infra/mongoose/schemas/Survey';

class FakeSurveysRepository implements ISurveysRepository {
  private surveys: SurveyModel[] = [];

  public async findById(
    id: ObjectID | string,
  ): Promise<SurveyModel | null | undefined> {
    const findSurvey = this.surveys.find(survey => survey.id === id);

    return findSurvey;
  }

  public async create({
    title,
    description,
    user,
  }: ICreateSurveyDTO): Promise<SurveyModel> {
    const survey = new Survey();

    Object.assign(survey, {
      id: new ObjectID(),
      title,
      description,
      user,
    });

    this.surveys.push(survey);

    return survey;
  }

  public async save(survey: SurveyModel): Promise<SurveyModel | null> {
    const findIndex = this.surveys.findIndex(
      findSurvey => findSurvey.id === survey.id,
    );

    this.surveys[findIndex] = survey;

    return survey;
  }

  public async destroy(
    survey: SurveyModel,
  ): Promise<SurveyModel | null | undefined> {
    const findSurveyToDestroy = this.surveys.find(findSurvey => {
      const deleteSurvey = findSurvey.id === survey.id;

      return deleteSurvey;
    });

    return findSurveyToDestroy;
  }
}

export default FakeSurveysRepository;
