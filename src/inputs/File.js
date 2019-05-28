import React from "react";
import {BaseInput} from "./BaseInput";

export class File extends BaseInput {
	renderBody = () => {
		return <input type="file"></input>;
	}
}