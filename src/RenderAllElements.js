import React from "react";

export const RenderAllElements = (props) => {
	const {isPreview, elements, deleteElement, updateNode, addChild} = props;

	return elements.length > 0 && <div className="ui form segment">
      {elements.map((Element, i) => {
        // также передаём ссылку на объект, чтобы для дальнейших манипуляций не проводить поиск данного объекта по store
        return <Element.component key={`${Element.getLabel()}_${i}`} isPreview={isPreview} element={Element} deleteElement={deleteElement} updateNode={updateNode} addChild={addChild} />
      })}
    </div>;
}