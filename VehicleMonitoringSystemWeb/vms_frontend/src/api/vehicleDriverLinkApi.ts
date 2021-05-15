import axios from 'axios';
import Employee from "../models/employee";
import {getDbUserCompanyId} from "../utils/userUtil";

export async function createVehicleDriverLinks(vehicleId: number, driverIds: string[]) {
  try {
    const response = await axios.post(`vehicleDriverLink/${vehicleId}`, driverIds);
    // console.log(`createVehicleDriverLinks: ${JSON.stringify(response.data)}`);
    return response.data;
  } catch (e) {
    // console.log("Error:createVehicleDriverLinks ", e.response);
    return null;
  }
}

export async function getCurrentDrivers(vehicleId: number|undefined): Promise<Employee[]|null> {
  try {
    const response = await axios.get<Employee[]>(`vehicleDriverLink/getCurrentDrivers/${vehicleId}`);
    const drivers = response.data;
    drivers.map(driver => Object.setPrototypeOf(driver, Employee.prototype));
    // console.log(`getCurrentDrivers: ${JSON.stringify(drivers)}`);
    return drivers;
  } catch (e) {
    console.log("Error:getCurrentDrivers ", e.response);
    return null;
  }
}

export async function getCurrentVehiclesDriversMap(): Promise<Map<number, Employee[]>|null> {
  const companyId = await getDbUserCompanyId();
  if (!companyId) {
    return null;
  }

  try {
    const response = await axios.get<Map<number, Employee[]>>(`vehicleDriverLink/getCurrentVehiclesDriversMap/${companyId}`);
    const res = new Map<number, Employee[]>();
    // Object.keys(response.data).forEach(key => console.log(`key = ${key}, value = ${JSON.stringify(response.data[key])}`));
    Object.keys(response.data).forEach(key => res.set(+key, response.data[key].map(driver => Object.setPrototypeOf(driver, Employee.prototype))));
    // console.log(`getCurrentVehiclesDriversMap, res: ${JSON.stringify(res)}`);

    return res;
  } catch (e) {
    console.log("Error:getCurrentVehiclesDriversMap ", e);
    return null;
  }
}
