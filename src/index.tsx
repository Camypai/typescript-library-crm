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

export function ShowLookupField(id: string) {
    ReactDOM.render(
        <LookupComponent id={id}/>,
        window.parent.document.getElementById(id)
    )
}

export function ShowSelect(id: string) {
    ReactDOM.render(
        <SelectComponent/>,
        window.parent.document.getElementById(id)
    )
}