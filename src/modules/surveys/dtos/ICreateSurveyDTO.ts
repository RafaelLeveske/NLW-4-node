import { UserModel } from '@modules/users/infra/mongoose/schemas/User';

export default interface ICreateCompanyDTO {
  title: string;
  description: string;
  user: UserModel;
}
