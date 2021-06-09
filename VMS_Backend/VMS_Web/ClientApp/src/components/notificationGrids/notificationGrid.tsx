import * as React from "react";
import {DataGrid} from "@material-ui/data-grid";

interface InterfaceProps {
	notificationData: any;
}

export const NotificationGrid : React.FunctionComponent<InterfaceProps> = (props) => {
	const columnsSchema = [
		{ field: 'id', headerName: 'ID', width: 70 },
		{ field: 'notificationType', headerName: 'Notification Type', width: 200 },
		{ field: 'message', headerName: 'Message', width: 250 },
		{ field: 'vehicleName', headerName: 'Vehicle Name', width: 200 },
		{ field: 'employeeName', headerName: 'Employee Name', width: 200 },
		{
			field: 'datetime',
			type: 'string',
			headerName: 'Datetime',
			width: 180,
		},
		{
			field: 'geofenceName',
			headerName: 'Geofence Name',
			type: 'string',
			width: 200,
		},
		{
			field: 'latitude',
			headerName: 'Latitude',
			type: 'string',
			width: 200,
		},
		{
			field: 'longitude',
			headerName: 'Longitude',
			type: 'string',
			width: 200,
		},
		{
			field: 'speed',
			headerName: 'Speed',
			type: 'number',
			width: 150,
		},
		{
			field: 'levelFuel',
			headerName: 'Fuel level',
			type: 'number',
			width: 150,
		}
	];

	return (
		<DataGrid rows={props.notificationData} columns={columnsSchema}/>
	);
}
