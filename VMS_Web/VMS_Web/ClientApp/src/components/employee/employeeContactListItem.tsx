import * as React from "react";
import Employee from "../../models/employee";
import {ListItem} from "@material-ui/core";
import {StylesDictionary} from "../utils/stylesDictionary";

interface InterfaceProps {
    employee: Employee;
    closeModal: () => void;
    selectContact: (Employee) => void;
}

export const EmployeeContactListItem: React.FunctionComponent<InterfaceProps> = (props) => {
    const {employee} = props;

    const selectContact = () => {
        props.selectContact(employee);
        props.closeModal();
    }

    return (
        <div style={styles.container}>
            <ListItem
                key={employee.id}
                button={true}
                onClick={selectContact}
                style={styles.listItem}
            >
                {employee.getFullName()}
            </ListItem>
        </div>
    );
}

const styles: StylesDictionary  = {
    container: {
        display: 'flex',
        flexDirection: 'column'
    },
    listItem: {
        height: 50,
        flex: 1
    }
};
