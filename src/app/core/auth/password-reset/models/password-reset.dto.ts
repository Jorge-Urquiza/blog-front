export class PasswordResetDto {
  public userId: number;
  public privateCode: string;
  public password?: string;

  constructor(userId: number, privateCode: string, password?: string) {
    this.userId = userId;
    this.privateCode = privateCode;
    this.password = password;
  }
}
