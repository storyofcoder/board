import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { updateView, handleSearch } from "../../redux/dashboard/Action";

const Header = (props) => {

    const handleChange = (value) => {
        props.handleSearch(value.toLowerCase());
    }

    return (
        <p className="page-header">
            <div className="actions-container">
                <span className="c-pointer">
                    <span>
                        <input type="text" className="search-input" placeholder="Search" onChange={(e) => handleChange(e.target.value)} />
                    </span>
                    {props.listView === 'grid' ?
                        <i class="bi bi-table" onClick={() => { props.updateView('table') }}></i>
                        :
                        <i class="bi bi-grid" onClick={() => { props.updateView('grid') }}></i>
                    }
                </span>
            </div>
        </p>
    );
};

const mapStateToProps = (state) => ({
    listView: state.dashboard.listView
});

const mapDispatchToProps = (dispatch) => ({
    updateView: (payload) => dispatch(updateView(payload)),
    handleSearch: (payload) => dispatch(handleSearch(payload))
});

export default compose(connect(mapStateToProps, mapDispatchToProps))(Header);