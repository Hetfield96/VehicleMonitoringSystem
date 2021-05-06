import * as React from "react";
import {CompanySettingsForm} from "./companySettingsForm";
import {withAuthorization} from "../../firebase/withAuthorization";
import {useEffect, useState} from "react";
import Employee from "../../models/employee";
import {getDbUser, isUserAdministrator} from "../../utils/userUtil";
import {RoleRestriction} from "../../components/utils/roleRestriction";
import {StylesDictionary} from "../../components/utils/stylesDictionary";

export const CompanySettingsComponent : React.FunctionComponent = () => {
    const [dbUser, setDbUser] = useState<Employee|null>();

    useEffect(() => {
        (async function() {
            await setDbUser(await getDbUser());
        })();
    }, []);

    return (
        <div style={styles.container}>
            <h1>Company Settings</h1>
            {
                isUserAdministrator(dbUser)
                    ? <CompanySettingsForm/>
                    : <RoleRestriction dbUser={dbUser}/>
            }
        </div>
    );
}

const styles: StylesDictionary  = {
    container: {
        marginLeft: 8
    },
};


const authCondition = (authUser: any) => !!authUser;
export const CompanySettings = withAuthorization(authCondition)(CompanySettingsComponent);
