import React, { useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { updateList } from "../redux/dashboard/Action";
import GridView from "../components/view/Grid";
import TableView from "../components/view/Table";

const Homepage = (props) => {

    return (
        <div
            className={"row"}
            style={{ margin: "0", marginTop: "100px", flexWrap: "inherit" }}
        >
            {props.listView === 'grid' ?
                <GridView />
                :
                <TableView />
            }

        </div>
    );
};

const mapStateToProps = (state) => ({
    listView: state.dashboard.listView,
    stages: state.dashboard.stages,
    list: state.dashboard.list,
    forceUpdate: state.dashboard.forceUpdate,
});

const mapDispatchToProps = (dispatch) => ({
    updateList: (payload) => dispatch(updateList(payload))
});

export default compose(connect(mapStateToProps, mapDispatchToProps))(Homepage);
