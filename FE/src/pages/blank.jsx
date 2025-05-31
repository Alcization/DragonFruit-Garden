import React from "react";
import { Outlet } from 'react-router-dom';

const Blank = () => {
    return (
        <div style={{ margin: '0', padding: '0'}}>
            <style jsx="true">{`
                body {
                    margin: 0px;
                    padding: 0px;
                }
                body, html {
                    overflow-x: hidden;
                    width: 100%;
                }
            `}</style>
            <Outlet />
        </div>
    );
};

export default Blank;