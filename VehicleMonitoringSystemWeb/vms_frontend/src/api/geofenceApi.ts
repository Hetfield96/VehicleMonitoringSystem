import axios from 'axios';
import Vehicle from "../models/vehicle";
import {getDbUserCompanyId} from "../utils/userUtil";
import Geofence from "../models/geofence";

export async function getAllCompanyGeofences(): Promise<Geofence[] | null> {
  const companyId = await getDbUserCompanyId();
  if (!companyId) {
    return null;
  }

  try {
    const response = await axios.get(`geofence/getAll/${companyId}`);
    const geofences = response.data;
    geofences.map(g => g.coords = JSON.parse(g.coords));
    geofences.map(geofence => Object.setPrototypeOf(geofence, Geofence.prototype))
    // console.log(`geofences: ${JSON.stringify(geofences)}`);
    return geofences;
  } catch (e) {
    // console.log("Error:getAllVehicles ", e.response);
    return null;
  }
}

export async function deleteGeofence(geofenceId: number|null) {
  if (!geofenceId) {
    return null;
  }

  try {
    const response = await axios.delete(`geofence/${geofenceId}`);
    return response.data;
  } catch (e) {
    // console.log("Error:deleteVehicle ", e.response);
    return null;
  }
}

export async function createGeofence(geofence: Geofence) {
  try {
    const formatGeofence = {
      companyId: geofence.companyId,
      name: geofence.name,
      coords: JSON.stringify(geofence.coords),
      isLeaveRestricted: geofence.isLeaveRestricted,
      isEnterRestricted: geofence.isEnterRestricted
    };
    const response = await axios.post(`geofence`, formatGeofence);
    // console.log(`createVehicle: ${JSON.stringify(response.data)}`);
    return response.data;
  } catch (e) {
    // console.log("Error:createGeofence ", e.response);
    return null;
  }
}

export async function editGeofence(geofence: Geofence) {
  try {
    console.log(`editGeofence id: ${geofence.id}`);
    const formatGeofence = {
      id: geofence.id,
      companyId: geofence.companyId,
      name: geofence.name,
      coords: JSON.stringify(geofence.coords),
      isLeaveRestricted: geofence.isLeaveRestricted,
      isEnterRestricted: geofence.isEnterRestricted
    };
    const response = await axios.put(`geofence`, formatGeofence);
    // console.log(`editVehicle: ${JSON.stringify(response.data)}`);
    return response.data;
  } catch (e) {
    // console.log("Error:deleteVehicle ", e.response);
    return null;
  }
}
