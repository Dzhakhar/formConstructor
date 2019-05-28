import React from "react";
import {Group} from "./Group";
import {InputTypes} from "./BaseInput";
import {IconedControls} from "../IconedControls";

export class CheckboxGroup extends Group {
	getChildType = () => {
		return InputTypes.CHECKBOX;
	}
}

export const Checkbox = (props) => {
	return <div className="ui field">
		<div className="ui checkbox">
  			<input type="checkbox" tabIndex="0" className="hidden"></input>
  			<label contentEditable={!props.isPreview} onBlur={props.onLabelChanged}>{props.label || "Sample label"}</label>
  			<IconedControls isPreview={props.isPreview} onClick={(e) => props.onDelete()} icon={"remove"}/>
		</div>
	</div>
} 