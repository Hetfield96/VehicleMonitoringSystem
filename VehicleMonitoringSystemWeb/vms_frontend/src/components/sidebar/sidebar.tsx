import * as React from "react";
import {StylesDictionary} from "../../utils/stylesDictionary";
import Colors from "../../constants/colors";

interface InterfaceProps {
    childComp?: React.ReactNode;
    display?: boolean|undefined;
}

export const Sidebar: React.FunctionComponent<InterfaceProps> = (props) => {
    if (props.display === false) {
        return null;
    }

    return (
        <div style={styles.container}>
            {props.childComp}
        </div>
    );
}

const styles: StylesDictionary  = {
    container: {
        width: 300,
        overflowX: 'hidden',
        overflowY: 'hidden',
        backgroundColor: Colors.white,
        padding: 10
    }
};
