import { Row } from "../src/Row";
import { Table } from "../src/Table";

describe("Integration", () => {
    const table = new Table("MyTable");

    it("Should be able to store a column and row of data and allow me to retrieve it", () => {
        table.columns.add("Foo");
        const row = new Row({table, model: { Foo: "bar" }});
        table.rows.push(row);

        expect(table.rows[0].field("Foo")).toBe("bar");
    });


});