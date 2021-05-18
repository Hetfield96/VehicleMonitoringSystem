import * as React from "react";
import Task from "../../models/task";
import Colors from "../../constants/colors";
import {StylesDictionary} from "../../components/utils/stylesDictionary";
import {IconButton, ListItem, ListItemSecondaryAction} from "@material-ui/core";
import Popup from "reactjs-popup";
import SettingsIcon from "@material-ui/icons/Settings";
import {PropertiesTaskForm} from "../../components/task/properties/propertiesTaskForm";

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
            <ListItem
                key={task.id}
                button={true}
                style={styles.listItem}
            >
                <div>
                    {`${task.id}. ${task.name}`}
                    {<br/>}
                    {`Driver: ${!!task.driver ? task.driver.getFullName() : 'none'}`}
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
    }
};
