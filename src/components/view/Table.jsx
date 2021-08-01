import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import AddModal from "../../components/modals/addCandidateModal";
import { updateList } from "../../redux/dashboard/Action";
import moment from "moment";
import DetailsModal from "../modals/detailsModel";

const Table = (props) => {
    const [stageHash, setStageHash] = useState({});
    const [addModal, setAddModal] = useState(false);
    const [detailsModalStatus, setDetailsModalStatus] = useState(false);
    const [selectedView, setselectedView] = useState({});

    useEffect(() => {
        let _stages = props.stages;
        let hash = {};
        for (let i = 0; i < _stages.length; i++) {
            hash[_stages[i].id] = _stages[i].value;
        }
        setStageHash(hash);
    }, []);

    const handleOpen = (value) => {
        setDetailsModalStatus(true);
        setselectedView(value);
    };

    return (
        <>
            <div className="table-container table-custom">
                <table className="table">
                    <tr>
                        <th>Candidates</th>
                        <th>Stages</th>
                        <th>Company</th>
                        <th>Applied On</th>
                        <th className="text-right">
                            <span className="c-pointer" onClick={() => setAddModal(true)}>
                                <span className="plus">+</span> Add Cadidate
                            </span>
                        </th>
                    </tr>
                    {props.viewList.map((item, index) => {
                        return (
                            <tr
                                className="candidate-list-item"
                                onClick={() => {
                                    handleOpen(item);
                                }}
                            >
                                <td>
                                    <div className="d-flex">
                                        <div className="inline-block">
                                            <img
                                                alt="avatar"
                                                className="item-avatar"
                                                src={item.avatar}
                                            />
                                        </div>
                                        <div>
                                            <div className="item-title">{item.name}</div>
                                            <div>
                                                <span className="item-role">{item.role}</span>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>{stageHash[item.stage]}</td>
                                <td>{item.company}</td>
                                <td>{moment(item.createdAt).format("ddd DD, YYYY")}</td>
                                <td></td>
                            </tr>
                        );
                    })}
                </table>
            </div>
            <DetailsModal
                item={selectedView}
                onClose={() => setDetailsModalStatus(false)}
                show={detailsModalStatus}
            />
            <AddModal
                onClose={() => {
                    setAddModal(false);
                }}
                show={addModal}
            />
        </>
    );
};

const mapStateToProps = (state) => ({
    stages: state.dashboard.stages,
    viewList: state.dashboard.viewList,
    list: state.dashboard.list,
    forceUpdate: state.dashboard.forceUpdate
});

const mapDispatchToProps = (dispatch) => ({
    updateList: (payload) => dispatch(updateList(payload))
});

export default compose(connect(mapStateToProps, mapDispatchToProps))(Table);
