import * as React from "react";
import {DataGrid} from "@material-ui/data-grid";
import strings from "../../constants/strings";

interface InterfaceProps {
	reportData: any;
}

export const AllVehicleDataReportGrid : React.FunctionComponent<InterfaceProps> = (props) => {
	const columnsSchema = [
		{ field: 'id', headerName: 'ID', width: 70 },
		{ field: 'vehicleName', headerName: strings.vehicleName, width: 200 },
		{ field: 'employeeName', headerName: strings.employeeName, width: 200 },
		{
			field: 'datetime',
			type: 'string',
			headerName: strings.datetime,
			width: 180,
			// valueGetter: (params) => `${params.getValue('datetime').toString().replace('T', ' ')}`,
		},
		{
			field: 'latitude',
			headerName: strings.latitude,
			type: 'string',
			width: 200,
		},
		{
			field: 'longitude',
			headerName: strings.longitude,
			type: 'string',
			width: 200,
		},
		{
			field: 'speed',
			headerName: strings.speed,
			type: 'number',
			width: 270,
		},
		{
			field: 'levelFuel',
			headerName: strings.fuelLevel,
			type: 'number',
			width: 270,
		},
		{
			field: 'airFuelRatio',
			headerName: strings.airFuelRatio,
			type: 'number',
			width: 270,
		},
		{
			field: 'rpmEngine',
			headerName: strings.rpmEngine,
			description: strings.rpmEngineDescription,
			type: 'number',
			width: 270,
		},
		{
			field: 'load',
			headerName: strings.load,
			type: 'number',
			width: 270,
		},
		{
			field: 'absoluteLoad',
			headerName: strings.absoluteLoad,
			type: 'number',
			width: 270,
		},
		{
			field: 'engineCoolantTemperature',
			headerName: strings.engineCoolantTemperature,
			type: 'number',
			width: 270,
		},
		{
			field: 'airIntakeTemperature',
			headerName: strings.airIntakeTemperature,
			type: 'number',
			width: 270,
		},
		{
			field: 'ambientAirTemperature',
			headerName: strings.ambientAirTemperature,
			type: 'number',
			width: 270,
		},
		{
			field: 'distanceMilControl',
			headerName: strings.distanceMilControl,
			type: 'number',
			width: 270,
		},
		{
			field: 'distanceSinceCcControl',
			headerName: strings.distanceSinceCcControl,
			type: 'number',
			width: 270,
		},
		{
			field: 'dtcNumber',
			headerName: strings.dtcNumber,
			type: 'number',
			width: 270,
		},
		{
			field: 'pendingTroubleCodes',
			headerName: strings.pendingTroubleCodes,
			type: 'string',
			width: 270,
		},
		{
			field: 'permanentTroubleCodes',
			headerName: strings.permanentTroubleCodes,
			type: 'string',
			width: 270,
		},
		{
			field: 'troubleCodes',
			headerName: strings.troubleCodes,
			type: 'string',
			width: 270,
		},
	];

	return (
		<DataGrid rows={props.reportData} columns={columnsSchema}/>
	);
}
