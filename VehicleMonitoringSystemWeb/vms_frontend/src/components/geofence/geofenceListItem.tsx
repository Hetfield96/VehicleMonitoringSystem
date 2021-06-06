import * as React from "react";
import {IconButton, ListItem, ListItemSecondaryAction} from "@material-ui/core";
import {StylesDictionary} from "../utils/stylesDictionary";
import SettingsIcon from "@material-ui/icons/Settings";
import Popup from "reactjs-popup";
import Colors from "../../constants/colors";
import Geofence from "../../models/geofence";
import {PropertiesGeofenceForm} from "./properties/propertiesGeofenceForm";
import Vehicle from "../../models/vehicle";

interface InterfaceProps {
    geofence: Geofence;
    vehicles: Vehicle[]|null|undefined;
    updateGeofences: () => void;
}

export const GeofenceListItem: React.FunctionComponent<InterfaceProps> = (props) => {
    const {geofence, vehicles} = props;

    return (
        <div style={styles.container}>
            <ListItem
                key={geofence.id}
                button={true}
                style={styles.listItem}
            >
                <div style={{marginRight: 20}}>
                    {geofence.name}
                    {<br/>}
                    <b>Vehicles: </b>
                    {<br/>}
                    {`${!!vehicles ? vehicles.map(v => v.getFormattedName()).join(', ') : 'none'}`}
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
                                    <PropertiesGeofenceForm geofence={geofence} closeModal={close} updateGeofences={props.updateGeofences}/>
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
