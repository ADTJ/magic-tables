import { Column } from "./Column";
import { Table } from "./Table";

export class Row<T = any> {
    readonly table: Table;
    protected model: T;

    constructor({table, model = {}}: Row.ConstructorArgs) {
        this.model = model;
        this.table = table;

        for(let column in table.schema) {
            model[column] = model[column] ?? null;
        }
    }

    field<TField>(column: Column<TField>) : TField;
    field<TField extends keyof T>(column: TField): T[TField];
    field<TField>(column: string | Column<any>): TField;
    field(column: string): any;
    field<TField = any>(column: string | Column) {
        if(column instanceof Column)
            column = column.name;

        return (this.model as any)[column] as TField;
    }

    __updateSchema(schema: any) {
        for(let key in schema) {
            (this.model as any)[key] = (this.model as any)[key] ?? null;
        }

        for(let key of Object.getOwnPropertyNames(this.model).filter(key => !(key in schema))) {
            delete (this.model as any)[key];
        }
    }
    
}

export module Row {
    export interface ConstructorArgs {
        model?: any;
        table: Table;
    }
}