import * as React from "react";
import Task from "../../models/task";
import Colors from "../../constants/colors";
import {StylesDictionary} from "../../components/utils/stylesDictionary";
import {IconButton, ListItem, ListItemSecondaryAction, Tooltip} from "@material-ui/core";
import Popup from "reactjs-popup";
import SettingsIcon from "@material-ui/icons/Settings";
import {PropertiesTaskForm} from "../../components/task/properties/propertiesTaskForm";
import strings from "../../constants/strings";

interface InterfaceProps {
    updateTasks: () => void;
    task: Task|null;
}

export const TaskCardItem: React.FunctionComponent<InterfaceProps> = (props) => {
    const { task } = props;

    if (!task) {
        return null;
    }

    return (
        <div style={styles.container}>
            {
                task.dueDate && new Date(task.dueDate) < new Date()
                    ? <Tooltip title={strings.delayed}>
                        <div style={styles.delayedMark}/>
                    </Tooltip>
                    : null
            }
            <ListItem
                key={task.id}
                button={true}
                style={styles.listItem}
            >
                <div>
                    {`${task.id}. ${task.name}`}
                    <br/>
                    <b>{strings.driver}: </b>
                    <br/>
                    {!!task.driver ? task.driver.getFullName() : strings.none}
                </div>
                <Popup
                    trigger={
                        <ListItemSecondaryAction>
                            <IconButton edge="end">
                                <SettingsIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    }
                    modal={true}
                    nested={true}
                >
                    {(close: any) => {

                        return (
                            <div className="modal">
                                <button className="close" onClick={close}>
                                    &times;
                                </button>
                                <div>
                                    <PropertiesTaskForm closeModal={close} updateTasks={props.updateTasks} task={task}/>
                                </div>
                            </div>
                        )
                    }}
                </Popup>

            </ListItem>
        </div>
    );
}

const styles: StylesDictionary  = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 4,
        marginRight: 4,
        marginBottom: 4,
        backgroundColor: Colors.modalBackground,
        width: 300
    },
    listItem: {
        height: 50,
        flex: 1,
    },
    delayedMark: {
        backgroundColor: Colors.red,
        alignSelf: 'flex-end',
        width: 30,
        height: 15
    }
};