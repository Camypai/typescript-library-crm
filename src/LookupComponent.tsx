import React from "react";
import {Input, AutoComplete} from 'antd';
// import {OptionType, SelectProps} from 'antd/es/select';
import ilookup from "./ilookup";
import Api from './api'

let api: Api;
api = new Api();

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
    id: string;
    originalFieldName: string;

    entityName: string;
    selectFieldName: string;
    filterNames: string[];
    placeholder: string;
}

interface States {
    data: ilookup[];
    foundOptions: ilookup[];
    selectedOption: ilookup;
    options: any;
    defaultValue: string;

    entityName: string;
    selectFieldName: string;
    filterNames: string[];
    placeholder: string;
}

export class LookupComponent extends React.Component<Props, States> {
    constructor(props: Props) {
        super(props);



        this.state = {
            data: [],
            foundOptions: [],
            selectedOption: null,
            options: [],
            defaultValue: this.getDefault(),

            entityName: this.props.entityName,
            selectFieldName: this.props.selectFieldName,
            filterNames: this.props.filterNames,
            placeholder: this.props.placeholder
        }


    }

    getDefault = (): string => {
        let result = '';

        if(api.Xrm == undefined) {
            throw new Error("XRM отсутствует");
        }

        const lookup = api.Xrm.Page.getAttribute(this.props.originalFieldName).getValue();
        console.log("getDefault:");
        console.dir(lookup);
        if(lookup) {
            result = lookup[0].name;
        }

        return result;
    }

    search = async (value: string) => {
        const searchedItems = await api.FindEntities(value, this.state.entityName, this.state.selectFieldName, this.state.filterNames);
        return filterSuggestedLookups(value, searchedItems).map(item => {
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


    onSearch = async (value: string) => {
        const result = await this.search(value);
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

        const lookup = option.children as ilookup;

        this.setState({selectedOption: option.children});
        api.Xrm.Page.getAttribute(this.props.originalFieldName).setValue([{
            id: lookup.id,
            name: lookup.name,
            entityType: lookup.entityName
        }]);
    }

    onChange = (value) => {
        console.log("onChange:");
        console.dir(value);

        if (value === '') {
            this.setState({options: []});
            api.Xrm.Page.getAttribute(this.props.originalFieldName).setValue();
        }
    }

    render() {
        return (
            <AutoComplete
                style={{width: 300}}
                onSearch={this.onSearch}
                onSelect={this.onSelect}
                onChange={this.onChange}
                options={this.state.options}
                defaultValue={this.state.defaultValue}
                // options={[{}]}
                backfill
                getPopupContainer={() => window.parent.document.getElementById(this.props.id)}
            >
                <Input.Search size="middle" placeholder={this.state.placeholder} enterButton loading={false} allowClear/>
            </AutoComplete>
        );
    }
}