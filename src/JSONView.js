import React from "react";

export const JSONView = ({elements}) => {
	return <div>
		[{elements.length < 1 ? "Добавьте поля ввода" : elements.map((el) => el.serialize())}]
	</div>
}