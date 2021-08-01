import React, { useState } from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import { compose } from "redux";
import { updateList } from "../../../redux/dashboard/Action";

const AddModal = ({ show, onClose, updateList, list, stages }) => {
    const [avatar, setavatar] = useState("https://material-cards.s3-eu-west-1.amazonaws.com/thumb-christopher-walken.jpg");
    const [resume, setresume] = useState(null);
    const [details, setDetails] = useState({});
    const [forceUpdate, setForceUpdate] = useState(null);
    const disabled = !(
        details["name"] &&
        details["email"] &&
        details["contact"] &&
        details["company"] &&
        details["role"]
    );

    const onUploadAvatar = (img) => {
        if (img.target.files[0]) {
            if (
                img.target.files[0].name.includes("jpg") ||
                img.target.files[0].name.includes("png") ||
                img.target.files[0].name.includes("jpeg")
            ) {
                let path = URL.createObjectURL(img.target.files[0]);
                setavatar(path);
                handleChange("avatar", path);
            } else {
                return false;
            }
        }
    };

    const onUploadResume = (resume) => {
        if (resume.target.files[0]) {
            if (resume.target.files[0].name.includes("pdf")) {
                let pdf = URL.createObjectURL(resume.target.files[0]);
                setresume(encodeURI(pdf));
                handleChange("resume", pdf);
            } else {
                return false;
            }
        }
    };

    const handleChange = (key, value) => {
        let _details = details;
        _details[key] = value;
        setDetails(_details);
        setForceUpdate(Math.random());
    };

    const submit = () => {
        if (disabled) return;
        let _details = details;
        _details["id"] = Date.now();
        _details["createdAt"] = Date.now();
        _details["status"] = "active";
        _details["stage"] = stages[0].id;
        if (_details["comment"]) _details["comment"] = [_details["comment"]];
        let _list = list;
        _list.push(_details);
        updateList(_list);
        onClose();
    };

    return (
        <Modal
            isOpen={show}
            onRequestClose={onClose}
            className={"addCandidateModal"}
            overlayClassName={"overlay"}
        >
            <div className={"close-btn-ctn"}>
                <div style={{ flex: "1 90%" }}></div>
                <button className="close-btn" onClick={onClose}>
                    <i className="fa fa-times"></i>
                </button>
            </div>

            <div className="container">
                <div className="row">
                    <div className="edit-heading">Personal Details</div>
                    <div className="col-lg-7 col-md-12 col-sm-12">
                        <div className="input-group input-group-icon">
                            <input
                                type="text"
                                placeholder="Full Name*"
                                onChange={(e) => handleChange("name", e.target.value)}
                            />
                            <div className="input-icon">
                                <i className="fa fa-user"></i>
                            </div>
                        </div>
                        <div className="input-group input-group-icon">
                            <input
                                type="email"
                                placeholder="Email Adress*"
                                onChange={(e) => handleChange("email", e.target.value)}
                            />
                            <div className="input-icon">
                                <i className="fa fa-envelope"></i>
                            </div>
                        </div>
                        <div className="input-group input-group-icon">
                            <input
                                type="number"
                                placeholder="Contact*"
                                onChange={(e) => handleChange("contact", e.target.value)}
                            />
                            <div className="input-icon">
                                <i className="fa fa-phone"></i>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5 col-md-12 col-sm-12 text-center">
                        <label className="c-pointer">
                            <input
                                type="file"
                                style={{ display: "none" }}
                                onChange={onUploadAvatar}
                                className="btn btn-primary"
                            />
                            <img
                                alt={"avatar"}
                                className="user-avatar"
                                src={avatar}
                            />
                            <img
                                alt={"edit-logo"}
                                className="avatar-edit"
                                src="https://icons.iconarchive.com/icons/custom-icon-design/silky-line-user/512/user2-edit-icon.png"
                            />
                        </label>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-half">
                        <div className="edit-heading">Professioal Details</div>
                        <div className="input-group">
                            <div className="col-third">
                                <input
                                    type="text"
                                    placeholder="Role*"
                                    onChange={(e) => handleChange("role", e.target.value)}
                                />
                            </div>
                            <div className="col-third">
                                <input
                                    type="text"
                                    placeholder="Company*"
                                    onChange={(e) => handleChange("company", e.target.value)}
                                />
                            </div>
                            <div className="col-third">
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
                                            {resume ? (
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
                    <div className="col-12">
                        <div className="edit-heading">Comment</div>
                        <div className="input-group">
                            <div className="col-12">
                                <textarea
                                    onChange={(e) => handleChange("comment", e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="f-right">
                            <button
                                className="btn btn-success"
                                disabled={disabled}
                                onClick={() => submit()}
                            >
                                Save
                            </button>
                            <button className="btn btn-outline-danger ml-2" onClick={onClose}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

const mapStateToProps = (state) => ({
    stages: state.dashboard.stages,
    list: state.dashboard.list
});

const mapDispatchToProps = (dispatch) => ({
    updateList: (data) => dispatch(updateList(data))
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(AddModal);