import * as React from "react";
import {Button, FormControl} from '@material-ui/core';
import {StylesDictionary} from "../../utils/stylesDictionary";
import Select from 'react-select'
import Vehicle from "../../../models/vehicle";
import {useEffect, useState} from "react";
import * as EmployeeApi from "../../../api/employeeApi";
import Employee from "../../../models/employee";
import * as VehicleDriverLinkApi from "../../../api/vehicleDriverLinkApi";
import chroma from 'chroma-js';
import Colors from "../../../constants/colors";

interface InterfaceProps {
    vehicle: Vehicle;
    closeModal: () => void;
    updateVehicles: () => void;
}

export const PropertiesDriversVehicleFormName = 'Drivers';

export const PropertiesDriversVehicleForm: React.FunctionComponent<InterfaceProps> = (props) => {
    const {vehicle} = props;
    const [driversOptions, setDriversOptions] = useState<Employee[]|null>([]);
    const [selectedDrivers, setSelectedDrivers] = useState<Employee[]|null>([]);

    useEffect(() => {
        (async function() {
            const varDriverOptions = await EmployeeApi.getAllDrivers();
            const currentDrivers = await VehicleDriverLinkApi.getCurrentDrivers(vehicle.id);

            await setSelectedDrivers(currentDrivers);
            await setDriversOptions(varDriverOptions);
        })();
    }, []);

    async function saveDriversLinks() {
        if (!!selectedDrivers && vehicle.id) {
            await VehicleDriverLinkApi.createVehicleDriverLinks(vehicle.id, selectedDrivers.map(d => d.id));

            props.closeModal();
            props.updateVehicles();
        }
    }

    return (
        <div style={styles.container}>
            <FormControl style={styles.formControl}>
                <Select
                    closeMenuOnSelect={false}
                    value={selectedDrivers && selectedDrivers.map((d: Employee) => (
                        {value: d, label: d.getFullName(), color: Colors.primary }
                    ))}
                    onChange={event => setSelectedDrivers(event.map(item => item.value))}
                    isMulti={true}
                    options={driversOptions
                    && driversOptions
                        .filter(dOption => !selectedDrivers || !(selectedDrivers.find(d => d.id === dOption.id)))
                        .map((d: Employee) => ({value: d, label: d.getFullName(), color: Colors.primary }))
                    }
                    styles={selectColorStyles}
                />
            </FormControl>

            <Button onClick={saveDriversLinks} variant='contained' type='submit' color='primary' style={styles.button}>
                Save
            </Button>
        </div>
    );
}

const styles: StylesDictionary  = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 20,
        marginRight: 20
    },
    button: {
        width: 200,
        marginTop: 20,
        alignSelf: 'center'
    },
    formControl: {
        minWidth: 200,
        maxWidth: 300,
        alignSelf: 'center'
    }
};

const selectColorStyles = {
    control: selectStyles => ({ ...selectStyles, backgroundColor: 'white', marginTop: 10, width: 240, alignSelf: 'center' }),
    option: (selectStyles, { data, isDisabled, isFocused, isSelected }) => {
        const color = chroma(data.color);
        return {
            ...selectStyles,
            backgroundColor: isDisabled
                ? null
                : isSelected
                    ? data.color
                    : isFocused
                        ? color.alpha(0.1).css()
                        : null,
            color: isDisabled
                ? '#ccc'
                : isSelected
                    ? chroma.contrast(color, 'white') > 2
                        ? 'white'
                        : 'black'
                    : data.color,
            cursor: isDisabled ? 'not-allowed' : 'default',

            ':active': {
                ...selectStyles[':active'],
                backgroundColor:
                    !isDisabled && (isSelected ? data.color : color.alpha(0.3).css()),
            },
        };
    },
    multiValue: (selectStyles, { data }) => {
        const color = chroma(data.color);
        return {
            ...selectStyles,
            backgroundColor: color.alpha(0.1).css(),
        };
    },
    multiValueLabel: (selectStyles, { data }) => ({
        ...selectStyles,
        color: data.color,
    }),
    multiValueRemove: (selectStyles, { data }) => ({
        ...selectStyles,
        color: data.color,
        ':hover': {
            backgroundColor: data.color,
            color: 'white',
        },
    }),
};
