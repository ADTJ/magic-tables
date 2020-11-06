import { Column } from "./Column";
import { Table } from "./Table";

//TODO: Tidy up and add test coverage

export class ColumnSet {
    private static readonly PERMITTED_ARRAY_METHODS = [
        "find" as (keyof ColumnSet),
        "filter" as (keyof ColumnSet),
        "indexOf" as (keyof ColumnSet),
        "includes" as (keyof ColumnSet),
        "map" as (keyof ColumnSet),
        "reduce" as (keyof ColumnSet)
    ] as [
        "find",
        "filter",
        "indexOf",
        "includes",
        "map",
        "reduce"
    ];

    find: (Pick<Array<Column>, "find">)["find"];
    filter: (Pick<Array<Column>, "filter">)["filter"];
    indexOf: (Pick<Array<Column>, "indexOf">)["indexOf"];
    includes: (Pick<Array<Column>, "includes">)["includes"];
    map: (Pick<Array<Column>, "map">)["map"];
    reduce: (Pick<Array<Column>, "reduce">)["reduce"];



    constructor(
        protected columns: Column[],
        protected table: Table
    ) {
    }


    [index: number]: Column;
    length: number;

    add(name: string) {
        let column = new Column({ name, table: this.table });
        this.columns.push(column);

        //TODO: update table schema
        return column;
    }

    contains(column: Column | string) {
        if (typeof column === "string")
            return this.columns.map(col => col.name).includes(column);

        else
            return this.columns.includes(column);

    }

    remove(column: Column | string) {
        column = this.column(column);

        this.columns.splice(this.columns.indexOf(column), 1);

        //TODO: Update table schema
    }

    private column(column: Column | string) {
        return typeof column === "string" ? this.columns.find(col => col.name === column) : column;
    }


    private get(target: Column[], p: string | number | symbol) {
        if (typeof p === "number")
            return target[p];

        if (typeof p === "string" && ColumnSet.PERMITTED_ARRAY_METHODS.includes(p as (typeof ColumnSet.PERMITTED_ARRAY_METHODS)[number])) {
            let value = target[p as any] as any;
            if (typeof value === "function")
                return value.bind(this.columns);

            else
                return value;

        }

        if (ColumnSet.prototype.hasOwnProperty(p)) {
            let value = this[p as keyof ColumnSet];
            if (typeof value === "function")
                return value.bind(this);

            else
                return value;
        }
    }
}
