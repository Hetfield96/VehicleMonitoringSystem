import axios from 'axios';
import Employee from "../models/employee";
import {getDbUserCompanyId} from "../utils/userUtil";
import Vehicle from "../models/vehicle";
import {dateTimeToString} from "../utils/dateFunctions";
import NotificationType from "../models/notificationType";
import NotificationData from "../models/notificationData";

export async function generate(notificationTypeId: number, vehicleId: number|null, startDateTime: string, endDateTime: string) {
  const companyId = await getDbUserCompanyId();
  if (!companyId) {
    return null;
  }

  try {
    const response = await axios.get(`notification/${notificationTypeId}/${companyId}/${startDateTime}/${endDateTime}`, {params: {vehicleId}});
    // console.log(`generate.response: ${JSON.stringify(response.data)}`);

    return formatNotificationsData(response.data);

  } catch (e) {
    // console.log("Error:getAllVehicles ", e.response);
    return null;
  }
}

function formatNotificationsData(data: any) {
    data.forEach((n: NotificationData) => {
        Object.setPrototypeOf(n, NotificationType.prototype);
        Object.setPrototypeOf(n.vehicle, Vehicle.prototype);
        Object.setPrototypeOf(n.employee, Employee.prototype);
    });

    const notificationData = data.map((n: NotificationData) =>
        ({
            id: n.id,
            datetime: dateTimeToString(n.datetime),
            employeeName: n.employee && n.employee.getFullName(),
            vehicleName: n.vehicle && n.vehicle.getFormattedName(),
            latitude: n.latitude,
            longitude: n.longitude,
            levelFuel: n.levelFuel,
            speed: n.speed,
            message: n.message,
            notificationType: NotificationType.getNotificationTypeName(n.type),
            geofenceName: n.geofenceId === 1 ? 'New geofence' : n.geofenceId === 8 ? 'Enter restricted geofence' : null
            // TODO save geofences name at DB
        }));

    return notificationData;
}
