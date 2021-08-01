import React, { useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import Col from "../../components/Col";
import Item from "../../components/Item";
import DropWrapper from "../../components/DropWrapper";
import { updateList } from "../../redux/dashboard/Action";
import AddModal from "../../components/modals/addCandidateModal";

const Grid = (props) => {
    const [dragEl, setDragEl] = useState(null);
    const [addModal, setAddModal] = useState(false);

    const onDrop = (item, stage) => {
        if (item.stage === stage) {
            return;
        }
        const _list = props.list
            .filter((i) => i.id !== item.id)
            .concat({ ...item, stage });
        props.updateList(_list);
    };

    const moveItem = (el) => {
        const _list = props.list;
        const itemIndex = _list.findIndex((i) => i.id === dragEl.id);
        const hoverIndex = _list.findIndex((i) => i.id === el);
        const newState = [..._list];
        newState.splice(itemIndex, 1);
        newState.splice(hoverIndex, 0, dragEl);
        props.updateList([...newState]);
    };

    const setDragElement = (el) => setDragEl(el);

    return (
        <>
            {props.stages.map((status, index) => {
                return (
                    <div
                        key={status?.value}
                        className={"col-wrapper"}
                        style={{ width: "auto" }}
                    >
                        <div className={"col-group"}>
                            <h5 className={"col-header"}>{status?.value.toUpperCase()}</h5>
                        </div>
                        <DropWrapper onDrop={onDrop} status={status?.id}>
                            <Col>
                                {props.viewList
                                    .filter((i) => i.stage === status?.id)
                                    .map((i) => (
                                        <Item
                                            key={i.id}
                                            item={i}
                                            moveItem={moveItem}
                                            setDragElement={setDragElement}
                                        />
                                    ))}
                            </Col>
                            {index === 0 && (
                                <div
                                    className="add-candidate"
                                    onClick={() => setAddModal(true)}
                                >
                                    <span className="plus">+</span> Add Cadidate
                                </div>
                            )}
                        </DropWrapper>
                    </div>
                );
            })}
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

export default compose(connect(mapStateToProps, mapDispatchToProps))(Grid);
