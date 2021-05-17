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
			field: 'rpmEngine',
			headerName: 'Engine RPM',
			description: 'Engine Revolutions Per Minute',
			type: 'number',
			width: 150,
		},
	];

	return (
		<DataGrid rows={props.reportData} columns={columnsSchema}/>
	);
}
