import axios from 'axios';
import Task from "../models/task";
import Employee from "../models/employee";
import {getDbUserCompanyId} from "../utils/userUtil";
import VehicleData from "../models/vehicleData";
import Vehicle from "../models/vehicle";
import {dateTimeToString} from "../utils/dateFunctions";

export async function generate(reportId: number, vehicleId: number|null, startDateTime: string, endDateTime: string) {
  const companyId = await getDbUserCompanyId();
  if (!companyId) {
    return null;
  }

  try {
    const response = await axios.get<VehicleData[]>(`report/${reportId}/${companyId}/${startDateTime}/${endDateTime}`, {params: {vehicleId}});
    console.log(`generate.response: ${JSON.stringify(response.data)}`);
    response.data.forEach((vd: VehicleData) => {
      Object.setPrototypeOf(vd, VehicleData.prototype);
      Object.setPrototypeOf(vd.vehicle, Vehicle.prototype);
      Object.setPrototypeOf(vd.employee, Employee.prototype);
    });

     const vehicleData = response.data.map((vd: VehicleData) =>
        ({
          id: vd.id,
          datetime: dateTimeToString(vd.datetime),
          employeeName: vd.employee && vd.employee.getFullName(),
          vehicleName: vd.vehicle && vd.vehicle.getFormattedName(),
          latitude: vd.latitude,
          longitude: vd.longitude,
          rpmEngine: vd.rpmEngine,
        }));
    console.log(`\ngenerate.vehicleData: ${JSON.stringify(vehicleData)}`);

    return vehicleData
  } catch (e) {
    // console.log("Error:getAllVehicles ", e.response);
    return null;
  }
}
