import { Table } from "../src/Table";

describe("Table", () => {
    it("Should be defined", () => {
        expect(Table).toBeDefined("Table was not defined");
    });

    it("Should have a constructor", () => {
        const table = new Table();
        expect(table).toBeDefined("Table constructor returned no value");
    });

    it("Should have a name", () => {
        const tableName = "TestTable";
        const table = new Table({ name: tableName });
        expect(table.name).toBe(tableName);
    })
});