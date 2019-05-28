import React from "react";
import {InputNames} from "./inputs/BaseInput";
import {RenderAllElements} from "./RenderAllElements";

export class Edit extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			selectedElement: null
		};
	}

	setValue = (value) => {
		this.setState({
			selectedElement: value
		});
	}

	createElement = () => {
		if(this.state.selectedElement) {
			this.props.createElement(this.state.selectedElement);
		}
	}

	renderItem = (item, i) => {
		return <option key={`${item}${i}`} value={item}>{InputNames[item]}</option>;
	}

	render() {
		const {allowedElements, elements, addChild, deleteElement, updateNode} = this.props;

		return <div>
			<div className="ui form">
	          <div className="field">
	            <select onChange={(e) => this.setValue(e.target.value)}>
	              <option defaultValue="">Добавить поле</option>
	              {allowedElements.map(this.renderItem)}
	            </select>
	          </div>
	          <div className="field">
	            <button onClick={this.createElement} className={`ui button primary ${!this.state.selectedElement && "disabled"}`}>Добавить поле</button>
	          </div>
	        </div>
	        <RenderAllElements isPreview={false} elements={elements} addChild={addChild} updateNode={updateNode} deleteElement={deleteElement} />
	    </div>
	}
}