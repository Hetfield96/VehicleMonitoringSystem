export default class TaskStatus {
  public static getDefaultStatuses() {
    const language = localStorage.getItem("language");
    if (language === 'ru') {
      return [
        new TaskStatus(1, 'Создана'),
        new TaskStatus(2, 'В исполнении'),
        new TaskStatus(3, 'Исполнена'),
        new TaskStatus(4, 'Закрыта'),
      ]
    }
    return [
      new TaskStatus(1, 'Created'),
      new TaskStatus(2, 'In progress'),
      new TaskStatus(3, 'Resolved'),
      new TaskStatus(4, 'Closed'),
    ]
  }

  public id: number;
  public name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}
