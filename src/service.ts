import axios from 'axios'

export default class service {
    constructor(public url: string) {
    }

    async retrieve(entityName: string, entityId: string, query?: string): Promise<any> {
        // let searchEntity: string = "";
        //
        // if (entityName.endsWith('y')) {
        //     searchEntity = `${entityName.substr(0, entityName.length - 1)}ies`;
        // } else {
        //     searchEntity = `${entityName}s`;
        // }

        const searchUrl = `${this.url.replace(/\/$/, "")}/${entityName}(${entityId.replace('{', '').replace('}', '')})?${query}`;

        const result = await axios.get(searchUrl);

        console.log("Called function service.retrieve:");
        console.dir(result);

        return result.data;
    }

    async retrieveMultiple(entityName: string, query?: string): Promise<any> {
        // let searchEntity: string = "";
        //
        // if (entityName.endsWith('y')) {
        //     searchEntity = `${entityName.substr(0, entityName.length - 1)}ies`;
        // } else {
        //     searchEntity = `${entityName}s`;
        // }

        const searchUrl = `${this.url.replace(/\/$/, "")}/${entityName}?${query}`;

        const result = await axios.get(searchUrl);

        console.log("Called function service.retrieveMultiple:");
        console.dir(result);

        return result.data;
    }
}
