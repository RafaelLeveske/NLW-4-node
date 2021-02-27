import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateSurveyService from '@modules/surveys/services/CreateSurveyService';

export default class SurveysController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { title, description } = request.body;

    const createSurvey = container.resolve(CreateSurveyService);

    const survey = await createSurvey.execute({
      title,
      description,
      user_id: request.user.id,
    });

    return response.json(survey);
  }
}
