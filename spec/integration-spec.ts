import { Row } from "../src/Row";
import { Table } from "../src/Table";

describe("Integration", () => {
    const table = new Table("MyTable");

    it("Should be able to store a column and row of data and allow me to retrieve it", () => {
        table.columns.add("Foo");
        const row = table.rows.add({ Foo: "bar" });

        expect(table.rows[0].field("Foo")).toBe("bar");
    });

    it("Should have generic type arguments that can model my fields", () => {
        interface User {
            id: number;
            name: string;
        }

        (function() {
            let genericTable = table as Table<User>;
            const assertNumericType: number = genericTable.rows[0].field("id");
            const assertStringType: string = genericTable.rows[0].field("name");

            const assertNumericTypeColumn: number = genericTable.columns.column("id").value(0);
            const assertStringTypeColumn: string = genericTable.columns.column("name").value(0);
        });
        //This function is deliberately not executed, it just serves to enforce compile-time type validity


    });

    it("Should add a column to a row when I add one and remove it once removed", () => {

        let table = new Table("Test");
        table.columns.add("Column1");
        let row = table.rows.add();

        expect(row.field("Column1")).toBeDefined();
        expect(row.field("Column2")).toBeUndefined();

        table.columns.add("Column2");

        expect(row.field("Column2")).toBeDefined();

        table.columns.remove("Column2");

        expect(row.field("Column2")).toBeUndefined();

    });

});