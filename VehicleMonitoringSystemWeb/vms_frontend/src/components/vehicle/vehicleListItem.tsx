import * as React from "react";
import { IconButton, ListItem, ListItemSecondaryAction} from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import {StylesDictionary} from "../utils/stylesDictionary";
import Vehicle from "../../models/vehicle";
import Popup from "reactjs-popup";
import {PropertiesVehicleForm} from "./properties/propertiesVehicleForm";
import {useEffect, useState} from "react";
import * as VehicleDriverLinkApi from "../../api/vehicleDriverLinkApi";
import Employee from "../../models/employee";
import Colors from "../../constants/colors";

interface InterfaceProps {
    vehicle: Vehicle;
    drivers: Employee[]|null|undefined;
    updateVehicles: () => void;
}

export const VehicleListItem: React.FunctionComponent<InterfaceProps> = (props) => {
    const { vehicle, drivers } = props;

    return (
        <div style={styles.container}>
            <ListItem
                key={vehicle.id}
                button={true}
                style={styles.listItem}
            >
                <div style={{marginRight: 20}}>
                    {vehicle.getFormattedName()}
                    {<br/>}
                    <b>Drivers: </b>
                    {<br/>}
                    {`${!!drivers ? drivers.map(d => d.getFullName()).join(', ') : 'none'}`}
                </div>
                <Popup
                    trigger={
                        <ListItemSecondaryAction>
                            <IconButton edge="end">
                                <SettingsIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    }
                    modal={true}
                    nested={true}
                >
                    {(close: any) => {

                        return (
                            <div className="modal">
                                <button className="close" onClick={close}>
                                    &times;
                                </button>
                                <div>
                                    <PropertiesVehicleForm vehicle={vehicle} closeModal={close} updateVehicles={props.updateVehicles}/>
                                </div>
                            </div>
                        )
                    }}
                </Popup>

            </ListItem>
        </div>
    );
}

const styles: StylesDictionary  = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 4,
        marginRight: 4,
        marginBottom: 4,
        backgroundColor: Colors.modalBackground
    },
    listItem: {
        height: 50,
        flex: 1
    }
};
