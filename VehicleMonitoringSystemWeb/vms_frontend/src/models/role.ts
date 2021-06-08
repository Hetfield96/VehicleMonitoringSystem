
export default class Role {
  public static getAllRoles() {
    const language = localStorage.getItem("language");
    if (language === 'ru') {
      return [
        new Role(1, 'Администратор'),
        new Role(2, 'Оператор'),
        new Role(3, 'Водитель'),
      ]
    }
    return [
      new Role(1, 'Administrator'),
      new Role(2, 'Operator'),
      new Role(3, 'Driver'),
    ]
  }

  public static isAdministrator(id: number | undefined): boolean {
    return id === 1;
  }

  public static isOperator(id: number | undefined): boolean {
    return id === 2;
  }

  public static isDriver(id: number | undefined): boolean {
    return id === 3;
  }

  public id: number | undefined;
  public name: string | undefined;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}
