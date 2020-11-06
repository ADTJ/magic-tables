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
    });

    describe("methods", () => {

        const table = new Table({name: "test"});
        const row = new Row({table, model: { Foo: "bar"}});
        table.rows.push(row);

        it("Should allow field retrieval", () => {
            let value = row.field<string>("Foo");
            expect(value).toBe("bar");
        });
    });

});