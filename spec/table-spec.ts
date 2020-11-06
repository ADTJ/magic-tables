import { Table } from "../src/Table";

describe("Table", () => {
    it("Should be defined", () => {
        expect(Table).toBeDefined("Table was not defined");
    });

    describe("constructor", () => {
        it("Should have a constructor", () => {
            const table = new Table();
            expect(table).toBeDefined("Table constructor returned no value");
        });

        it("Should accept a name", () => {
            const tableName = "TestTable";
            const table = new Table({ name: tableName });
            expect(table.name).toBe(tableName);
        });

        it("Should default name to empty string", () => {
            const table1 = new Table();
            const table2 = new Table({});
            const table3 = new Table(null);

            for(let table of [table1, table2, table3])
            expect(table.name).toBe("");
        });
    });

    describe("columns", () => {
        const table = new Table({name: "TestTable"});
        
        it("Should have a columns collection", () => {
            expect(table.columns).toBeDefined("No columns collection");
            expect(table.columns).toBeInstanceOf(Array);
        });

        it("Can have a new column added", () => {
            table.columns.add("Foo");
            expect(table.columns.map(col => col.name)).toContain("Foo");
        });
    });

    describe("rows", () => {

        const table = new Table({name: "TestTable"});

        it("Should have a rows collection", () => {
            expect(table.rows).toBeDefined("No rows collection");
            expect(table.rows).toBeInstanceOf(Array);
        });
    });

});