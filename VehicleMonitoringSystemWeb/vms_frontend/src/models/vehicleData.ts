import Vehicle from "./vehicle";
import Employee from "./employee";

export default class VehicleData {
  public id: number | undefined;
  public vehicleId: number | undefined;
  public vehicle: Vehicle | undefined;
  public employeeId: number | undefined;
  public employee: Employee | undefined;
  public datetime: Date | undefined;
  public latitude: string | undefined;
  public longitude: string | undefined;
  public rpmEngine: number | undefined;
}
