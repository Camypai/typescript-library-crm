import React from "react";
import ReactDOM from 'react-dom'
import {ButtonComponent} from "./ButtonComponent";
import {LookupComponent} from "./LookupComponent";
import {SelectComponent} from "./SelectComponent";

export function ShowButton(id: string) {
    ReactDOM.render(
        <ButtonComponent/>,
        window.parent.document.getElementById(id)
    )
}

export function ShowLookupField(id: string, originalFieldName: string, placeholder: string, entityName: string, selectFieldName: string, filterNames: string[]) {
    ReactDOM.render(
        <LookupComponent
            id={id}
            originalFieldName={originalFieldName}
            placeholder={placeholder}
            entityName={entityName}
            filterNames={filterNames}
            selectFieldName={selectFieldName}
        />,
        window.parent.document.getElementById(id)
    )
}

export function ShowSelect(id: string) {
    ReactDOM.render(
        <SelectComponent/>,
        window.parent.document.getElementById(id)
    )
}