import {Map, Marker, GoogleApiWrapper, Polyline, Polygon} from 'google-maps-react';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {dateTimeToString, diffFromNowIsLessOrEqual} from "../../utils/dateFunctions";
import * as GeofenceApi from "../../api/geofenceApi";

function MapContainer(props) {
    const [markersData, setMarkersData] = useState(props.markersData);
    const [trajectoryData, setTrajectoryData] = useState(props.trajectoryData);
    const [geofencesData, setGeofencesData] = useState();

    // Store Polygon path in state
    // const [path, setPath] = useState([
    //     { lat: 52.52549080781086, lng: 13.398118538856465 },
    //     { lat: 52.48578559055679, lng: 13.36653284549709 },
    //     { lat: 52.48871246221608, lng: 13.44618372440334 }
    // ]);
    //
    // // Define refs for Polygon instance and listeners
    // const polygonRef = useRef(null);
    // const listenersRef = useRef([]);
    //
    // // Call setPath with new edited path
    // const onEdit = useCallback(() => {
    //     if (polygonRef.current) {
    //         const nextPath = polygonRef.current
    //             .getPath()
    //             .getArray()
    //             .map(latLng => {
    //                 return { lat: latLng.lat(), lng: latLng.lng() };
    //             });
    //         setPath(nextPath);
    //     }
    // }, [setPath]);

    // const onLoad = () => {
    //     console.log('onLoad');
    // }
    // Bind refs to current Polygon and listeners
    // const onLoad = useCallback(
    //     polygon => {
    //         polygonRef.current = polygon;
    //         const polygonPath = polygon.getPath();
    //         listenersRef.current.push(
    //             polygonPath.addListener("set_at", onEdit),
    //             polygonPath.addListener("insert_at", onEdit),
    //             polygonPath.addListener("remove_at", onEdit)
    //         );
    //     },
    //     [onEdit]
    // );

    // // Clean up refs
    // const onUnmount = useCallback(() => {
    //     listenersRef.current.forEach(lis => lis.remove());
    //     polygonRef.current = null;
    // }, []);
    //
    // console.log("The path state is", path);

    useEffect(() => {
        (async function() {
            await setMarkersData(props.markersData);
            await setTrajectoryData(props.trajectoryData);
            await setGeofencesData(await GeofenceApi.getAllCompanyGeofences());
        })();
    }, [props.markersData, props.trajectoryData]);

    // TODO defaultMapCenter props
    const defaultProps = {
        center: {
            lat: 56.0,
            lng: 37.8
        },
        zoom: 10
    };

    const drawVehicleMarkers = () => {
        return (markersData &&
            markersData.map((vehicleData) => createVehicleMarker(vehicleData))
        );
    }

    const createVehicleMarker = (vehicleData) => {
        if (!vehicleData) {
            return null;
        }

        const title = vehicleData.vehicle
            ? `${vehicleData.vehicle.name} (${vehicleData.vehicle.number})\n${dateTimeToString(vehicleData.datetime)}`
            : '';

        const iconUrl = diffFromNowIsLessOrEqual(vehicleData.datetime, 'minutes', 30)
            ? '/vehicleOnlineIcon.webp'
            : '/vehicleOfflineIcon.webp';

        return (
            <Marker
                key={vehicleData.id}
                id={vehicleData.id}
                position={{
                    lat: vehicleData.latitude && +vehicleData.latitude,
                    lng: vehicleData.longitude && +vehicleData.longitude
                }}
                name={vehicleData.vehicle && vehicleData.vehicle.name}
                title={title}
                icon={{
                    anchor: new google.maps.Point(30,30),
                    scaledSize: new google.maps.Size(40,40),
                    url: iconUrl
                }}
            />
        );
    }

    const drawTrajectoryPolylines = () => {
        if (trajectoryData && Object.keys(trajectoryData).length) {
            let res = new Array(Object.values(trajectoryData).length);
            res.push(Object.entries(trajectoryData)
                .map(([key, value]) => (
                    <Polyline
                        id={key}
                        key={key}
                        path={value.map(v => ({lat: v.latitude, lng: v.longitude}))}
                        strokeColor="#0000FF"
                        strokeOpacity={0.8}
                        strokeWeight={2}
                        icons={[
                            {
                                icon: { path: google.maps.SymbolPath.BACKWARD_OPEN_ARROW },
                                offset: "0",
                                repeat: "300px"
                            }
                        ]}
                    />
                ))
            );
            return res;
        }

        return null;
    }

    const drawTrajectoryMarkers = () => {
        if (!trajectoryData || !Object.keys(trajectoryData).length) {
            return null;
        }

        // console.log(`drawTrajectoryMarkers: trajectoryData: ${JSON.stringify(trajectoryData)}`);

        const res = new Array(Object.keys(trajectoryData).length);

        for(const key of Object.keys(trajectoryData)) {
            const vehicleData = trajectoryData[key][trajectoryData[key].length - 1];

            const title = vehicleData.vehicle
                ? `Start point: ${vehicleData.vehicle.name} (${vehicleData.vehicle.number})\n${dateTimeToString(vehicleData.datetime)}`
                : '';

            res.push(
                <Marker
                    key={vehicleData.id}
                    id={vehicleData.id}
                    position={{
                        lat: vehicleData.latitude && +vehicleData.latitude,
                        lng: vehicleData.longitude && +vehicleData.longitude
                    }}
                    name={vehicleData.vehicle && vehicleData.vehicle.name}
                    title={title}
                    icon={{
                        anchor: new google.maps.Point(24, 24),
                        scaledSize: new google.maps.Size(30, 30),
                        url: '/trajectoryMarker.webp'
                    }}
                />
            );
        }

        return res;
    }

    const drawGeofencesPolygons = () => {
        if (geofencesData && Object.keys(geofencesData).length) {
            let res = new Array(Object.values(geofencesData).length);
            const bounds = {
                east: -78.443,
                north: 44.599,
                south: 44.49,
                west: -78.649,
            };
            res.push(Object.entries(geofencesData)
                .map(([key, value]) => (
                    <Polygon
                        id={key}
                        key={key}
                        paths={value.coords}
                        strokeColor="#FF0000"
                        strokeOpacity={0.8}
                        strokeWeight={2}
                        fillColor="#FF0000"
                        fillOpacity={0.35}
                        editable={true}
                        draggable={true}
                        // // Event used when manipulating and adding points
                        // onMouseUp={onEdit}
                        // // Event used when dragging the whole Polygon
                        // onDragEnd={onEdit}
                        // onLoad={onLoad}
                        // onUnmount={onUnmount}
                    />
                ))
            );
            return res;
        }

        return null;
    }



    return (
        <Map
            google={props.google}
            zoom={defaultProps.zoom}
            center={defaultProps.center}
        >

            {drawVehicleMarkers()}
            {drawTrajectoryPolylines()}
            {drawTrajectoryMarkers()}
            {drawGeofencesPolygons()}
            {/*<Polygon*/}
            {/*    // Make the Polygon editable / draggable*/}
            {/*    editable*/}
            {/*    draggable*/}
            {/*    path={path}*/}
            {/*    // Event used when manipulating and adding points*/}
            {/*    onMouseUp={onEdit}*/}
            {/*    // Event used when dragging the whole Polygon*/}
            {/*    onDragEnd={onEdit}*/}
            {/*    onLoad={onLoad}*/}
            {/*    onUnmount={onUnmount}*/}
            {/*/>*/}
        </Map>
    );
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(MapContainer)
