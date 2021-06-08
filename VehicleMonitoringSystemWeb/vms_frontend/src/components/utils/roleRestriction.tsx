import * as React from "react";
import {StylesDictionary} from "./stylesDictionary";
import "../../styles/navigation.scss";
import Employee from "../../models/employee";
import {isUserOperator} from "../../utils/userUtil";
import Colors from "../../constants/colors";
import strings from "../../constants/strings";

interface InterfaceProps {
  dbUser: Employee|null|undefined;
}

export const RoleRestriction: React.FunctionComponent<InterfaceProps> = (props) => {
    return (
        <div style={styles.container}>
            {
                isUserOperator(props.dbUser)
                && <div style={styles.textStyle}>{strings.roleRestriction}</div>
            }
        </div>
    );
}

const styles: StylesDictionary  = {
    container: {
        backgroundColor: Colors.red,
        alignSelf: 'center'
    },
    textStyle: {
        color: Colors.white,
        marginLeft: 6,
        marginRight: 6,
    }
};
