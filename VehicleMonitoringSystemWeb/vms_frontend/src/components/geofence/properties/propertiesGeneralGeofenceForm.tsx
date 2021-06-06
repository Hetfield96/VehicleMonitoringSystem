import * as React from "react";
import {Button, FormControlLabel, IconButton, TextField} from '@material-ui/core';
import {StylesDictionary} from "../../utils/stylesDictionary";
import {useState} from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import * as GeofenceApi from "../../../api/geofenceApi";
import {getDbUserCompanyId} from "../../../utils/userUtil";
import Geofence from "../../../models/geofence";
import Checkbox from '@material-ui/core/Checkbox';
import { GithubPicker } from 'react-color'
import Colors from "../../../constants/colors";

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

    const [displayColorPicker, setDisplayColorPicker] = useState<boolean>(false);
    const [selectedColor, setSelectedColor] = useState<string>(geofence.color ? geofence.color : Colors.geofenceDefault);

    function isSaveButtonDisabled() {
        return name === geofence.name
            && isEnterRestricted === geofence.isEnterRestricted
            && isLeaveRestricted === geofence.isLeaveRestricted
            && selectedColor === geofence.color;
    }

    async function editGeofence() {
        const companyId = await getDbUserCompanyId();
        if (companyId) {
            const newGeofence = new Geofence(geofence.id, companyId, name, geofence.coords, isLeaveRestricted, isEnterRestricted, selectedColor)
            await GeofenceApi.editGeofence(newGeofence);
            props.closeModal();
            props.updateGeofences();
        }
    }

    async function deleteGeofence() {
        await GeofenceApi.deleteGeofence(geofence.id);
        props.closeModal();
        props.updateGeofences();
    }

    const handleColorChange = async ({hex}) => {
        console.log('new color: ' + hex)
        await setSelectedColor(hex);
    }

   const handleColorClick = () => {
        setDisplayColorPicker(!displayColorPicker);
    };

    const handleColorClose = () => {
        setDisplayColorPicker(false);
    };

    return (
        <div style={styles.container}>
            <IconButton style={styles.deleteIcon}>
                <DeleteIcon onClick={deleteGeofence}/>
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


            <div style={styles.colorPickerContainer}>
                <div style={styles.swatch} onClick={handleColorClick}>
                    <div style={{backgroundColor: selectedColor, width: '36px', height: '14px', borderRadius: '2px'}} />
                </div>
                {displayColorPicker ?
                    <div style={styles.popover}>
                        <div style={styles.cover} onClick={handleColorClose}/>
                        <GithubPicker color={selectedColor} onChange={handleColorChange} />
                    </div>
                    : null
                }
            </div>

            <Button
                disabled={isSaveButtonDisabled()}
                onClick={editGeofence}
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
    },
    colorPickerContainer: {
        alignSelf: 'center',
        width: 200,
    },
    swatch: {
        padding: '5px',
        background: '#fff',
        borderRadius: '1px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer',
    },
    popover: {
        position: 'absolute',
        zIndex: 2
    },
    cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
    },
};
