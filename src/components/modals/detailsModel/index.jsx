import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { updateList } from "../../../redux/dashboard/Action";
import { connect } from "react-redux";
import { compose } from "redux";
import moment from "moment";
import $ from "jquery";

const DetailsModel = ({ show, onClose, item, updateList, list }) => {
    const [comment, setComment] = useState('');

    const handleClick = () => {
        var card = $(".mc-btn-action").parent('.material-card');
        var icon = $(".mc-btn-action").children('i');
        icon.addClass('fa-spin-fast');
        if (card.hasClass('mc-active')) {
            card.removeClass('mc-active');
            setTimeout(function () {
                icon
                    .removeClass('fa-arrow-left')
                    .removeClass('fa-spin-fast')
                    .addClass('fa-bars');

            }, 800);
        } else {
            card.addClass('mc-active');
            setTimeout(function () {
                icon
                    .removeClass('fa-bars')
                    .removeClass('fa-spin-fast')
                    .addClass('fa-arrow-left');

            }, 800);
        }
    }

    const submitComment = () => {
        let _list = list;
        for (let i = 0; i < list.length; i++) {
            if (_list[i].id === item.id) {
                if (comment) _list[i].comments?.unshift(comment);
            }
        }
        setComment('');
        updateList(_list);
    }

    const onUploadResume = (resume) => {
        if (resume.target.files[0]) {
            if (resume.target.files[0].name.includes("pdf")) {
                let pdf = URL.createObjectURL(resume.target.files[0]);
                let _list = list;
                for (let i = 0; i < list.length; i++) {
                    if (_list[i].id === item.id) {
                        _list[i].resume = pdf;
                    }
                }
                updateList(_list);
            } else {
                return false;
            }
        }
    };

    return (
        <Modal
            isOpen={show}
            onRequestClose={onClose}
            className={"modalContainer"}
            overlayClassName={"overlay"}
        >
            <div className={"close-btn-ctn"}>
                <div style={{ flex: "1 90%" }}>
                </div>
                <button className="close-btn" onClick={onClose}>
                    <i className="fa fa-times"></i>
                </button>
            </div>
            <div>
                <section className="container">
                    <div className="row active-with-click">
                        <div>
                            <article className={`material-card Light-Blue`}>
                                <h2>
                                    <span>{item.name}</span>
                                    <strong>
                                        {item.role}
                                    </strong>
                                </h2>
                                <div className="mc-content">
                                    <div className="img-container">
                                        <img alt="avatar" className="img-responsive" src={item.avatar} />
                                    </div>
                                    <div className="mc-description">
                                        <div className="row mt-3">
                                            <div>
                                                <div className="input-group">
                                                    <div className="col-half">
                                                        <input
                                                            type="text"
                                                            placeholder="Company*"
                                                            value={item.company}
                                                        />
                                                    </div>
                                                    <div className="col-half">
                                                        <label className="c-pointer w-100">
                                                            <input
                                                                type="file"
                                                                style={{ display: "none" }}
                                                                onChange={onUploadResume}
                                                                className="btn btn-primary"
                                                            />

                                                            <div className="resume-btn">
                                                                Resume
                                                                <span className="f-right">
                                                                    {item.resume ? (
                                                                        <i className="fa fa-check"></i>
                                                                    ) : (
                                                                        <i className="fa fa-upload"></i>
                                                                    )}
                                                                </span>
                                                            </div>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <div class="comment-container">
                                                <input placeholder="Add Note" value={comment} onChange={e => setComment(e.target.value)} onKeyPress={event => {
                                                    if (event.key === 'Enter') {
                                                        submitComment()
                                                    }
                                                }} />
                                                <i class="fa fa-check fa-md icon" onClick={() => submitComment()}></i>
                                            </div>
                                            <div class="comment-list">
                                                {item?.comments?.map((value, index) => {
                                                    return <div key={index}
                                                        className="comment-item"
                                                    >
                                                        {value}
                                                    </div>
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <span className="mc-btn-action" onClick={() => { handleClick() }}>
                                    <i className="fa fa-bars"></i>
                                </span>
                                <div className="mc-footer">
                                    <h4 className="w-100">
                                        Social
                                        <span className="f-right">{moment(item.createdAt).format('ddd DD, YYYY')}</span>
                                    </h4>
                                    <i className="fa fa-fw fa-facebook"></i>
                                    <i className="fa fa-fw fa-twitter"></i>
                                    <i className="fa fa-fw fa-linkedin"></i>
                                    <i className="fa fa-fw fa-google-plus"></i>
                                </div>
                            </article>
                        </div>

                    </div>
                </section>
            </div>
        </Modal>
    );
};

const mapStateToProps = (state) => ({
    list: state.dashboard.list
});

const mapDispatchToProps = (dispatch) => ({
    updateList: (payload) => dispatch(updateList(payload))
});

export default compose(connect(mapStateToProps, mapDispatchToProps))(DetailsModel);