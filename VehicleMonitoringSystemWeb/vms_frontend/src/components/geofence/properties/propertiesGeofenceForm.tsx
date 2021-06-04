import * as React from "react";
import {StylesDictionary} from "../../utils/stylesDictionary";
import {useState} from "react";
import {PropertiesGeneralGeofenceForm, PropertiesGeneralGeofenceFormName} from "./propertiesGeneralGeofenceForm";
import "../../../styles/navigation.scss";
import Geofence from "../../../models/geofence";

interface InterfaceProps {
  geofence: Geofence;
  closeModal: () => void;
  updateGeofences: () => void;
}

export const PropertiesGeofenceForm: React.FunctionComponent<InterfaceProps> = (props) => {
    const [contentComponentName, setContentComponentName] = useState<string>(PropertiesGeneralGeofenceFormName);

    function renderContent() {
        switch (contentComponentName) {
            case PropertiesGeneralGeofenceFormName:
                return <PropertiesGeneralGeofenceForm geofence={props.geofence} closeModal={props.closeModal} updateGeofences={props.updateGeofences}/>
            default:
                return null;
        }
    }

    return (
        <div style={styles.container}>
            <div className="TopBarNavigation">
                <ul>
                    <li>
                        <a onClick={() => setContentComponentName(PropertiesGeneralGeofenceFormName)}>{PropertiesGeneralGeofenceFormName}</a>
                    </li>
                </ul>
            </div>
            <div style={styles.content}>
                {renderContent()}
            </div>
        </div>
    );
}

const styles: StylesDictionary  = {
    container: {
        flexDirection: 'column',
        width: 400,
        height: 450
    },
    content: {
        flexDirection: 'column'
    },
};