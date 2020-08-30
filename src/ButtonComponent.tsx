import React from "react";
// import 'antd/es/button/style/index.css'
import {Button, Modal} from 'antd'
// import './library.css';

interface Props {

}

interface States {

}

const error = () => {
    Modal.error({
        title: 'Произошла ошибка',
        content: 'Что-то пошло не так',
        getContainer: () => window.parent.document.body
    });
};

export class ButtonComponent extends React.Component<Props, States>{
    constructor(props) {
        super(props);

        this.state = {}

    }

    onClick() {
        error();
    }

    render() {
        return (
            <div>
                <Button type={"primary"} onClick={this.onClick}>Primary button</Button>
            </div>
        )
    }
}