import * as React from "react";
import {useEffect, useState} from "react";
import Employee from "../../models/employee";
import {Button, List, Tooltip} from "@material-ui/core";
import {StylesDictionary} from "../utils/stylesDictionary";
import * as EmployeeApi from "../../api/employeeApi";
import Colors from "../../constants/colors";
import {EmployeeListItem} from "./employeeListItem";
import Popup from "reactjs-popup";
import {CreateEmployeeForm} from "./createEmployeeForm";
import "../../styles/sidebarDrivers.scss";
import {getDbUser, getRoleRestrictionTooltip, isUserOperator} from "../../utils/userUtil";
import Role from "../../models/role";
import Collapsible from "react-collapsible";
import SearchBar from "material-ui-search-bar";
import strings from "../../constants/strings";


export const SidebarEmployees: React.FunctionComponent = () => {
    const roles = Role.getAllRoles();
    const [dbUser, setDbUser] = useState<Employee|null>();
    const [employees, setEmployees] = useState<Employee[]|null>(null);
    const [searchText, setSearchText] = useState<string>('');

    useEffect(() => {
        (async function() {
            await setDbUser(await getDbUser());
            await updateEmployees();
        })();
    }, []);

    const updateEmployees = async () => {
        await setEmployees(await EmployeeApi.getAllEmployees());
    }

    function compareEmployeesForSort(a: Employee, b: Employee): number {
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
            <h2>{strings.employees}</h2>
            <Popup
                trigger={
                    <div style={styles.flexible}>
                        <Tooltip title={getRoleRestrictionTooltip(dbUser)}>
                            <div style={styles.flexible}>
                                <Button variant="contained" color='primary' style={styles.addButton} disabled={isUserOperator(dbUser)} >
                                    {strings.createEmployee}
                                </Button>
                            </div>
                        </Tooltip>
                    </div>
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
                            <div className="header">{strings.createEmployee}</div>
                            <div className="content">
                                <CreateEmployeeForm closeModal={close}/>
                            </div>
                        </div>
                    )
                }}
            </Popup>

            <SearchBar
                value={searchText}
                placeholder={strings.employeeName}
                onChange={(newValue) => setSearchText(newValue.toLowerCase())}
                onCancelSearch={() => setSearchText('')}
                style={styles.searchBar}
            />

            {
                roles.map(r =>
                    <Collapsible
                        trigger={
                            `${r.name}: 
                            ${employees 
                            && employees.filter((e) => e.roleId === r.id 
                                && (!searchText || e.getFullName().toLowerCase().includes(searchText))).length || 0}`
                        }
                        key={r.id}>
                        <List style={{backgroundColor: Colors.white}}>
                            {employees && employees
                                .filter((e) => e.roleId === r.id && (!searchText || e.getFullName().toLowerCase().includes(searchText)))
                                .sort((a, b) => compareEmployeesForSort(a, b))
                                .map((e) => (<EmployeeListItem key={e.id} employee={e} updateEmployees={updateEmployees}/>))
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
        textDecorationColor: Colors.white
    },
    flexible: {
        flex: 1,
        display: 'flex'
    },
    searchBar: {
        marginBottom: 10
    }
};

