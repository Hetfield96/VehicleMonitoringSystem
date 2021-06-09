import * as React from "react";
import {withAuthorization} from "../../firebase/withAuthorization";
import {useEffect, useState} from "react";
import {StylesDictionary} from "../../components/utils/stylesDictionary";
import Colors from "../../constants/colors";
import Task from "../../models/task";
import TaskStatus from "../../models/taskStatus";
import * as TaskApi from "../../api/taskApi";
import Board, { moveCard }  from '@lourenci/react-kanban'
import '@lourenci/react-kanban/dist/styles.css'
import {TaskCardItem} from "./taskCardItem";
import Popup from "reactjs-popup";
import {Button} from "@material-ui/core";
import {CreateTaskForm} from "../../components/task/createTaskForm";
import strings from "../../constants/strings";

export const TaskboardComponent : React.FunctionComponent = () => {
    const statuses = TaskStatus.getDefaultStatuses();
    const [tasks, setTasks] = useState<Task[]|null>(null);

    const [board, setBoard] = useState();

    useEffect(() => {
        (async function() {
            await updateTasks();
        })();
    }, []);

    function compareTasksForSort(a: any, b: any): number {
        if (!a.task.id || !b.task.id) {
            return 0;
        }

        if (a.task.id < b.task.id) {
            return -1;
        }
        if (a.task.id > b.task.id) {
            return 1;
        }
        return 0;
    }

    async function updateTasks() {
        const varTasks = await TaskApi.getAllTasks();
        await setTasks(varTasks);
        if (varTasks) {
            await updateBoard(varTasks);
        }
    }

    const updateBoard = async (varTasks: Task[]) => {
        if (statuses && varTasks) {
            const initBoard = {
                columns: statuses.map((s) =>
                    ({
                        id: s.id,
                        title: s.name,
                        cards: varTasks
                            .map((t, index) => ({id: index, task: t}))
                            .filter(t => t.task.statusId === s.id)
                            .sort((a, b) => compareTasksForSort(a, b))
                    }))
            };
            await setBoard(initBoard);
        }
    }

    const handleCardMove = async (card, source, destination) => {
        const updatedBoard = moveCard(board, source, destination);
        await setBoard(updatedBoard);

        if (tasks) {
            const task = tasks[card.id];
            task.statusId = destination.toColumnId;
            await TaskApi.editTask(task);
        }
    }

    return (
        <div style={styles.container}>

            <Popup
                trigger={
                    <Button variant="contained" color='primary' style={styles.addButton} disabled={!board}>
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

            {board &&
                <Board
                    onCardDragEnd={handleCardMove}
                    disableColumnDrag={true}
                    renderCard={( content) => (
                        <TaskCardItem task={tasks && tasks[content.id]} updateTasks={updateTasks}/>
                    )}
                >
                    {board}
                </Board>
            }
        </div>
    );
}


const styles: StylesDictionary  = {
    container: {
        display: 'flex',
        flex: 1,
        marginLeft: 20,
        height: '100vh',
        flexDirection: 'column',
        backgroundColor: Colors.background,
    },
    addButton: {
        width: 200,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10
    }
};


const authCondition = (authUser: any) => !!authUser;
export const TaskboardScreen = withAuthorization(authCondition)(TaskboardComponent);
