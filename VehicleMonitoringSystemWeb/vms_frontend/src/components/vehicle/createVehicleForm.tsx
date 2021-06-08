import * as React from "react";
import * as VehicleApi from "../../api/vehicleApi";
import {Button, TextField} from '@material-ui/core';
import Colors from "../../constants/colors";
import {StylesDictionary} from "../utils/stylesDictionary";
import Vehicle from "../../models/vehicle";
import {useState} from "react";
import strings from "../../constants/strings";

interface InterfaceProps {
  closeModal: () => void;
  updateVehicles: () => void;
}

export const CreateVehicleForm: React.FunctionComponent<InterfaceProps> = (props) => {
    const [error, setError] = useState<any>(null);
    const [name, setName] = useState<string>('');
    const [number, setNumber] = useState<string>('');
    const [model, setModel] = useState<string>('');
    const [productionYear, setProductionYear] = useState<string>('');

    async function onSubmit(event: any) {
        event.preventDefault();
        const vehicle = new Vehicle(name, number, model, +productionYear);
        await VehicleApi.createVehicle(vehicle)

        props.closeModal();
        props.updateVehicles();
    }

    function isCreateButtonDisabled() {
        return number === "" ||
            name === "" ||
            model === "" ||
            productionYear === "";
    }

    return (
      <form onSubmit={(event) => onSubmit(event)} style={styles.container}>
        <TextField
            value={name}
            onChange={event => setName(event.target.value)}
            type="text"
            placeholder={strings.name}
            style={styles.textInput}
        />
        <TextField
            value={number}
            onChange={event => setNumber(event.target.value)}
            type="text"
            placeholder={strings.number}
            style={styles.textInput}
        />
        <TextField
            value={model}
            onChange={event => setModel(event.target.value)}
            type="text"
            placeholder={strings.model}
            style={styles.textInput}
        />
        {/*TODO select form*/}
        <TextField
            value={productionYear}
            onChange={event => setProductionYear(event.target.value)}
            type="number"
            placeholder={strings.productionYear}
            style={styles.textInput}
        />

        <Button disabled={isCreateButtonDisabled()} variant='contained' type='submit' color='primary' style={styles.button}>
            {strings.create}
        </Button>

        {error && <p>{error.message}</p>}
      </form>
    );
}

const styles: StylesDictionary  = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 20,
        marginRight: 20
    },
    textInput: {
        width: 200,
        marginTop: 5,
        marginBottom: 5,
    },
    button: {
        width: 200,
        marginTop: 20
    },
    formControl: {
        minWidth: 120,
        maxWidth: 300
    },
};
