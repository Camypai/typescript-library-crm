import React from "react";
import {Select} from 'antd';
import ilookup from "./ilookup";

const options: ilookup[] = [
    {
        id: '1',
        entityName: 'entityName',
        name: 'First'
    },
    {
        id: '2',
        entityName: 'entityName',
        name: 'Second'
    },
    {
        id: '3',
        entityName: 'entityName',
        name: 'Third'
    },
    {
        id: '4',
        entityName: 'entityName',
        name: 'Fourth'
    },
    {
        id: '5',
        entityName: 'entityName',
        name: 'Fifth'
    }
];

const listContainsTagList = (lookup: ilookup, lookups?: ilookup[]) => {
    if (!lookups || !lookups.length || lookups.length === 0) {
        return false;
    }
    return lookups.some(compareLookup => compareLookup.name.toLowerCase() === lookup.name.toLowerCase());
};

const filterSuggestedLookups = (filterText: string, lookups: ilookup[]): ilookup[] => {
    return filterText
        ? lookups.filter(
            lookup => lookup.name.toLowerCase().indexOf(filterText.toLowerCase()) === 0 && !listContainsTagList(lookup, lookups),
        )
        : [];
};

interface Props {

}

interface States {
    options: ilookup[];
    foundOptions: ilookup[];
    selectedOptions: ilookup[];
}

export class SelectComponent extends React.Component<Props, States> {
    constructor(props) {
        super(props);

        this.state = {
            options: options,
            foundOptions: [],
            selectedOptions: []
        }
    }


    onSearch = (value: string) => {
        // const result = filterSuggestedLookups(value, this.state.options);
        const result = this.state.options;
        // console.dir(result);
        this.setState({foundOptions: result});
    }

    onSelect = (value, option) => {
        console.log("onSelect:");
        console.dir(value);
        console.dir(option);
    }

    onChange = (value) => {
        console.log("onChange:");
        console.dir(value);
        this.setState({selectedOptions: value});
    }

    render() {
        const selectedItems = this.state.selectedOptions;
        const filteredOptions = this.state.options.filter(o => !selectedItems.includes(o));
        return (
            <Select
                style={{width: 200}}
                mode={"multiple"}
                maxTagCount={1}
                placeholder="Введите числительное"
                onChange={this.onChange}
                value={this.state.selectedOptions}
            >
                {filteredOptions.map(lookup => (
                    <Select.Option value={lookup.name} key={lookup.id}>
                        {lookup.name}
                    </Select.Option>
                ))
                }
            </Select>
        );
    }
}