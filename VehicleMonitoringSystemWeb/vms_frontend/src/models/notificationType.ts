export default class NotificationType {
	public static getStandardTemplates() {
		return [
			new NotificationType(0, 'All notifications'),
			new NotificationType(1, 'Geofence notifications'),
			new NotificationType(2, 'Fuel level notifications')
		]
	}

	public static getNotificationTypeName(id: number) {
		switch (id) {
			case 1:
				return 'Geofence notifications';
			case 2:
				return 'Fuel level notifications';
			default:
				return null;
		}
	}

	public id: number;
	public name: string;

	constructor(id: number, name: string) {
		this.id = id;
		this.name = name;
	}
}
