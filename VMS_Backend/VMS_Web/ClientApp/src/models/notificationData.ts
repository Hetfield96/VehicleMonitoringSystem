import Vehicle from "./vehicle";
import Employee from "./employee";

export default class NotificationData {
  public id: number | undefined;
  public message: string;
  public type: number;
  public geofenceId: number;
  public vehicleId: number | undefined;
  public vehicle: Vehicle | undefined;
  public employeeId: number | undefined;
  public employee: Employee | undefined;
  public datetime: Date | undefined;
  public latitude: string | undefined;
  public longitude: string | undefined;

  public levelFuel: number | undefined;
  public speed: number | undefined;
}
