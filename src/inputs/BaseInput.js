import React from "react";
import {IconedControls} from "../IconedControls";

export const InputTypes = {
	TEXT: "text",
	TEXTAREA: "textarea",
	FILE: "file",
	RADIO: "radio",
	CHECKBOX: "checkbox",
	OPTION: "option",
	
	GROUP: "group",
	RADIO_GROUP: "radio_group",
	SELECT_GROUP: "select_group",
	CHECKBOX_GROUP: "checkbox_group"
};

export const InputNames = {
	[InputTypes.TEXT]: "Однострочный текст",
	[InputTypes.TEXTAREA]: "Многострочный текст",
	[InputTypes.FILE]: "Файл",

	[InputTypes.RADIO]: "Радио элемент",
	[InputTypes.CHECKBOX]: "Чекбокс элемент",
	[InputTypes.OPTION]: "Опция селекта",
	
	[InputTypes.GROUP]: "", // абстракция
	[InputTypes.RADIO_GROUP]: "Один из списка",
	[InputTypes.SELECT_GROUP]: "Один из выпадающего списка",
	[InputTypes.CHECKBOX_GROUP]: "Мультивыбор из списка"
}

export class BaseInput extends React.PureComponent {
	onLabelChanged = (e) => {
		const label = e.target.innerHTML;
		this.props.element.setLabel(label);
		this.update();
	}

	onChildLabelChanged = (child, label) => {
		this.props.element.setLabelOnChild(child, label);
		this.update();
	}

	update = () => {
		this.props.updateNode(this.props.element);
	}

	renderLabel = () => {
		if(!this.props.element) {
			return null;
		}

		return <label onBlur={(e) => this.onLabelChanged(e)} contentEditable={!this.props.isPreview}>{this.props.element.getLabel() || "Sample label"}</label>;
	}

	renderHeaderControls = () => {
		return <div>
			<IconedControls isPreview={this.props.isPreview} icon={"trash"} onClick={() => this.deleteElement()} />
		</div>
	}

	renderBody = () => {
		// to be overriden
		return null;
	}

	deleteElement = () => {
		this.props.deleteElement(this.props.element);
	}

	render = () => {
		return <div className="ui field">
			{this.renderLabel()}
			{this.renderHeaderControls()}
			{this.renderBody()}
		</div>
	}
}