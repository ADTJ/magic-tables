import { Column } from "./Column";
import { ColumnSet } from "./ColumnSet";
import { Row } from "./Row";

/**  Represents a table of data */
export class Table {
    /** The name of the table */
    name: string;
    
    protected _columns: Column[];
    protected _rows: Row[];

    private columnProxy: ColumnSet;

    /** Returns the set of columns in this table's schema */
    get columns() {
        return this.columnProxy;
    }

    /** Returns the set of rows currently in the table */
    get rows() {
        return this._rows;
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

        this.columnProxy = new Proxy(this._columns, new ColumnSet(this._columns, this) as any) as any as ColumnSet;
    }
    
}

export module Table {
    export interface ConstructorArgs {
        /** The name of the table to be created */
        name?: string;
    }
}

