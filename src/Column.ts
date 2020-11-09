import { Row } from "./Row";
import { Table } from "./Table";

export class Column<T = any> {

    readonly name: string;
    readonly table: Table;

    get values() {
        return this.table.rows.map(row => row.field(this.name));
    }

    value(row: number | Row): T {
        if(typeof row === "number")
            row = this.table.rows[row];

        return row.field(this.name);
    }

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