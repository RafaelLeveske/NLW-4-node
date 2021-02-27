import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../../users/repositories/fakes/FakeUsersRepository';
import FakeSurveysRepository from '../repositories/fakes/FakeSurveysRepository';
import CreateSurveyService from './CreateSurveyService';

let fakeUsersRepository: FakeUsersRepository;
let fakeSurveysRepository: FakeSurveysRepository;
let createSurvey: CreateSurveyService;

describe('CreateSurvey', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeSurveysRepository = new FakeSurveysRepository();

    createSurvey = new CreateSurveyService(
      fakeUsersRepository,
      fakeSurveysRepository,
    );
  });

  it('should be able to create a new survey', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const survey = await createSurvey.execute({
      title: 'Doe survey',
      description: '00099900099900',
      user_id: user.id,
    });

    expect(survey).toHaveProperty('id');
  });

  it('should not be able to create a new survey from a non existing user', async () => {
    await expect(
      createSurvey.execute({
        title: 'Doe survey',
        description: '00099900099909',
        user_id: 'non_user_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
