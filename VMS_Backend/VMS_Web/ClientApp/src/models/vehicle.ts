import {getDbUserCompanyId} from "../utils/userUtil";

export default class Vehicle {
  public id: number;
  public companyId: number;
  public name: string;
  public number: string;
  public model: string | undefined;
  public productionYear: number | undefined;

  constructor(name: string,
              number: string,
              model: string | undefined,
              productionYear: number | undefined,
              vehicle?: Vehicle) {
    if (!!vehicle) {
      this.id = vehicle.id;
    } else {
      this.id = -1;
    }

    getDbUserCompanyId()
        .then(companyId => {
          if (companyId) {
            this.companyId = companyId;
          }
        });

    this.name = name;
    this.number = number;
    this.model = model;
    this.productionYear = productionYear;
  }

  public getFormattedName() {
    return `${this.name} ${this.number}`;
  }
}
