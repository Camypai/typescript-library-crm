import React, {ReactNode} from "react";
import {Input, AutoComplete} from 'antd';
import {OptionType, SelectProps} from 'antd/es/select';
import ilookup from "./ilookup";

const {Option} = AutoComplete;

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
    return lookups.some(compareLookup => compareLookup.id === lookup.id);
};

const filterSuggestedLookups = (filterText: string, lookups: ilookup[]): ilookup[] => {
    console.log("filterSuggestedLookups");
    console.dir(filterText);
    console.dir(lookups);
    return filterText
        ? lookups.filter(
            // lookup => lookup.name.toLowerCase().indexOf(filterText.toLowerCase()) === 0 && !listContainsTagList(lookup, lookups),
            lookup => lookup.name.toLowerCase().search(filterText.toLowerCase()) != -1
        )
        : [];
};

interface Props {
    id: string
}

interface States {
    data: ilookup[];
    foundOptions: ilookup[];
    selectedOption: ilookup;
    options: any,
}

export class LookupComponent extends React.Component<Props, States> {
    constructor(props: Props) {
        super(props);

        this.state = {
            data: options,
            foundOptions: [],
            selectedOption: null,
            options: []
        }
    }


    search = (value: string) => {
        return filterSuggestedLookups(value, this.state.data).map(item => {
            return {
                value: item.name,
                label: (
                    <div
                        key={item.id}
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                    <span>
                        {item.name}
                    </span>
                    </div>
                ),
                children: item
            }
        })
    };


    onSearch = (value: string) => {
        const result = this.search(value);
        this.setState({options: result})

        // const result = this.state.options;
        console.log("onSearch:");
        console.dir(result);
        // this.setState({foundOptions: result});
    }

    onSelect = (value, option) => {
        console.log("onSelect:");
        // console.dir(value);
        console.dir(option);

        this.setState({selectedOption: option.children});
    }

    onChange = (value) => {
        console.log("onChange:");
        console.dir(value);
    }

    render() {
        return (
            <AutoComplete
                style={{width: 300}}
                onSearch={this.onSearch}
                onSelect={this.onSelect}
                onChange={this.onChange}
                options={this.state.options}
                // options={[{}]}
                backfill
                getPopupContainer={() => window.parent.document.getElementById(this.props.id)}
            >
                <Input.Search size="middle" placeholder="Введите числительное" enterButton loading={false} allowClear/>
            </AutoComplete>
        );
    }
}