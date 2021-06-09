import * as React from "react";
import {DataGrid} from "@material-ui/data-grid";
import strings from "../../constants/strings";

interface InterfaceProps {
	reportData: any;
}

export const VehicleWorkingTimeDataReportGrid : React.FunctionComponent<InterfaceProps> = (props) => {
	const columnsSchema = [
		{ field: 'id', headerName: 'ID', width: 70 },
		{ field: 'vehicleName', headerName: strings.vehicleName, width: 300 },
		{ field: 'employeeName', headerName: strings.employeeName, width: 300 },
		{ field: 'workingHours', headerName: strings.workingHours, width: 300 }
	];

	return (
		<DataGrid rows={props.reportData} columns={columnsSchema}/>
	);
}
