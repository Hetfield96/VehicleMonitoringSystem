import * as React from "react";
import {Button, FormControl} from '@material-ui/core';
import {StylesDictionary} from "../../utils/stylesDictionary";
import Select from 'react-select'
import Vehicle from "../../../models/vehicle";
import {useEffect, useState} from "react";
import * as VehicleApi from "../../../api/vehicleApi";
import * as GeofenceVehicleLinkApi from "../../../api/geofenceVehicleLinkApi";
import Colors from "../../../constants/colors";
import {reactSelectStyles} from "../../../styles/reactSelectStyles";
import Geofence from "../../../models/geofence";

interface InterfaceProps {
    geofence: Geofence;
    closeModal: () => void;
    updateGeofences: () => void;
}

export const PropertiesVehiclesGeofenceFormName = 'Vehicles';

export const PropertiesVehiclesGeofenceForm: React.FunctionComponent<InterfaceProps> = (props) => {
    const {geofence} = props;
    const [vehicleOptions, setVehicleOptions] = useState<Vehicle[]|null>([]);
    const [selectedVehicles, setSelectedVehicles] = useState<Vehicle[]|null>([]);

    useEffect(() => {
        (async function() {
            const varVehicleOptions = await VehicleApi.getAllCompanyVehicles();
            const currentVehicles = await GeofenceVehicleLinkApi.getCurrentVehicles(geofence.id);

            await setSelectedVehicles(currentVehicles);
            await setVehicleOptions(varVehicleOptions);
        })();
    }, []);

    async function saveVehicleLinks() {
        if (!!selectedVehicles && geofence.id) {
            await GeofenceVehicleLinkApi.createGeofenceVehicleLinks(geofence.id, selectedVehicles.map(v => v.id));

            props.closeModal();
            props.updateGeofences();
        }
    }

    return (
        <div style={styles.container}>
            <FormControl style={styles.formControl}>
                <Select
                    closeMenuOnSelect={false}
                    isMulti={true}
                    value={selectedVehicles && selectedVehicles.map((v: Vehicle) => (
                        {value: v, label: v.getFormattedName(), color: Colors.primary }
                    ))}
                    onChange={event => setSelectedVehicles(event.map(item => item.value))}
                    options={vehicleOptions
                    && vehicleOptions
                        .filter(vOption => !selectedVehicles || !(selectedVehicles.find(v => v.id === vOption.id)))
                        .map((v: Vehicle) => ({value: v, label: v.getFormattedName(), color: Colors.primary }))
                    }
                    styles={reactSelectStyles(300)}
                />
            </FormControl>

            <Button onClick={saveVehicleLinks} variant='contained' type='submit' color='primary' style={styles.button}>
                Save
            </Button>
        </div>
    );
}

const styles: StylesDictionary  = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 20,
        marginRight: 20
    },
    button: {
        width: 200,
        marginTop: 20,
        alignSelf: 'center'
    },
    formControl: {
        minWidth: 200,
        maxWidth: 300,
        alignSelf: 'center'
    }
};
