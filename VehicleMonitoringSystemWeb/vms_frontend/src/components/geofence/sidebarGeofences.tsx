import * as React from "react";
import {useEffect, useState} from "react";
import {Button, List} from "@material-ui/core";
import {StylesDictionary} from "../utils/stylesDictionary";
import Colors from "../../constants/colors";
import "../../styles/sidebarDrivers.scss";
import Geofence from "../../models/geofence";
import * as GeofencesApi from "../../api/geofenceApi";
import {GeofenceListItem} from "./geofenceListItem";
import {getDbUserCompanyId} from "../../utils/userUtil";
import GeoCoordinate from "../../models/geoCoordinate";


export const SidebarGeofences: React.FunctionComponent = () => {
    const [geofences, setGeofences] = useState<Geofence[]|null>(null);

    useEffect(() => {
        (async function() {
            await updateGeofences();
        })();
    }, []);


    const updateGeofences = async () => {
        await setGeofences(await GeofencesApi.getAllCompanyGeofences());
    }

    const createGeofence = async () => {
        const companyId = await getDbUserCompanyId();
        if (companyId) {
            const newGeofence = new Geofence(null, companyId, "New Geofence", [
                    new GeoCoordinate(56.0, 37.8),
                    new GeoCoordinate(56.1, 37.8),
                    new GeoCoordinate(56.1, 37.9),
                    new GeoCoordinate(56.0, 37.9),
                    new GeoCoordinate(56.0, 37.8),
                ],
                false, false);
            await GeofencesApi.createGeofence(newGeofence);
            await updateGeofences();
        }
    }

    return (
        <div style={styles.container}>
            <h2>Geofences</h2>

            <div style={styles.flexible}>
                <Button variant="contained" color='primary' style={styles.addButton} onClick={createGeofence}>
                    Create geofence
                </Button>
            </div>

            <List style={{backgroundColor: Colors.white}}>
                {geofences && geofences
                    .map((g) => (<GeofenceListItem key={g.id} geofence={g} updateGeofences={updateGeofences}/>))
                }
            </List>

        </div>
    );
}

const styles: StylesDictionary  = {
    container: {
        display: 'flex',
        flexDirection: 'column'
    },
    addButton: {
        flex: 1,
        marginTop: 10,
        marginBottom: 10,
        textDecorationColor: Colors.white
    },
    flexible: {
        flex: 1,
        display: 'flex'
    }
};

