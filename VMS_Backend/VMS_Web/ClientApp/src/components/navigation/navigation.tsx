import * as React from "react";
import { useHistory } from "react-router-dom";
import "../../styles/navigation.scss";
import {auth} from "../../firebase";
import Employee from "../../models/employee";
import {
    ACCOUNT,
    CHAT,
    COMPANY_SETTINGS,
    HOME,
    LANDING,
    NOTIFICATIONS,
    REPORTS,
    SIGN_IN,
    TASKBOARD
} from "../../constants/routes";
import {SidebarEmployees} from "../employee/sidebarEmployees";
import {SidebarVehicles} from "../vehicle/sidebarVehicles";
import {SidebarTasks} from "../task/sidebarTasks";
import {isUserAdministrator, isUserOperator} from "../../utils/userUtil";
import {SidebarGeofences} from "../geofence/sidebarGeofences";
import strings from "../../constants/strings";

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
                    <a onClick={homeClick}>{strings.home}</a>
                </li>
                <li>
                    <a onClick={employeesClick}>{strings.employees}</a>
                </li>
                <li>
                    <a onClick={vehiclesClick}>{strings.vehicles}</a>
                </li>
                <li>
                    <a onClick={geofencesClick}>{strings.geofences}</a>
                </li>
                <li>
                    <a onClick={tasksClick}>{strings.tasks}</a>
                </li>
                <li>
                    <a onClick={() => navigateWithoutSidebar(TASKBOARD)}>{strings.taskboard}</a>
                </li>
                <li>
                    <a onClick={() => navigateWithoutSidebar(CHAT)}>{strings.chat}</a>
                </li>
                <li>
                    <a onClick={() => navigateWithoutSidebar(NOTIFICATIONS)}>{strings.notifications}</a>
                </li>
                <li>
                    <a onClick={() => navigateWithoutSidebar(REPORTS)}>{strings.reports}</a>
                </li>
                <li>
                    <a onClick={() => navigateWithoutSidebar(ACCOUNT)}>{strings.account}</a>
                </li>
                <li>
                    <a onClick={signOutClick}>{strings.signOut}</a>
                </li>
            </ul>
        </div>
    );

    const NavigationAuthAdministrator = () => (
        <div className="TopBarNavigation">
            <ul>
                <li>
                    <a onClick={homeClick}>{strings.home}</a>
                </li>
                <li>
                    <a onClick={employeesClick}>{strings.employees}</a>
                </li>
                <li>
                    <a onClick={vehiclesClick}>{strings.vehicles}</a>
                </li>
                <li>
                    <a onClick={geofencesClick}>{strings.geofences}</a>
                </li>
                <li>
                    <a onClick={tasksClick}>{strings.tasks}</a>
                </li>
                <li>
                    <a onClick={() => navigateWithoutSidebar(TASKBOARD)}>{strings.taskboard}</a>
                </li>
                <li>
                    <a onClick={() => navigateWithoutSidebar(CHAT)}>{strings.chat}</a>
                </li>
                <li>
                    <a onClick={() => navigateWithoutSidebar(NOTIFICATIONS)}>{strings.notifications}</a>
                </li>
                <li>
                    <a onClick={() => navigateWithoutSidebar(REPORTS)}>{strings.reports}</a>
                </li>
                <li>
                    <a onClick={() => navigateWithoutSidebar(COMPANY_SETTINGS)}>{strings.companySettings}</a>
                </li>
                <li>
                    <a onClick={() => navigateWithoutSidebar(ACCOUNT)}>{strings.account}</a>
                </li>
                <li>
                    <a onClick={signOutClick}>{strings.signOut}</a>
                </li>
            </ul>
        </div>
    );

    const NavigationNonAuth = () => (
        <div className="TopBarNavigation">
            <ul>
                <li>
                    <a onClick={() => navigateWithoutSidebar(LANDING)}>{strings.landingPage}</a>
                </li>
                <li>
                    <a onClick={() => navigateWithoutSidebar(SIGN_IN)}>{strings.signIn}</a>
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

    function geofencesClick() {
        history.push(HOME);
        props.setSidebarDisplay(true);
        props.setSidebarComponent(<SidebarGeofences/>);
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

