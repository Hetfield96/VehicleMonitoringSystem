import * as React from "react";
import {withAuthorization} from "../../firebase/withAuthorization";
import {useEffect, useState} from "react";
import {StylesDictionary} from "../../components/utils/stylesDictionary";
import Colors from "../../constants/colors";
import {Button, FormHelperText} from "@material-ui/core";
import Report from "../../models/report";
import Vehicle from "../../models/vehicle";
import * as VehicleApi from "../../api/vehicleApi";
import * as NotificationApi from "../../api/notificationApi";
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
import {reactSelectStyles} from "../../styles/reactSelectStyles";
import NotificationType from "../../models/notificationType";
import {NotificationGrid} from "../../components/notificationGrids/notificationGrid";

export const NotificationsComponent : React.FunctionComponent = () => {
    const [notificationOptions, setNotificationOptions] = useState<NotificationType[]|null>(null);
    const [selectedNotificationOption, setSelectedNotificationOption] = useState<NotificationType|null>(null);

    const [vehicleOptions, setVehicleOptions] = useState<Vehicle[]|null>(null);
    const [selectedVehicle, setSelectedVehicle] = useState<Vehicle|null>(null);

    const [startDateTime, setStartDateTime] = useState<string>(getDefaultStartDateTime());
    const [endDateTime, setEndDateTime] = useState<string>(getDefaultEndDateTime());

    const [notificationsData, setNotificationsData] = useState();

    useEffect(() => {
        (async function() {
            await setNotificationOptions(NotificationType.getStandardTemplates());
            await setVehicleOptions(await VehicleApi.getAllCompanyVehicles());
        })();
    }, []);


    const isGenerateButtonDisabled = () => {
        return !selectedNotificationOption;
    }

    const generateNotifications = async () => {
        if (selectedNotificationOption) {
            const rows =
                await NotificationApi.generate(selectedNotificationOption.id, selectedVehicle ? selectedVehicle.id : null, startDateTime, endDateTime);
            await setNotificationsData(rows);
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

    const buildNotificationGrid = (varNotificationData: any) => {
        if (selectedNotificationOption && varNotificationData) {
            return (<NotificationGrid notificationData={varNotificationData}/>);
        }
        return null;
    }

    return (
        <div style={styles.container}>
            <div style={styles.reportSettings}>
                <h1>Notifications</h1>

                <Select
                    value={
                        {value: selectedNotificationOption, label: selectedNotificationOption && selectedNotificationOption.name, color: Colors.primary }}
                    onChange={event => setSelectedNotificationOption(event.value)}
                    options={
                        notificationOptions && notificationOptions.map((r: Report) => ({value: r, label: r.name, color: Colors.primary }))
                    }
                    styles={reactSelectStyles(320)}
                />
                <FormHelperText>Notification type</FormHelperText>

                <Select
                    value={
                        {value: selectedVehicle, label: selectedVehicle && selectedVehicle.getFormattedName(), color: Colors.primary }}
                    onChange={event => setSelectedVehicle(event && event.value)}
                    options={
                        vehicleOptions && vehicleOptions.map((v: Vehicle) => ({value: v, label: v.getFormattedName(), color: Colors.primary }))
                    }
                    isClearable={true}
                    styles={reactSelectStyles(320)}
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
                    onClick={generateNotifications}
                    variant='contained' type='submit' color='primary' style={styles.button}>
                    Generate
                </Button>
            </div>

            {
                notificationsData &&
                <div style={styles.dataGrid}>
                    {buildNotificationGrid(notificationsData)}
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
        width: 320,
    },
    button: {
        width: 210,
        marginTop: 20,
        marginLeft: 50,
        alignSelf: 'start',
    },
    timeRangePicker: {
        width: 320,
        marginTop: 10,
        alignSelf: 'start'
    },
    dataGrid: {
        height: 370,
        width: '95%',
        alignSelf: 'center',
        marginTop: 30
    }
};


const authCondition = (authUser: any) => !!authUser;
export const NotificationsScreen = withAuthorization(authCondition)(NotificationsComponent);
