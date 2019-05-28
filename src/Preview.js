import React from "react";
import {RenderAllElements} from "./RenderAllElements";

export const Preview = (props) => {
	const {elements} = props;

	return <RenderAllElements elements={elements} isPreview={true} />;
}