import React from 'react';
import './App.css';
import {connect} from "react-redux";
import {setViewTypeAction, createElementAction, addChildAction, updateNodeAction, deleteElementAction, ViewTypes} from "./store";
import {InputTypes} from "./inputs/BaseInput";
import {Edit} from "./Edit";
import {Preview} from "./Preview";
import {JSONView} from "./JSONView";

const allowedElements = [InputTypes.SELECT_GROUP, 
                InputTypes.RADIO_GROUP, 
                InputTypes.CHECKBOX_GROUP, 
                InputTypes.TEXTAREA, 
                InputTypes.TEXT, 
                InputTypes.FILE];

function App({viewType, setViewType, createElement, addChild, updateNode, deleteElement, elements}) {
  return (
    <div style={{margin: "0 auto", maxWidth: "600px"}}>
      <h1>Конструктор форм</h1>
      {elements.length > 0 && <p>p.s. кликайте по тексту на лейблах чтобы его редактировать</p>}

      <div className="ui top attached tabular menu">
        <div onClick={() => setViewType(ViewTypes.CONTROLS)} className={`${viewType === ViewTypes.CONTROLS && "active"} item`}>Edit</div>
        <div onClick={() => setViewType(ViewTypes.PREVIEW)} className={`${viewType === ViewTypes.PREVIEW && "active"} item`}>Preview</div>
        <div onClick={() => setViewType(ViewTypes.JSON)} className={`${viewType === ViewTypes.JSON && "active"} item`}>view JSON</div>
      </div>
      <div className={`ui bottom attached ${viewType === ViewTypes.CONTROLS && "active"} tab segment`}>
        <Edit allowedElements={allowedElements} createElement={createElement} deleteElement={deleteElement} addChild={addChild} updateNode={updateNode} elements={elements}/>
      </div>
      <div className={`ui bottom attached ${viewType === ViewTypes.PREVIEW && "active"} tab segment`}>
        <Preview createElement={createElement} deleteElement={deleteElement} addChild={addChild} updateNode={updateNode} elements={elements} />
      </div>
      <div className={`ui bottom attached ${viewType === ViewTypes.JSON && "active"} tab segment`}>
        <JSONView elements={elements}/>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    viewType: state.viewType,
    elements: state.elements
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setViewType: viewType => dispatch(setViewTypeAction(viewType)),
    createElement: inputType => dispatch(createElementAction(inputType)),
    updateNode: element => dispatch(updateNodeAction(element)),
    addChild: (inputType, parentElement) => dispatch(addChildAction(inputType, parentElement)),
    deleteElement: (element) => dispatch(deleteElementAction(element))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);