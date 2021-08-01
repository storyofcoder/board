import React, { Fragment } from "react";
import Homepage from "./pages/Homepage";
import Header from "./components/header";

const Main = () => {
    return (
        <Fragment>
            <Header />
            <Homepage />
        </Fragment>
    );
};

export default Main;