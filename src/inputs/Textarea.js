import React from "react";
import {BaseInput} from "./BaseInput";

export class Textarea extends BaseInput {
	renderBody = () => {
		return <textarea></textarea>;
	}
}