import GeoCoordinate from "./geoCoordinate";

export default class Geofence {
  public id: number|null;
  public companyId: number;
  public name: string;
  public coords: GeoCoordinate[];
  public isLeaveRestricted: boolean;
  public isEnterRestricted: boolean;

  constructor(id: number|null, companyId: number, name: string, coords: GeoCoordinate[],
              isLeaveRestricted: boolean, isEnterRestricted: boolean) {
    this.id = id;
    this.companyId = companyId;
    this.name = name;
    this.coords = coords;
    this.isLeaveRestricted = isLeaveRestricted;
    this.isEnterRestricted = isEnterRestricted;
  }
}
