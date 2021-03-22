import * as React from "react";
import {Button, FormControl, FormHelperText, MenuItem, TextField} from '@material-ui/core';
import Colors from "../../constants/Colors";
import {StylesDictionary} from "../../utils/StylesDictionary";
import {useEffect, useState} from "react";
import Task from "../../models/Task";
import * as TaskApi from "../../api/TaskApi";
import {STORAGE_KEY_AUTH_USER} from "../../constants/AsyncStorageKeys";
import Employee from "../../models/Employee";
import * as EmployeeApi from "../../api/EmployeeApi";
import Select from "../../../node_modules/@material-ui/core/Select/Select";
import moment from "moment";

interface InterfaceProps {
  closeModal: () => void;
  updateTasks: () => void;
}

export const CreateTaskForm: React.FunctionComponent<InterfaceProps> = (props) => {
    const [error, setError] = useState<any>(null);
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [comment, setComment] = useState<string>('');
    const [dueDatetime, setDueDatetime] = useState<Date|undefined >();
    const [drivers, setDrivers] = useState<Employee[]|null>(null);
    const [selectedDriver, setSelectedDriver] = useState<string|undefined>('');

    useEffect(() => {
        (async function() {
            // TODO companyId number
            setDrivers(await EmployeeApi.getAllDrivers(1));
        })();
    }, []);

    async function onSubmit(event: any) {
        event.preventDefault();
        const jsonDbUser = localStorage.getItem(STORAGE_KEY_AUTH_USER);
        if (!!jsonDbUser) {
            const dbUser = JSON.parse(jsonDbUser);
            if (!!dbUser) {
                // TODO duedate
                const task = new Task(1, selectedDriver, dbUser.id, undefined,
                    undefined, name, description, undefined, comment);
                await TaskApi.createTask(task)
            }
        }

        await props.updateTasks();
        props.closeModal();
    }

    function isCreateButtonDisabled() {
        return description === "" ||
            name === "" ||
            comment === "";
    }

    return (
      <form onSubmit={(event) => onSubmit(event)} style={styles.container}>
        <TextField
            value={name}
            onChange={event => setName(event.target.value)}
            type="text"
            placeholder="Name"
            style={styles.textInput}
        />
        <TextField
            value={description}
            onChange={event => setDescription(event.target.value)}
            type="text"
            placeholder="Description"
            style={styles.textInput}
        />
        <TextField
            value={comment}
            onChange={event => setComment(event.target.value)}
            type="text"
            placeholder="Comment"
            style={styles.textInput}
        />

        <TextField
            label="Due datetime"
            type="datetime-local"
            style={styles.textInput}
            value={dueDatetime}
            onChange={event => setDueDatetime(moment(event.target.value, 'DD.MM.YY HH:mm').toDate())}
            InputLabelProps={{shrink: true}}
        />

        <FormControl>
            <Select
                color={"primary"}
                value={selectedDriver}
                onChange={event => setSelectedDriver(event.target.value)}
            >
                {drivers && drivers.map((d: Employee) => (
                    <MenuItem key={d.id} value={d.id} style={{color: Colors.white}}>{d.getFullName()}</MenuItem>
                ))}
            </Select>
            <FormHelperText>Driver</FormHelperText>
        </FormControl>

        <Button disabled={isCreateButtonDisabled()} variant='contained' type='submit' color='primary' style={styles.button}>
            Create
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
    buttonText: {
        color: Colors.white,
        alignContent: 'center'
    },
    formControl: {
        minWidth: 120,
        maxWidth: 300
    },
};