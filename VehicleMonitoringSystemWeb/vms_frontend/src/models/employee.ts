export default class Employee {
  public id: string;
  public roleId: number;
  public companyId: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string | undefined;

  constructor(id: string, roleId: number,
              companyId: number, firstName: string,
              lastName: string, email: string,
              password: string|undefined) {
    this.id = id;
    this.roleId = roleId;
    this.companyId = companyId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }

  public getFullName () : string {
    return this.firstName + ' ' + this.lastName;
  }
}
