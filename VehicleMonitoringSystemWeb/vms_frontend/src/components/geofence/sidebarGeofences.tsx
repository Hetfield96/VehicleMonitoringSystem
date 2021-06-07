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
import Vehicle from "../../models/vehicle";
import * as GeofenceVehicleLinkApi from "../../api/geofenceVehicleLinkApi";
import SearchBar from "material-ui-search-bar";

export const SidebarGeofences: React.FunctionComponent = () => {
    const [geofences, setGeofences] = useState<Geofence[]|null>(null);
    const [geofenceVehicles, setGeofenceVehicles] = useState<Map<number, Vehicle[]>|null>(null);
    const [searchText, setSearchText] = useState<string>('');

    useEffect(() => {
        (async function() {
            await updateGeofences();
        })();
    }, []);


    const updateGeofences = async () => {
        await setGeofences(await GeofencesApi.getAllCompanyGeofences());
        await setGeofenceVehicles(await GeofenceVehicleLinkApi.getCurrentGeofenceVehiclesMap());

    }

    const createGeofence = async () => {
        const companyId = await getDbUserCompanyId();
        if (companyId) {
            const newGeofence = new Geofence(undefined, companyId, "New Geofence", [
                    new GeoCoordinate(56.0, 37.8),
                    new GeoCoordinate(56.1, 37.8),
                    new GeoCoordinate(56.1, 37.9),
                    new GeoCoordinate(56.0, 37.9),
                    new GeoCoordinate(56.0, 37.8),
                ],
                0, Colors.geofenceDefault);
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

            <SearchBar
                value={searchText}
                placeholder='Geofence or vehicle name'
                onChange={(newValue) => setSearchText(newValue.toLowerCase())}
                onCancelSearch={() => setSearchText('')}
                style={styles.searchBar}
            />

            <List style={{backgroundColor: Colors.white}}>
                {geofences && geofences
                    .filter((g) =>
                        !searchText
                        || g.name.toLowerCase().includes(searchText)
                        || (geofenceVehicles && g.id && geofenceVehicles.get(g.id)
                        // @ts-ignore
                        ? geofenceVehicles.get(g.id).map(v => v.getFormattedName()).join(', ').toLowerCase().includes(searchText)
                        : 'none'.includes(searchText))
                    )
                    .map((g) => (
                       g.id && <GeofenceListItem
                            key={g.id}
                            geofence={g}
                            vehicles={geofenceVehicles && geofenceVehicles.get(g.id)}
                            updateGeofences={updateGeofences}/>
                    ))}
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
    },
    searchBar: {
        marginBottom: 10
    }
};

