import { Table } from "./Table";

export class Row {
    

    protected table: Table;
    protected model: any;

    constructor({table, model}: Row.ConstructorArgs) {
        this.model = model;
        this.table = table;
    }

    field<T = any>(column: string) {
        return this.model[column] as T;
    }
}

export module Row {
    export interface ConstructorArgs {
        model?: any;
        table: Table;
    }
}