import React from "react";
import {BaseInput} from "./BaseInput";
import {IconedControls} from "../IconedControls";

export class Group extends BaseInput {
	addItem = () => {
		this.props.addChild(this.getChildType(), this.props.element);
	}

	renderItem = (Element, i) => {
		return <Element.component label={Element.getLabel()} isPreview={this.props.isPreview} element={Element} onLabelChanged={(e) => this.onChildLabelChanged(Element, e.target.innerHTML)} onDelete={() => this.deleteChild(Element)} key={`${Element.getLabel()}${i}`}/>;
	}

	renderItems = () => {
		return this.props.element.getChildren().map((element, i) => {
			return this.renderItem(element, i);
		});
	}

	shouldComponentUpdate = (nextProps) => {
		return this.props !== nextProps || nextProps.element.getHash() !== this.props.element.getHash();
	}

	renderBody = () => {
		return <div className="grouped fields">
			{this.renderItems()}
		</div>
	}

	getChildType = () => {
		// to be overriden
		return;
	}

	deleteChild = (item) => {
		this.props.element.deleteChild(item);
		this.update();
	}

	renderHeaderControls = () => {
		return <div>
			<IconedControls isPreview={this.props.isPreview} icon={"plus"} onClick={() => this.addItem()}/>
			<IconedControls isPreview={this.props.isPreview} icon={"trash"} onClick={() => this.deleteElement()}/>
		</div>
	}
}