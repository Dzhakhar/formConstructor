import { createStore } from 'redux';
import {InputTypes} from "./inputs/BaseInput";
import {Element} from "./Element"

export const ViewTypes = {
	CONTROLS: "controls",
	PREVIEW: "preview",
	JSON: "JSON"
}

// тут начинаются экшны и диспатчеры
const SET_VIEW_TYPE = "SET_VIEW_TYPE";
const CREATE_ELEMENT = "CREATE_INPUT";
const ADD_CHILD = "ADD_CHILD";
const UPDATE_NODE = "UPDATE_NODE";
const DELETE_ELEMENT = "DELETE_ELEMENT";

export const setViewTypeAction = (viewType = ViewTypes.CONTROLS) => {
	return {
		type: SET_VIEW_TYPE,
		payload: viewType
	};
}

export const createElementAction = (inputType = InputTypes.TEXT) => {
	return {
		type: CREATE_ELEMENT,
		payload: inputType
	};
}

export const addChildAction = (inputType, parent) => {
	return {
		type: ADD_CHILD,
		payload: {inputType, parent}
	};
}

export const updateNodeAction = (element) => {
	return {
		type: UPDATE_NODE,
		payload: element
	};
}

export const deleteElementAction = (element) => {
	return {
		type: DELETE_ELEMENT,
		payload: element
	}
}

const defaultState = {
	viewType: ViewTypes.CONTROLS,
	// schema
	// elements: [array of class<Element> instances]
	elements: []
};

function reducer(state = defaultState, action) {
	switch (action.type) {
		case SET_VIEW_TYPE:
			return {
				...state,
				viewType: action.payload
			};
		case CREATE_ELEMENT:
			const newInput = new Element(action.payload);

			state.elements.push(newInput);

			return {
				...state,
				elements: [...state.elements]
			};
		case ADD_CHILD:
			const {inputType, parent} = action.payload;
			const childComponent = new Element(inputType);
			parent.addChild(childComponent);

			return {
				...state,
				elements: [...state.elements]
			};
		case UPDATE_NODE:
			const nodeRef = action.payload;
			const nodeIndex = state.elements.findIndex((element) => element === nodeRef);
			state.elements[nodeIndex] = {...nodeRef};
			return {
				...state,
				elements: [...state.elements]
			};
		case DELETE_ELEMENT:
			return {
				...state,
				elements: [...state.elements].filter((item) => item !== action.payload)
			};
		default:
			return state;
	}
}

export const store = createStore(reducer);