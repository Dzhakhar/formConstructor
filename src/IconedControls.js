import React from "react";

export const IconedControls = (props) => {
	const {icon, onClick, isPreview} = props;

	return !isPreview && <i className={`${icon} icon`} onClick={onClick}></i>;
}