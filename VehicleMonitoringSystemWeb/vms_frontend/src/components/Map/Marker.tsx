import React from 'react';
import Colors from "../../constants/Colors";
import './Marker.css';

export const Marker = (props: any) => {
    const { name } = props;
    return (
        <div className="marker"
             style={{ backgroundColor: Colors.primaryBlue, cursor: 'pointer'}}
        >
            {name}
        </div>
    );
};
