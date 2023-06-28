import { expect } from "chai";
import { DataBase } from "../src/database/DataBase";
import { StandardSku } from "../src/database/entity/StandardSku";

describe("Testing Controller", () => {
   it("#091220232706 Testing", async () => {
      const db = new DataBase();
      await db.connectionToDB();
      const res = await db.find(StandardSku);
      console.log(res);


    //expect(result).to.deep.equal(tokens);
   });
});