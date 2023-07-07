import { expect } from "chai";
import Lexer from "../src/commander/Lexer"
import Token from "../src/commander/Token"
import { DataBase } from "../src/database/DataBase";
import { Controller } from "../src/controller/Controller";
import { Kits } from "../src/controller/Types";
import Parser from "../src/commander/Parser";

describe("Testin Parser", async () => {
  // TODO как вынести отдельно настройку с БД
  it("#102120230407", async () => {
    const template = {
      'SC-D5-1-K8-10--': { D5: 1, K8: 10, amount: 5 },
      'SC-D5-2-K8-20--': { D5: 2, K8: 20, amount: 5 }
    };
    const db = new DataBase();
    await db.openConnectionToDB();
    const contr = new Controller(db);
    const kits: Kits = await contr.getArrayOfKits();
    const code = "D5=5;";
    const lexer = new Lexer(code);
    lexer.lexAnalisys();
    const parser = new Parser(lexer.tokenList, contr, kits);
    const rootNode = parser.parseCode();
    parser.run(rootNode);
    await db.closeConnectionToDB();
    expect(parser.scope).to.deep.equal(template);
  });
  it("#104420230407", async () => {
    const template = {
      'SC-D5-1-K8-10--': { D5: 1, K8: 10, amount: 5 },
      'SC-D5-2-K8-20--': { D5: 2, K8: 20, amount: 5 }
    };
    const db = new DataBase();
    await db.openConnectionToDB();
    const contr = new Controller(db);
    const kits: Kits = await contr.getArrayOfKits();
    const code = "D5 = 5;";
    const lexer = new Lexer(code);
    lexer.lexAnalisys();
    const parser = new Parser(lexer.tokenList, contr, kits);
    const rootNode = parser.parseCode();
    parser.run(rootNode);
    expect(parser.scope).to.deep.equal(template);
  });
});