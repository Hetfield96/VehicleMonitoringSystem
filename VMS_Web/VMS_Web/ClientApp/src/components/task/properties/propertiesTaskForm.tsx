import * as React from "react";
import {StylesDictionary} from "../../utils/stylesDictionary";
import {useState} from "react";
import {PropertiesGeneralTaskForm, PropertiesGeneralTaskFormName} from "./propertiesGeneralTaskForm";
import Task from "../../../models/task";
import "../../../styles/navigation.scss";
import {PropertiesCommentsTaskForm, PropertiesCommentsTaskFormName} from "./propertiesCommentsTaskForm";
import strings from "../../../constants/strings";

interface InterfaceProps {
  closeModal: () => void;
  updateTasks: () => void;
  task: Task;
}

export const PropertiesTaskForm: React.FunctionComponent<InterfaceProps> = (props) => {
    const [contentComponentName, setContentComponentName] = useState<string>(PropertiesGeneralTaskFormName);

    function renderContent() {
        switch (contentComponentName) {
            case PropertiesGeneralTaskFormName:
                return <PropertiesGeneralTaskForm closeModal={props.closeModal} updateTasks={props.updateTasks} task={props.task}/>
            case PropertiesCommentsTaskFormName:
                return <PropertiesCommentsTaskForm closeModal={props.closeModal} task={props.task}/>
            default:
                return null;
        }
    }

    return (
        <div style={styles.container}>
            <div className="TopBarNavigation">
                <ul>
                    <li>
                        <a onClick={() => setContentComponentName(PropertiesGeneralTaskFormName)}>{strings.general}</a>
                    </li>
                    <li>
                        <a onClick={() => setContentComponentName(PropertiesCommentsTaskFormName)}>{strings.comments}</a>
                    </li>
                </ul>
            </div>
            <div style={styles.content}>
                {renderContent()}
            </div>
        </div>
    );
}

const styles: StylesDictionary  = {
    container: {
        flexDirection: 'column',
        width: 500,
        height: 550
    },
    content: {
        flexDirection: 'column'
    },
};
