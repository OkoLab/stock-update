import { expect } from "chai";
import Lexer from "../src/commander/Lexer"
import Token from "../src/commander/Token"

describe("Testin Lexer", () => {
   it("#080620231501 Testing a lexAnalisys function that takes a string and returns tokens from that string", () => {
      const str= "D2=3";
      const tokens:Token[] = [
            {
              type: { name: 'OPENPAR', regex: '\\(' },
              text: '(',
              position: 0
            },
            {
              type: { name: 'IDENTIFIER', regex: '[a-zA-Z0-9]*' },
              text: 'D2',
              position: 1
            },
            {
              type: { name: 'OPERATOR', regex: '(==|<=|=<|>=|=>|<|>|&&|\\||)' },
              text: '==',
              position: 4
            },
            {
              type: { name: 'NUMBER', regex: '[0-9]*' },
              text: '3',
              position: 7
            },
            {
              type: { name: 'CLOSEPAR', regex: '\\)' },
              text: ')',
              position: 8
            },
            {
              type: { name: 'ASSIGN', regex: '=' },
              text: '=',
              position: 9
            },
            {
              type: { name: 'NUMBER', regex: '[0-9]*' },
              text: '5',
              position: 10
            }
      ];

      const code = "(D2 == 3)=5";
      const lexer = new Lexer(code);
      lexer.lexAnalisys();
      
      const result = lexer.tokenList;
      expect(result).to.deep.equal(tokens);
   });
});