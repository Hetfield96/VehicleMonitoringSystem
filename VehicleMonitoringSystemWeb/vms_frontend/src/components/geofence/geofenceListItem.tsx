import * as React from "react";
import {IconButton, ListItem, ListItemSecondaryAction} from "@material-ui/core";
import {StylesDictionary} from "../utils/stylesDictionary";
import SettingsIcon from "@material-ui/icons/Settings";
import Popup from "reactjs-popup";
import Colors from "../../constants/colors";
import Geofence from "../../models/geofence";
import {PropertiesGeofenceForm} from "./properties/propertiesGeofenceForm";

interface InterfaceProps {
    geofence: Geofence;
    updateGeofences: () => void;
}

export const GeofenceListItem: React.FunctionComponent<InterfaceProps> = (props) => {
    const {geofence} = props;

    return (
        <div style={styles.container}>
            <ListItem
                key={geofence.id}
                button={true}
                // onPress={() => this.onLearnMore(driver)}
                style={styles.listItem}
            >
                {geofence.name}

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
