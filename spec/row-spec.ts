import { Row } from "../src/Row";
import { Table } from "../src/Table";

describe("Row", () => {
    it("Should be defined", () => {
        expect(Row).toBeDefined("Row was not defined");
    });

    const table = new Table({name: "test"});

    describe("constructor", () => {
        it("Should have a constructor", () => {
            const row = new Row({table});
            expect(row).toBeDefined("Row constructor returned no value");
        });

        it("Should accept a model", () => {
            const model = {};
            const row = new Row({ table, model });
        });

        it("Should add any missing fields to the row object", () => {
            let tbl = new Table("Foo");
            tbl.columns.add("abc");
            tbl.columns.add("def");
            let row = new Row({ table: tbl });
            expect(row.field<any>("abc")).toBeDefined();
            expect(row.field<any>("def")).toBeDefined();
        });
    });

    describe("methods", () => {

        const table = new Table({name: "test"});
        const row = table.rows.add({ Foo: "bar"});

        it("Should allow field retrieval", () => {
            let value = row.field<string>("Foo");
            expect(value).toBe("bar");
        });
    });

});