import React from "react";
import {Group} from "./Group";
import {InputTypes} from "./BaseInput";
import {IconedControls} from "../IconedControls";

export class RadioGroup extends Group {
	getChildType = () => {
		return InputTypes.RADIO;
	}
}

export const Radio = (props) => {
	return <div className="field">
    	<div className="ui radio checkbox">
        <input type="radio" name="fruit" checked="" tabIndex="0" className="hidden"></input>
        <label contentEditable={!props.isPreview} onBlur={props.onLabelChanged}>{props.label || "Sample label"}</label>
        <IconedControls isPreview={props.isPreview} onClick={(e) => props.onDelete()} icon={"remove"}/>
      </div>
    </div>
}