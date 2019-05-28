import React from "react";
import {BaseInput} from "./BaseInput";

export class Text extends BaseInput {
	renderBody = () => {
		return <input type="text"></input>;
	}
}