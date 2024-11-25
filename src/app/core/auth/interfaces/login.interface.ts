interface IloginData {
  email: string;
  password: string;
}
interface IloginResponse {
  data: IStorageInterface;
  status: string;
}
interface IStorageInterface {
  id: number;
  token: string;
  contractorCompanyId: number;
  email: string;
}

export { IloginData, IloginResponse, IStorageInterface };
