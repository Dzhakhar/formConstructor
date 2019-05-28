import {InputTypes} from "./inputs/BaseInput";
import {Text} from "./inputs/Text";
import {Textarea} from "./inputs/Textarea";
import {SelectGroup, Option} from "./inputs/SelectGroup";
import {CheckboxGroup, Checkbox} from "./inputs/CheckboxGroup";
import {RadioGroup, Radio} from "./inputs/RadioGroup";
import {File} from "./inputs/File"

function getComponentByElementType(elementType) {
	if (!elementType) {
		return null;
	}

	switch(elementType) {
		case InputTypes.TEXT:
			return Text;
		case InputTypes.TEXTAREA:
			return Textarea;
		case InputTypes.SELECT_GROUP:
			return SelectGroup;
		case InputTypes.CHECKBOX_GROUP:
			return CheckboxGroup;
		case InputTypes.CHECKBOX:
			return Checkbox;
		case InputTypes.RADIO_GROUP:
			return RadioGroup;
		case InputTypes.RADIO:
			return Radio;
		case InputTypes.OPTION:
			return Option;
		case InputTypes.FILE:
			return File;
		default:
			return Text;
	}
}

export class Element {
	constructor(elementType, injectInstance) {
		this.elementType = elementType || injectInstance.elementType;
		const component = getComponentByElementType(this.elementType);
		this.state = {};

		if(component && !injectInstance) {
			this.component = component;
			this.state.label = "Sample label";
			this.state.children = [];
		} else if (injectInstance && injectInstance.elementType) {
			// injectInstance - это взгляд в будущее. Когда мы сохраним JSON репрезентацию элемента на сервере
			// нам завтра придётся рендерить это дело на уже непосредственно внешней части "проекта", и чтобы там мы могли
			// переиспользовать этот же Element класс и эти же компоненты рендеринга - нам нужно как-то инициализоровать объекты 
			// описывающие Element в самом классе Element. 
			// Собственно injectInstance = {
			//     element_type: "radio_group",
			//     component: RadioGroup (его вернет getComponentByElementType(element_type))
			//     state: {
			//	       label: "ios или Андроид?",
			//         children: [
			//		       {component: "radio", element_type: "radio", state: {label: "андроид", children: []}},
			//             {component: "radio", element_type: "radio", state: {label: "ios", children: []}}
			//         ]
			//     }
			// }
			// данный функционал ещё нужно тестировать
			this.component = getComponentByElementType(this.elementType);
			this.state.label = injectInstance.state.label;
			this.state.children = [];
			if(injectInstance.state.children && injectInstance.state.children.length > 0) {
				injectInstance.state.children.forEach((child) => {
					// рекурсивно инициализируем всех чилдов
					this.state.children.push(new Element(null, child));
				});
			}
		}

		this.recomputeHash();
	}

	getElementType = () => {
		return this.elementType;
	}

	refresh() {
		// переписать ссылку на объект, дабы редакс понял что стэйт изменился
		this.recomputeHash();
	}

	setLabel = (label) => {
		this.state.label = label;
	}

	setLabelOnChild = (child, label) => {
		const foundChild = this.state.children.find((item) => item === child);
		if(foundChild && foundChild.state) {
			foundChild.setLabel(label);
		}
	}

	getHash = () => {
		console.log(this);
		return this.hash;
	}

	getLabel = () => {
		return this.state.label;
	}

	getObjectRepresentationOfElement = () => {
		return {
			component: this.getComponent(),
			elementType: this.getElementType(),
			state: {
				label: this.getLabel(),
				children: this.getChildren().map((child) => child.getObjectRepresentationOfElement())
			}
		};
	}

	serialize = () => {
		// get the JSON representation of Element for sending to server
		return JSON.stringify(this.getObjectRepresentationOfElement());
	}

	recomputeHash() {
		this.hash = `${new Date().getTime()}${Math.random()}`;
	}

	getChildren = () => {
		return this.state.children;
	}

	getComponent = () => {
		return this.component;
	}

	addChild = (child) => {
		this.state.children.push(child);
		this.refresh();
	}

	deleteChild = (child) => {
		const {children} = this.state;
		children.splice(children.indexOf(child), 1);
	}
}