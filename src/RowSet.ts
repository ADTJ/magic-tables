import { Row } from "./Row";
import { Table } from "./Table";

//TODO: Tidy up and add test coverage

export class RowSet<T = any> implements Pick<ProxyHandler<Row<T>[]>, "get"> {
    private static readonly PERMITTED_ARRAY_METHODS = [
        "find" as (keyof RowSet),
        "filter" as (keyof RowSet),
        "indexOf" as (keyof RowSet),
        "includes" as (keyof RowSet),
        "map" as (keyof RowSet),
        "reduce" as (keyof RowSet)
    ] as [
        "find",
        "filter",
        "indexOf",
        "includes",
        "map",
        "reduce"
    ];

    find: (Pick<Array<Row>, "find">)["find"];
    filter: (Pick<Array<Row>, "filter">)["filter"];
    indexOf: (Pick<Array<Row>, "indexOf">)["indexOf"];
    includes: (Pick<Array<Row>, "includes">)["includes"];
    map: (Pick<Array<Row>, "map">)["map"];
    reduce: (Pick<Array<Row>, "reduce">)["reduce"];



    constructor(
        protected rows: Row<T>[],
        protected table: Table
    ) {
    }

    [Symbol.iterator]: () => Iterator<Row<T>>;
    [index: number]: Row<T>;
    length: number;

    add(model = {} as any) {
        let row = new Row<T>({ model, table: this.table });
        this.rows.push(row);

        //TODO: update table schema
        return row;
    }

    contains(row: Row) {
        return this.rows.includes(row);
    }

    count() {
        return this.rows.length;
    }

    remove(row: Row) {
        this.rows.splice(this.rows.indexOf(row), 1);
    }

    get(target: Row[], p: string | number | symbol) { //Used by proxy
        if (typeof p !== 'symbol') {
            let i = +p;
            if(i == p)
                return target[i];
        }
        else if(p === Symbol.iterator) {
            return target[Symbol.iterator];
        }

        let value: any, object: any;

        if (typeof p === "string" && RowSet.PERMITTED_ARRAY_METHODS.includes(p as (typeof RowSet.PERMITTED_ARRAY_METHODS)[number])) {
            value = target[p as any] as any;
            object = this.rows;
        }
        else if (RowSet.prototype.hasOwnProperty(p)) {
            value = this[p as keyof RowSet];
            object = this;
        }

        if (typeof value === "function") {
            return (...args: any[]) => value.apply(object, args);
        }
        else {
            return value;
        }
    }
}
