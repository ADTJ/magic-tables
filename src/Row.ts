import { Table } from "./Table";

export class Row {

    protected _model: any;

    constructor({table, model}: Row.ConstructorArgs) {
    }
}

export module Row {
    export interface ConstructorArgs {
        model?: any;
        table: Table;
    }
}