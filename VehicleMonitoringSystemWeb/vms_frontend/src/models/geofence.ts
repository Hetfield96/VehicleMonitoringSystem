import GeoCoordinate from "./geoCoordinate";

export default class Geofence {
  public id: number|undefined;
  public companyId: number;
  public name: string;
  public coords: GeoCoordinate[];
  public isLeaveRestricted: boolean;
  public isEnterRestricted: boolean;
  public color: string;

  constructor(id: number|undefined, companyId: number, name: string, coords: GeoCoordinate[],
              isLeaveRestricted: boolean, isEnterRestricted: boolean, color: string) {
    this.id = id;
    this.companyId = companyId;
    this.name = name;
    this.coords = coords;
    this.isLeaveRestricted = isLeaveRestricted;
    this.isEnterRestricted = isEnterRestricted;
    this.color = color;
  }
}
