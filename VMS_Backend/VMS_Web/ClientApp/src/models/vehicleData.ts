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

  public distanceMilControl: number | undefined;
  public distanceSinceCcControl: number | undefined;
  public dtcNumber: number | undefined;
  public pendingTroubleCodes: string | undefined;
  public permanentTroubleCodes: string | undefined;
  public troubleCodes: string | undefined;
  public rpmEngine: number | undefined;
  public absoluteLoad: number | undefined;
  public load: number | undefined;
  public levelFuel: number | undefined;
  public airFuelRatio: number | undefined;
  public engineCoolantTemperature: number | undefined;
  public airIntakeTemperature: number | undefined;
  public ambientAirTemperature: number | undefined;
  public speed: number | undefined;
}
