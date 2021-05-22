import * as React from "react";
import {DataGrid} from "@material-ui/data-grid";

interface InterfaceProps {
	reportData: any;
}

export const AllVehicleDataReportGrid : React.FunctionComponent<InterfaceProps> = (props) => {
	const columnsSchema = [
		{ field: 'id', headerName: 'ID', width: 70 },
		{ field: 'vehicleName', headerName: 'Vehicle Name', width: 200 },
		{ field: 'employeeName', headerName: 'Employee Name', width: 200 },
		{
			field: 'datetime',
			type: 'string',
			headerName: 'Datetime',
			width: 180,
			// valueGetter: (params) => `${params.getValue('datetime').toString().replace('T', ' ')}`,
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
			field: 'distanceMilControl',
			headerName: 'Mileage',
			type: 'number',
			width: 150,
		},
		{
			field: 'distanceSinceCcControl',
			headerName: 'Mileage since last drop',
			type: 'number',
			width: 150,
		},
		{
			field: 'dtcNumber',
			headerName: 'Dtc number',
			type: 'number',
			width: 150,
		},
		{
			field: 'pendingTroubleCodes',
			headerName: 'Engine pending trouble codes',
			type: 'string',
			width: 150,
		},
		{
			field: 'permanentTroubleCodes',
			headerName: 'Engine permanent trouble codes',
			type: 'string',
			width: 150,
		},
		{
			field: 'troubleCodes',
			headerName: 'Engine trouble codes',
			type: 'string',
			width: 150,
		},
		{
			field: 'rpmEngine',
			headerName: 'Engine RPM',
			description: 'Engine Revolutions Per Minute',
			type: 'number',
			width: 150,
		},
		{
			field: 'absoluteLoad',
			headerName: 'Engine absolute load',
			type: 'number',
			width: 150,
		},
		{
			field: 'load',
			headerName: 'Engine load',
			type: 'number',
			width: 150,
		},
		{
			field: 'levelFuel',
			headerName: 'Fuel level',
			type: 'number',
			width: 150,
		},
		{
			field: 'airFuelRatio',
			headerName: 'Air-fuel ratio',
			type: 'number',
			width: 150,
		},
		{
			field: 'engineCoolantTemperature',
			headerName: 'Engine coolant temperature',
			type: 'number',
			width: 150,
		},
		{
			field: 'airIntakeTemperature',
			headerName: 'Air intake temperature',
			type: 'number',
			width: 150,
		},
		{
			field: 'ambientAirTemperature',
			headerName: 'Ambient air temperature',
			type: 'number',
			width: 150,
		},
		{
			field: 'speed',
			headerName: 'Speed',
			type: 'number',
			width: 150,
		},
	];

	return (
		<DataGrid rows={props.reportData} columns={columnsSchema}/>
	);
}
