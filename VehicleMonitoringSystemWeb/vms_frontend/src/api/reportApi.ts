import axios from 'axios';
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
    // console.log(`generate.response: ${JSON.stringify(response.data)}`);

    switch (reportId) {
        case 1:
            return formatReportAllVehicleData(response.data);
        case 2:
            return formatReportVehicleWorkingTimeData(response.data);
    }

    return null
  } catch (e) {
    // console.log("Error:getAllVehicles ", e.response);
    return null;
  }
}

function formatReportAllVehicleData(data: any) {
    data.forEach((vd: VehicleData) => {
        Object.setPrototypeOf(vd, VehicleData.prototype);
        Object.setPrototypeOf(vd.vehicle, Vehicle.prototype);
        Object.setPrototypeOf(vd.employee, Employee.prototype);
    });

    const vehicleData = data.map((vd: VehicleData) =>
        ({
            id: vd.id,
            datetime: dateTimeToString(vd.datetime),
            employeeName: vd.employee && vd.employee.getFullName(),
            vehicleName: vd.vehicle && vd.vehicle.getFormattedName(),
            latitude: vd.latitude,
            longitude: vd.longitude,
            distanceMilControl: vd.distanceMilControl,
            distanceSinceCcControl: vd.distanceSinceCcControl,
            dtcNumber: vd.dtcNumber,
            pendingTroubleCodes: vd.pendingTroubleCodes,
            permanentTroubleCodes: vd.permanentTroubleCodes,
            troubleCodes: vd.troubleCodes,
            rpmEngine: vd.rpmEngine,
            absoluteLoad: vd.absoluteLoad,
            load: vd.load,
            levelFuel: vd.levelFuel,
            airFuelRatio: vd.airFuelRatio,
            engineCoolantTemperature: vd.engineCoolantTemperature,
            airIntakeTemperature: vd.airIntakeTemperature,
            ambientAirTemperature: vd.ambientAirTemperature,
            speed: vd.speed,
        }));

    return vehicleData;
}

function formatReportVehicleWorkingTimeData(data: any) {
    const vehicleData = data.map((d: any, index: number) =>
        ({
            id: index + 1,
            vehicleName: d.vehicleName,
            employeeName: d.employeeName,
            workingHours: d.workingHours
        }));

    return vehicleData;
}
