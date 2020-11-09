import { Column } from "./Column";
import { ColumnSet } from "./ColumnSet";
import { Row } from "./Row";
import { RowSet } from "./RowSet";

/**  Represents a table of data */
export class Table<T = any> {
    /** The name of the table */
    name: string;
    
    protected _columns: Column[];
    protected _rows: Row<T>[];

    private columnProxy: ColumnSet<T>;
    private rowProxy: RowSet<T>;

    /** Returns the set of columns in this table's schema */
    get columns() {
        return this.columnProxy;
    }

    /** Returns the set of rows currently in the table */
    get rows() {
        return this.rowProxy;
    }

    get schema() {
        return this.columns.map(col => ({
            name: col.name
        }))
        .reduce((schema, column) => (schema[column.name] = column, schema), {} as { [columnName: string]: { name: string; }});
    }

    updateSchema() {
        let schema = this.schema;
        for(let row of this.rows) {
            row.__updateSchema(schema);
        }
    }

    /** @param name The name of the table to be created */
    constructor(name: string);
    /** @param options (optional) A set of options with which to set up the table */
    constructor(options?: Table.ConstructorArgs);
    constructor(options?: string | Table.ConstructorArgs) {
        if(options == null) 
            options = Object.create(null) as Table.ConstructorArgs;
        else if(typeof options === 'string')
            options = { name: options };
            
        this.construct(options);
    }

    /** Constructor as separate method to support both overloads with default parameters more easily */
    private construct({name = "" } = { } as Table.ConstructorArgs) {
        this.name = name;
        this._columns = [];
        this._rows = [];

        //The "as any as" casts are required because the collection sets are providing the type information and extending/limiting the methods available to the array
        this.columnProxy = new Proxy(this._columns, new ColumnSet(this._columns, this) as any) as any as ColumnSet;
        this.rowProxy = new Proxy(this._rows, new RowSet(this._rows, this) as any) as any as RowSet;
    }
    
}

export module Table {
    export interface ConstructorArgs {
        /** The name of the table to be created */
        name?: string;
    }
}

