import React from "react";
import {Group} from "./Group";
import {InputTypes} from "./BaseInput";
import {IconedControls} from "../IconedControls";

export class SelectGroup extends Group {
	getChildType = () => {
		return InputTypes.OPTION;
	}

	renderBody = () => {
		if(this.props.isPreview) {
			return <select>{this.renderItems()}</select>;
		}

		return <div className="ui middle aligned divided list">
			{this.renderItems()}		  
		</div>
	}
}

export const Option = (props) => {
	if(props.isPreview) {
		return <option value={'props.label'}>{props.label || "Sample"}</option>
	}

	return <div className="item">
	    <div className="content" contentEditable={true} onBlur={props.onLabelChanged}>
	      {props.label || "Sample"}
	    </div>
	    <IconedControls isPreview={false} icon={"remove"} onClick={(e) => props.onDelete()} />
  	</div>
}