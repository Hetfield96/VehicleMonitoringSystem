import * as React from "react";
import {DataGrid} from "@material-ui/data-grid";

interface InterfaceProps {
	reportData: any;
}

export const VehicleWorkingTimeDataReportGrid : React.FunctionComponent<InterfaceProps> = (props) => {
	const columnsSchema = [
		{ field: 'id', headerName: 'ID', width: 70 },
		{ field: 'vehicleName', headerName: 'Vehicle Name', width: 300 },
		{ field: 'employeeName', headerName: 'Employee Name', width: 300 },
		{ field: 'workingHours', headerName: 'Working hours', width: 300 }
	];

	return (
		<DataGrid rows={props.reportData} columns={columnsSchema}/>
	);
}
