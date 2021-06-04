import {Map, Marker, GoogleApiWrapper, Polyline, Polygon} from 'google-maps-react';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {dateTimeToString, diffFromNowIsLessOrEqual} from "../../utils/dateFunctions";
import * as GeofenceApi from "../../api/geofenceApi";

function MapContainer(props) {
    const [markersData, setMarkersData] = useState(props.markersData);
    const [trajectoryData, setTrajectoryData] = useState(props.trajectoryData);
    const [geofencesData, setGeofencesData] = useState();

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

    const onPolygonEdit = async (a, b, c) => {
        // console.log(`onPolygonEdit: a ${Object.keys(a)}`);
        // console.log(`onPolygonEdit: a.id ${JSON.stringify(a.id)}`);
        // console.log(`onPolygonEdit: c.latLng ${JSON.stringify(c.latLng)}`);
        // console.log(`onPolygonEdit: c.vertex ${JSON.stringify(c.vertex)}`);

        if (a.id && c.vertex && c.latLng) {
            const geofenceDataPolygonIndex = geofencesData.findIndex(item => item.id === a.id);
            // console.log(`onPolygonEdit: geofencesData[${geofenceDataPolygonIndex}].coords[${c.vertex}] ${JSON.stringify(geofencesData[geofenceDataPolygonIndex].coords[c.vertex])}`);
            // console.log(`c.latLng.lat: ${c.latLng.lat()}`);
            // console.log(`c.latLng.lng: ${c.latLng.lng()}`);
            // console.log(`geofencesData[geofenceDataPolygonIndex].coords[c.vertex].lat: ${geofencesData[geofenceDataPolygonIndex].coords[c.vertex].lat}`);
            // console.log(`geofencesData[geofenceDataPolygonIndex].coords[c.vertex].lng: ${geofencesData[geofenceDataPolygonIndex].coords[c.vertex].lng}`);

            if (!geofencesData[geofenceDataPolygonIndex].coords[c.vertex]) {
                geofencesData[geofenceDataPolygonIndex].coords.push(c.latLng);
                await GeofenceApi.editGeofence(geofencesData[geofenceDataPolygonIndex]);
                return;
            }

            if (c.latLng.lat() !== geofencesData[geofenceDataPolygonIndex].coords[c.vertex].lat
            || c.latLng.lng() !== geofencesData[geofenceDataPolygonIndex].coords[c.vertex].lng) {
                geofencesData[geofenceDataPolygonIndex].coords[c.vertex] = c.latLng;
                await GeofenceApi.editGeofence(geofencesData[geofenceDataPolygonIndex]);
                // console.log(`onPolygonEdit: updated geofencesData[${geofenceDataPolygonIndex}].coords[${c.vertex}] ${JSON.stringify(geofencesData[geofenceDataPolygonIndex].coords[c.vertex])}`);
            }
        }
    }

    const drawGeofencesPolygons = () => {
        if (geofencesData && Object.keys(geofencesData).length) {
            let res = new Array(Object.values(geofencesData).length);
            res.push(Object.entries(geofencesData)
                .map(([key, value]) => (
                    <Polygon
                        id={value.id}
                        key={value.id}
                        paths={value.coords}
                        strokeColor="#FF0000"
                        strokeOpacity={0.8}
                        strokeWeight={2}
                        fillColor="#FF0000"
                        fillOpacity={0.35}
                        editable={true}
                        draggable={true}
                        onMouseover={onPolygonEdit}
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
