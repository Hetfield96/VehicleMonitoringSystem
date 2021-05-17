import * as React from "react";
import {withAuthorization} from "../../firebase/withAuthorization";
import {useEffect, useState} from "react";
import {StylesDictionary} from "../../components/utils/stylesDictionary";
import Colors from "../../constants/colors";
import {Button, FormHelperText} from "@material-ui/core";
import Report from "../../models/report";
import Vehicle from "../../models/vehicle";
import * as VehicleApi from "../../api/vehicleApi";
import * as ReportApi from "../../api/reportApi";
import Select from 'react-select'
import 'react-minimal-datetime-range/lib/react-minimal-datetime-range.min.css';
import { RangePicker } from 'react-minimal-datetime-range';
import {
    formatDateTime,
    getDate,
    getDefaultEndDateTime,
    getDefaultStartDateTime,
    getTime
} from "../../utils/dateFunctions";
import moment from "moment";
import {AllVehicleDataReportGrid} from "../../components/reportGrids/allVehicleDataReportGrid";
import Employee from "../../models/employee";
import {selectColorStyles} from "../../styles/SelectStyles";

export const ReportsComponent : React.FunctionComponent = () => {
    const [reportOptions, setReportOptions] = useState<Report[]|null>(null);
    const [selectedReport, setSelectedReport] = useState<Report|null>(null);

    const [vehicleOptions, setVehicleOptions] = useState<Vehicle[]|null>(null);
    const [selectedVehicle, setSelectedVehicle] = useState<Vehicle|null>(null);

    const [startDateTime, setStartDateTime] = useState<string>(getDefaultStartDateTime());
    const [endDateTime, setEndDateTime] = useState<string>(getDefaultEndDateTime());

    const [reportData, setReportData] = useState();

    useEffect(() => {
        (async function() {
            await setReportOptions(Report.getStandardTemplates());
            await setVehicleOptions(await VehicleApi.getAllCompanyVehicles());
        })();
    }, []);


    const isGenerateButtonDisabled = () => {
        return !selectedReport;
    }

    const generateReport = async () => {
        if (selectedReport) {
            console.log(`generateReport, selectedReport: ${JSON.stringify(selectedReport)}`);
            const rows =
                await ReportApi.generate(selectedReport.id, selectedVehicle ? selectedVehicle.id : null, startDateTime, endDateTime);
            // const rows = [
            //     { id: 299, vehicleId: '2', employeeId: '6rCZ9FrOAMd4SdEDNaNENoY1Gku2', datetime: moment().toDate(), latitude: 56.0121715, longitude: 37.8598038, rpmEngine: 858  }
            // ];
            await setReportData(rows);
        }
    }

    const setDateTimeRange = async (res: string[]) => {
        const fromDateTime = res[0].split(' ');
        const fromDate = fromDateTime[0].split('-');
        const fromTime = fromDateTime[1].split(':');
        setStartDateTime(formatDateTime(fromDate[0], fromDate[1], fromDate[2], fromTime[0], fromTime[1]));

        const toDateTime = res[1].split(' ');
        const toDate = toDateTime[0].split('-');
        const toTime = toDateTime[1].split(':');
        setEndDateTime(formatDateTime(toDate[0], toDate[1], toDate[2], toTime[0], toTime[1]));
    }

    const buildReportGrid = (varReportData: any) => {
        console.log(`buildReportGrid start`);
        if (selectedReport && varReportData) {
            switch (selectedReport.id) {
                case 1:
                    console.log(`AllVehicleDataReportGrid is building`);
                    return (<AllVehicleDataReportGrid reportData={varReportData}/>);
            }
        }
        console.log(`buildReportGrid - unsecessful`);
        return null;
    }

    return (
        <div style={styles.container}>
            <div style={styles.reportSettings}>
                <h1>Reports</h1>

                {/*TODO change all select on selects like this one*/}
                <Select
                    value={
                        {value: selectedReport, label: selectedReport && selectedReport.name, color: Colors.primary }}
                    onChange={event => setSelectedReport(event.value)}
                    options={
                        reportOptions && reportOptions.map((r: Report) => ({value: r, label: r.name, color: Colors.primary }))
                    }
                    styles={selectColorStyles(300)}
                />
                <FormHelperText>Template</FormHelperText>

                <Select
                    value={
                        {value: selectedVehicle, label: selectedVehicle && selectedVehicle.getFormattedName(), color: Colors.primary }}
                    onChange={event => setSelectedVehicle(event.value)}
                    options={
                        vehicleOptions && vehicleOptions.map((v: Vehicle) => ({value: v, label: v.getFormattedName(), color: Colors.primary }))
                    }
                    styles={selectColorStyles(300)}
                />
                <FormHelperText>Vehicle</FormHelperText>

                <RangePicker
                    locale="en-us"
                    show={false} // default is false
                    disabled={false} // default is false
                    allowPageClickToClose={true} // default is true
                    onConfirm={async (res: string[]) => await setDateTimeRange(res)}
                    style={styles.timeRangePicker}
                    defaultDates={[getDate(startDateTime), getDate(endDateTime)]}
                    defaultTimes={[getTime(startDateTime), getTime(endDateTime)]}
                    initialDates={[getDate(startDateTime), getDate(endDateTime)]}
                    initialTimes={[getTime(startDateTime), getTime(endDateTime)]}
                />

                <Button
                    disabled={isGenerateButtonDisabled()}
                    onClick={generateReport}
                    variant='contained' type='submit' color='primary' style={styles.button}>
                    Generate
                </Button>
            </div>

            {
                reportData &&
                <div style={styles.dataGrid}>
                    {buildReportGrid(reportData)}
                </div>
            }
        </div>
    );
}


const styles: StylesDictionary  = {
    container: {
        display: 'flex',
        flex: 1,
        height: '100vh',
        flexDirection: 'column',
        marginLeft: 20,
        backgroundColor: Colors.background,
    },
    reportSettings: {
        display: 'flex',
        flexDirection: 'column',
        width: 300,
    },
    select: {
        width: 300,
        marginTop: 10,
        alignSelf: 'start'
    },
    button: {
        width: 200,
        marginTop: 20,
        marginLeft: 50,
        alignSelf: 'start',
    },
    timeRangePicker: {
        width: 300,
        marginTop: 10
    },
    dataGrid: {
        height: 370,
        width: '95%',
        alignSelf: 'center',
        marginTop: 30
    }
};


const authCondition = (authUser: any) => !!authUser;
export const ReportsScreen = withAuthorization(authCondition)(ReportsComponent);
