import axios from 'axios';
import Employee from "../models/employee";
import {getDbUserCompanyId} from "../utils/userUtil";
import Vehicle from "../models/vehicle";

export async function createGeofenceVehicleLinks(geofenceId: number, vehicleIds: number[]) {
  try {
    const response = await axios.post(`geofenceVehicleLink/${geofenceId}`, vehicleIds);
    // console.log(`createGeofenceVehicleLinks: ${JSON.stringify(response.data)}`);
    return response.data;
  } catch (e) {
    // console.log("Error:createGeofenceVehicleLinks ", e.response);
    return null;
  }
}

export async function getCurrentVehicles(geofenceId: number|undefined): Promise<Vehicle[]|null> {
  try {
    const response = await axios.get<Vehicle[]>(`geofenceVehicleLink/getCurrentVehicles/${geofenceId}`);
    const vehicles = response.data;
    vehicles.map(vehicle => Object.setPrototypeOf(vehicle, Vehicle.prototype));
    // console.log(`getCurrentDrivers: ${JSON.stringify(vehicles)}`);
    return vehicles;
  } catch (e) {
    console.log("Error:getCurrentVehicles ", e.response);
    return null;
  }
}

export async function getCurrentGeofenceVehiclesMap(): Promise<Map<number, Vehicle[]>|null> {
  const companyId = await getDbUserCompanyId();
  if (!companyId) {
    return null;
  }

  try {
    const response = await axios.get<Map<number, Vehicle[]>>(`geofenceVehicleLink/getCurrentGeofenceVehiclesMap/${companyId}`);
    const res = new Map<number, Vehicle[]>();
    Object.keys(response.data).forEach(key => res.set(+key, response.data[key].map(vehicle => Object.setPrototypeOf(vehicle, Vehicle.prototype))));
    // console.log(`getCurrentGeofenceVehiclesMap, res: ${JSON.stringify(res)}`);

    return res;
  } catch (e) {
    console.log("Error:getCurrentGeofenceVehiclesMap ", e);
    return null;
  }
}
