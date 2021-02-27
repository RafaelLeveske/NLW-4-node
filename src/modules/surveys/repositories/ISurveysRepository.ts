import { ObjectID } from 'mongodb';
import ICreateSurveyDTO from '../dtos/ICreateSurveyDTO';
import { SurveyModel } from '../infra/mongoose/schemas/Survey';

export default interface ISurveysRepository {
  findById(id: ObjectID | string): Promise<SurveyModel | null | undefined>;
  create(data: ICreateSurveyDTO): Promise<SurveyModel>;
  save(company: SurveyModel): Promise<SurveyModel | null>;
  destroy(company: SurveyModel): Promise<SurveyModel | null | undefined>;
}
