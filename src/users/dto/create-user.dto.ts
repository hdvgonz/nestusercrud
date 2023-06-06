/* eslint-disable prettier/prettier */
export class CreateUserDto {
  public readonly username: string;
  public readonly password: string;
  public readonly  authStrategy?: string;
}
