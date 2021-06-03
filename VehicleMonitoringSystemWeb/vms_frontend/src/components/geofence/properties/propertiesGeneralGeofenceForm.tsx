import * as React from "react";
import {Button, FormControlLabel, IconButton, TextField} from '@material-ui/core';
import {StylesDictionary} from "../../utils/stylesDictionary";
import {useState} from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import * as GeofenceApi from "../../../api/geofenceApi";
import {getDbUserCompanyId} from "../../../utils/userUtil";
import Geofence from "../../../models/geofence";
import Checkbox from '@material-ui/core/Checkbox';

interface InterfaceProps {
    geofence: Geofence;
    closeModal: () => void;
    updateGeofences: () => void;
}

export const PropertiesGeneralGeofenceFormName = 'General';

export const PropertiesGeneralGeofenceForm: React.FunctionComponent<InterfaceProps> = (props) => {
    const {geofence} = props;

    const [name, setName] = useState<string>(geofence.name);
    const [isLeaveRestricted, setIsLeaveRestricted] = useState<boolean>(geofence.isLeaveRestricted);
    const [isEnterRestricted, setIsEnterRestricted] = useState<boolean>(geofence.isEnterRestricted);

    function isSaveButtonDisabled() {
        return name === geofence.name
            && isEnterRestricted === geofence.isEnterRestricted
            && isLeaveRestricted === geofence.isLeaveRestricted;
    }

    async function editEmployee() {
        const companyId = await getDbUserCompanyId();
        if (companyId) {
            const newGeofence = new Geofence(geofence.id, companyId, name, geofence.coords, isLeaveRestricted, isEnterRestricted)
            await GeofenceApi.editGeofence(newGeofence);
            props.closeModal();
            props.updateGeofences();
        }
    }

    async function deleteEmployee() {
        await GeofenceApi.deleteGeofence(geofence.id);
        props.closeModal();
        props.updateGeofences();
    }

    return (
        <div style={styles.container}>
            <IconButton style={styles.deleteIcon}>
                <DeleteIcon onClick={deleteEmployee}/>
            </IconButton>

            <TextField
                value={name}
                onChange={event => setName(event.target.value)}
                type="text"
                placeholder="Name"
                label="Name"
                style={styles.textInput}
            />

            <FormControlLabel
                control={<Checkbox checked={isEnterRestricted}
                                   onChange={event => setIsEnterRestricted(event.target.checked)}
                                   name="isEnterRestricted" />}
                label="Is Enter Restricted"
                style={styles.textInput}
            />

            <FormControlLabel
                control={<Checkbox checked={isLeaveRestricted}
                                   onChange={event => setIsLeaveRestricted(event.target.checked)}
                                   name="isLeaveRestricted" />}
                label="Is Leave Restricted"
                style={styles.textInput}
            />

            <Button
                disabled={isSaveButtonDisabled()}
                onClick={editEmployee}
                variant='contained' type='submit' color='primary' style={styles.button}>
                Save
            </Button>
        </div>
    );
}

const styles: StylesDictionary  = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        margin: 20,
        flex: 1,
    },
    textInput: {
        width: 200,
        marginTop: 5,
        marginBottom: 5,
        alignSelf: 'center'
    },
    select: {
        width: 200,
        marginTop: 5,
        marginBottom: 5,
        alignSelf: 'center'
    },
    button: {
        width: 200,
        marginTop: 20,
        alignSelf: 'center',
    },
    deleteIcon: {
        alignSelf: 'flex-end'
    }
};
