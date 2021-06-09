import GeoCoordinate from "./geoCoordinate";

export default class Geofence {
  public id: number|undefined;
  public companyId: number;
  public name: string;
  public coords: GeoCoordinate[];
  public restrictionId: number;
  public color: string;

  constructor(id: number|undefined, companyId: number, name: string, coords: GeoCoordinate[],
              restrictionId: number, color: string) {
    this.id = id;
    this.companyId = companyId;
    this.name = name;
    this.coords = coords;
    this.restrictionId = restrictionId;
    this.color = color;
  }
}
