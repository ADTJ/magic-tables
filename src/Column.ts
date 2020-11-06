import { Table } from "./Table";

export class Column {

    name: string;
    table: Table;

    constructor({name, table}: Column.ConstructorArgs) {
        this.name = name;
        this.table = table;
    }
}

export module Column {
    export interface ConstructorArgs {
        name: string;
        table: Table;
    }
}