import * as React from "react";
import {useEffect, useState} from "react";
import {Button, List} from "@material-ui/core";
import {StylesDictionary} from "../utils/stylesDictionary";
import * as TaskApi from "../../api/taskApi";
import Colors from "../../constants/colors";
import Popup from "reactjs-popup";
import "../../styles/sidebarDrivers.scss";
import "../../styles/collapsible.scss";
import {CreateTaskForm} from "./createTaskForm";
import Task from "../../models/task";
import {TaskListItem} from "./taskListItem";
import Collapsible from 'react-collapsible';
import TaskStatus from "../../models/taskStatus";
import SearchBar from "material-ui-search-bar";
import strings from "../../constants/strings";

export const SidebarTasks: React.FunctionComponent = () => {
    const statuses = TaskStatus.getDefaultStatuses();
    const [tasks, setTasks] = useState<Task[]|null>(null);
    const [searchText, setSearchText] = useState<string>('');

    useEffect(() => {
        (async function() {
            await updateTasks();
        })();
    }, []);

    async function updateTasks() {
        const resTasks = await TaskApi.getAllTasks();
        await setTasks(resTasks);
    }

    function compareTasksForSort(a: Task, b: Task): number {
        if (!a.id || !b.id) {
            return 0;
        }

        if (a.id < b.id) {
            return -1;
        }
        if (a.id > b.id) {
            return 1;
        }
        return 0;
    }

    return (
        <div style={styles.container}>
            <h2>{strings.tasks}</h2>
            <Popup
                trigger={
                    <Button variant="contained" color='primary' style={styles.addButton}>
                        {strings.createTask}
                    </Button>
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
                            <div className="header">{strings.createTask}</div>
                            <div className="content">
                                <CreateTaskForm updateTasks={updateTasks} closeModal={close}/>
                            </div>
                        </div>
                    )
                }}
            </Popup>

            <SearchBar
                value={searchText}
                placeholder={strings.tasksSearchPlaceholder}
                onChange={(newValue) => setSearchText(newValue.toLowerCase())}
                onCancelSearch={() => setSearchText('')}
                style={styles.searchBar}
            />

            {
                statuses.map(s =>
                    <Collapsible
                        trigger={
                            `${s.name}: 
                            ${tasks 
                            && tasks.filter((task) => task.statusId === s.id
                                && (!searchText
                                    || task.name.toLowerCase().includes(searchText)
                                    || task.id && task.id.toString() === searchText
                                    || (!!task.driver ? task.driver.getFullName().toLowerCase().includes(searchText) : (strings.none).includes(searchText)))
                            ).length || 0}`
                        }
                        key={s.id}>
                        <List style={{backgroundColor: Colors.white}}>
                            {tasks && tasks
                                .filter((task) => task.statusId === s.id
                                    && (!searchText
                                        || task.name.toLowerCase().includes(searchText)
                                        || task.id && task.id.toString() === searchText
                                        || (!!task.driver ? task.driver.getFullName().toLowerCase().includes(searchText) : (strings.none).includes(searchText))
                                    ))
                                .sort((a, b) => compareTasksForSort(a, b))
                                .map((task) => (<TaskListItem key={task.id} updateTasks={updateTasks} task={task}/>))
                            }
                        </List>
                    </Collapsible>)
            }
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
    },
    searchBar: {
        marginBottom: 10
    }
};

