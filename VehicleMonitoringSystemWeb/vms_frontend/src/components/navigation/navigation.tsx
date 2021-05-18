import * as React from "react";
import { useHistory } from "react-router-dom";
import "../../styles/navigation.scss";
import {auth} from "../../firebase";
import Employee from "../../models/employee";
import {ACCOUNT, CHAT, COMPANY_SETTINGS, HOME, LANDING, REPORTS, SIGN_IN, TASKBOARD} from "../../constants/routes";
import {SidebarEmployees} from "../employee/sidebarEmployees";
import {SidebarVehicles} from "../vehicle/sidebarVehicles";
import {SidebarTasks} from "../task/sidebarTasks";
import {isUserAdministrator, isUserOperator} from "../../utils/userUtil";

interface InterfaceProps {
    dbUser: Employee|null;
    setSidebarDisplay: (display: boolean) => void;
    setSidebarComponent: (comp: React.ReactNode) => void;
}

export const Navigation: React.FunctionComponent<InterfaceProps> = (props) => {
    const history = useHistory();
    const dbUser = props.dbUser;

    const getNavigationByRole = () => {
        if (isUserAdministrator(dbUser)) {
            return (<NavigationAuthAdministrator/>);
        } else if (isUserOperator(dbUser)) {
            return (<NavigationAuthOperator/>);
        }

        return (<NavigationNonAuth/>);
    }

    const NavigationAuthOperator = () => (
        <div className="TopBarNavigation">
            <ul>
                <li>
                    <a onClick={homeClick}>Home</a>
                </li>
                <li>
                    <a onClick={employeesClick}>Employees</a>
                </li>
                <li>
                    <a onClick={vehiclesClick}>Vehicles</a>
                </li>
                <li>
                    <a onClick={tasksClick}>Tasks</a>
                </li>
                <li>
                    <a onClick={() => navigateWithoutSidebar(TASKBOARD)}>Taskboard</a>
                </li>
                <li>
                    <a onClick={() => navigateWithoutSidebar(CHAT)}>Chat</a>
                </li>
                <li>
                    <a onClick={() => navigateWithoutSidebar(REPORTS)}>Reports</a>
                </li>
                <li>
                    <a onClick={() => navigateWithoutSidebar(ACCOUNT)}>Account</a>
                </li>
                <li>
                    <a onClick={signOutClick}>Sign Out</a>
                </li>
            </ul>
        </div>
    );

    const NavigationAuthAdministrator = () => (
        <div className="TopBarNavigation">
            <ul>
                <li>
                    <a onClick={homeClick}>Home</a>
                </li>
                <li>
                    <a onClick={employeesClick}>Employees</a>
                </li>
                <li>
                    <a onClick={vehiclesClick}>Vehicles</a>
                </li>
                <li>
                    <a onClick={tasksClick}>Tasks</a>
                </li>
                <li>
                    <a onClick={() => navigateWithoutSidebar(TASKBOARD)}>Taskboard</a>
                </li>
                <li>
                    <a onClick={() => navigateWithoutSidebar(CHAT)}>Chat</a>
                </li>
                <li>
                    <a onClick={() => navigateWithoutSidebar(REPORTS)}>Reports</a>
                </li>
                <li>
                    <a onClick={() => navigateWithoutSidebar(COMPANY_SETTINGS)}>Company Settings</a>
                </li>
                <li>
                    <a onClick={() => navigateWithoutSidebar(ACCOUNT)}>Account</a>
                </li>
                <li>
                    <a onClick={signOutClick}>Sign Out</a>
                </li>
            </ul>
        </div>
    );

    const NavigationNonAuth = () => (
        <div className="TopBarNavigation">
            <ul>
                <li>
                    <a onClick={() => navigateWithoutSidebar(LANDING)}>Landing</a>
                </li>
                <li>
                    <a onClick={() => navigateWithoutSidebar(SIGN_IN)}>Sign In</a>
                </li>
            </ul>
        </div>
    );

    async function signOutClick() {
        await auth.doSignOut();
        props.setSidebarDisplay(false);
    }

    function homeClick() {
        history.push(HOME);
        props.setSidebarDisplay(false);
    }

    function employeesClick() {
        history.push(HOME);
        props.setSidebarDisplay(true);
        props.setSidebarComponent(<SidebarEmployees/>);
    }

    function vehiclesClick() {
        history.push(HOME);
        props.setSidebarDisplay(true);
        props.setSidebarComponent(<SidebarVehicles/>);
    }

    function tasksClick() {
        history.push(HOME);
        props.setSidebarDisplay(true);
        props.setSidebarComponent(<SidebarTasks/>);
    }

    function navigateWithoutSidebar(pageName: string){
        history.push(pageName);
        props.setSidebarDisplay(false);
    }

    return getNavigationByRole();
}

