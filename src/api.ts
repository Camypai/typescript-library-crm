import ILookup from "./ilookup";
import service from "./service";
import * as pluralize from 'pluralize'

export default class Api {

    Xrm = (<any>window).Xrm;

    private url = `${window.location.protocol}//${window.location.host}/Pre-Sale/api/data/v8.0/`
    private service = new service(this.url)
    private originalFieldName: string | undefined;

    constructor(url?: string, originalFieldName?: string) {
        this.originalFieldName = originalFieldName;
        if (url) {
            this.url = url;
        }
    }

    public async GetCurrentAccountName(contactId: string, ...selectedFields: string[]): Promise<ILookup> {
        let query = "$expand=parentcustomerid_account($select=name)";

        for (let field in selectedFields){
            query += `${field},`;
        }

        const response = await this.service.retrieve("contacts", contactId, query);

        console.log("Called function api.GetCurrentAccountName:");
        console.dir(response);

        return {
            entityName: 'account',
            id: response.parentcustomerid_account.accountid,
            name: response.parentcustomerid_account.name
        };
    }

    async FindAccounts(search: string): Promise<ILookup[]> {
        const filter = `$select=name&$filter=contains(name, '${search}')`;
        const response = await this.service.retrieveMultiple("accounts", filter);

        console.log("Called function api.FindAccounts:");
        console.dir(response);

        let results: ILookup[] = [];

        for (let i = 0; i < response.value.length; i++){
            let item = response.value[i];
            results.push({
                id: item.accountid,
                entityName: 'account',
                name: item.name
            });
        }

        return results;
    }

    async FindEntities(search: string, entityName: string, selectFieldName: string, filterNames: string[]): Promise<ILookup[]> {
        const entityNamePlural: string = pluralize(entityName);
        let query: string = `$select=${selectFieldName}`;
        let filter: string = "&$filter=";

        if(filterNames.length === 0) {
            throw new Error("Нет полей для фильтрации");
        }

        for (let i = 0; i < filterNames.length; i++) {
            filter += `contains(${filterNames[i]}, '${search}') and `;
        }

        query += filter.replace(/ and $/g, '');
        // const filter = `$select=name&$filter=contains(name, '${search}')`;
        const response = await this.service.retrieveMultiple(entityNamePlural, query);

        console.log("Called function api.FindEntities:");
        console.dir(response);

        let results: ILookup[] = [];

        for (let i = 0; i < response.value.length; i++){
            let item = response.value[i];
            results.push({
                id: item[`${entityName}id`],
                entityName: entityName,
                name: item[selectFieldName]
            });
        }

        console.log("Result");
        console.dir(results);

        return results;
    }


}
