import React, { Fragment, useState } from "react";
import Modal from "./modals/detailsModel";

const Item = ({ item, moveItem, setDragElement }) => {
    const [show, setShow] = useState(false);
    const onOpen = () => setShow(true);
    const onClose = () => setShow(false);
    
    const onDragStart = ({ dataTransfer, target }) => {
        dataTransfer.setData("item", JSON.stringify(item));
        setDragElement(item);
        setTimeout(function () {
            target.style.visibility = "hidden";
        }, 0);
    };

    const onDragOver = e => {
        moveItem(item.id);
        e.preventDefault();
    };

    const onDragEnd = e => e.target.style.visibility = "visible";

    return (
        <Fragment>
            <div
                className={"item"}
                onClick={onOpen}
                draggable="true"
                onDragStart={onDragStart}
                onDragOver={onDragOver}
                onDragEnd={onDragEnd}
            >
                <div className="d-flex">
                    <div className="inline-block">
                        <img alt="avatar" className="item-avatar" src={item.avatar} />
                    </div>
                    <div>
                        <div className="item-title">{item.name}</div>
                        <div>
                            <span className="item-role" >
                                {item.role}
                            </span>
                        </div>
                    </div>
                </div>

            </div>
            <Modal
                item={item}
                onClose={onClose}
                show={show}
            />
        </Fragment>
    );
};

export default Item;