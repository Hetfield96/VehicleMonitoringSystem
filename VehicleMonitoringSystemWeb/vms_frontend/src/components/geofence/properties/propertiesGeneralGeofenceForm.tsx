import * as React from "react";
import {
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    IconButton,
    Radio,
    RadioGroup,
    TextField
} from '@material-ui/core';
import {StylesDictionary} from "../../utils/stylesDictionary";
import {useState} from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import * as GeofenceApi from "../../../api/geofenceApi";
import {getDbUserCompanyId} from "../../../utils/userUtil";
import Geofence from "../../../models/geofence";
import { GithubPicker } from 'react-color'
import Colors from "../../../constants/colors";
import strings from "../../../constants/strings";

interface InterfaceProps {
    geofence: Geofence;
    closeModal: () => void;
    updateGeofences: () => void;
}

export const PropertiesGeneralGeofenceFormName = 'General';

export const PropertiesGeneralGeofenceForm: React.FunctionComponent<InterfaceProps> = (props) => {
    const {geofence} = props;

    const [name, setName] = useState<string>(geofence.name);
    const [displayColorPicker, setDisplayColorPicker] = useState<boolean>(false);
    const [selectedColor, setSelectedColor] = useState<string>(geofence.color ? geofence.color : Colors.geofenceDefault);
    const [selectedRestrictionId, setSelectedRestrictionId] = useState<number>(geofence.restrictionId);


    function isSaveButtonDisabled() {
        return name === geofence.name
            && selectedRestrictionId === geofence.restrictionId
            && selectedColor === geofence.color;
    }

    async function editGeofence() {
        const companyId = await getDbUserCompanyId();
        if (companyId) {
            const newGeofence = new Geofence(geofence.id, companyId, name, geofence.coords, selectedRestrictionId, selectedColor)
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
                placeholder={strings.name}
                label={strings.name}
                style={styles.textInput}
            />

            <FormControl component="fieldset" style={styles.textInput}>
                <FormLabel component="legend">{strings.restrictions}</FormLabel>
                <RadioGroup value={selectedRestrictionId} onChange={(event, value) => setSelectedRestrictionId(+value)}>
                    <FormControlLabel value={0} control={<Radio />} label={strings.none} />
                    <FormControlLabel value={1} control={<Radio />} label={strings.enterRestricted} />
                    <FormControlLabel value={2} control={<Radio />} label={strings.leaveRestricted} />
                </RadioGroup>
            </FormControl>


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
                {strings.save}
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
