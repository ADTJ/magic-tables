export class Table {
    name: string;
    constructor({name} = { } as Table.ConstructorArgs) {
        this.name = name;
    }
    
}

export module Table {
    export interface ConstructorArgs {
        name: string;
    }
}