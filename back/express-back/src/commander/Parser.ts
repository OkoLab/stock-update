import { Controller } from "../controller/Controller";
import BinaryOperationNode from "./AST/BinaryOperationNode";
import ExpressionNode from "./AST/ExpressionNode";
import IdentifierNode from "./AST/IdentifierNode";
import NumberNode from "./AST/NumberNode";
import StatementsNode from "./AST/StatementsNode";
import Token from "../commander/Token";
import TokenType, { tokenTypesList } from "./TokenType";

export default class Parser {
    tokens: Token[];
    cursor: number = 0;
    _scope: any = {};
    cont: Controller;

    get scope(){
        return this._scope;
    }

    constructor(tokens: Token[], cont: Controller, scope: any) {
        this.tokens = tokens;
        this.cont = cont;
        this._scope = scope;
    }

    // async init() {
    //     this.cont.init();
    //     this.scope = await this.cont.getArrayOfKits();
    // }

    run(node: ExpressionNode): any {
        //console.log(node);
        if (node instanceof NumberNode) {
            return parseInt(node.number.text);
        }
        if (node instanceof BinaryOperationNode) {
            switch (node.operator.type.name) {
                case tokenTypesList.OPERATOR.name:
                    // берем массив артикулов и удаляем все, которые не подходят под оператора
                    const identifier = this.run(node.leftNode);
                    const quantity = this.run(node.rightNode);
                    this._scope = this.cont.comparison_filter(this._scope, identifier,node.operator.text, quantity);
                    //console.log(this._scope);
                    return;
                case tokenTypesList.LOGICAL.name:
                    this.run(node.leftNode);
                    console.log(this.scope);
                    console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++");
                    this.run(node.rightNode);
                    console.log(this.scope);
                    return;
                case tokenTypesList.ASSIGN.name:
                    const amount = this.run(node.rightNode);
                    // console.log("amount: " + amount);
                    this.run(node.leftNode);
                    for(const item in this._scope){
                        this._scope[item].amount = amount;
                    }
                    return;
            }
        }
        if (node instanceof IdentifierNode) {
            // берем весь массив артикулов и оставляем только те в которых есть данный идентификатор
            this._scope = this.cont.filter(this._scope, node.variable.text);
            return node.variable.text;
        }
        if (node instanceof StatementsNode) {
            node.codeStrings.forEach(codeString => {
                this.run(codeString);
            });
            return;
        }

        // throw new Error("Ошибка");
    }

    parseCode(): ExpressionNode {
        const root = new StatementsNode();
        while (this.cursor < this.tokens.length) {
            const codeStringNode = this.parseExpression();
            this.require(tokenTypesList.SEMICOLON);
            root.addNode(codeStringNode);
        }
        return root;
    }

    parseExpression(): ExpressionNode {
        // if(this.match(tokenTypesList.IDENTIFIER, tokenTypesList.MAINIDENTIFIER) == null) {
        //     return this.parseParentheses();
        // }
        // this.cursor -=1;
        //console.log("leftNode+: ");
        const leftNode = this.parseFormula();

        // let identifierNode = this.parseIdentifierOrNumber();
        const assignOperator = this.require(tokenTypesList.ASSIGN);
        //const rightNode = this.parseFormula();
        const rightNode = this.parseIdentifierOrNumber();
        const binaryNode = new BinaryOperationNode(assignOperator, leftNode, rightNode);
        return binaryNode;
    }

    parseIdentifierOrNumber(): ExpressionNode {
        const number = this.match(tokenTypesList.NUMBER);
        if (number != null) {
            return new NumberNode(number);
        }

        const identifier = this.match(tokenTypesList.IDENTIFIER, tokenTypesList.MAINIDENTIFIER);
        if (identifier != null) {
            return new IdentifierNode(identifier);
        }

        throw new Error(`Ожидаем название модели оборудования или число на позиции ${this.cursor}`);
    }

    parseFormula(): ExpressionNode {
        let leftNode = this.parseParentheses();
        let operator = this.match(tokenTypesList.OPERATOR, tokenTypesList.LOGICAL);
        while(operator != null) {
            const rightNode = this.parseParentheses();
            leftNode = new BinaryOperationNode(operator, leftNode, rightNode);
            operator = this.match(tokenTypesList.OPERATOR, tokenTypesList.LOGICAL);
        }

        return leftNode;
    }

    parseParentheses(): ExpressionNode {
        if (this.match(tokenTypesList.OPENPAR) != null) {
            const node = this.parseFormula();
            this.require(tokenTypesList.CLOSEPAR);
            return node;
        }

        const idenOrNumber = this.parseIdentifierOrNumber();

        return idenOrNumber;

        //throw Error (`Ожидаем формулу или название модели на позиции ${this.cursor}`)
    }

    match(...expected: TokenType[]): Token | null {
        if (this.cursor < this.tokens.length) {
            const currentToken = this.tokens[this.cursor];
            if (expected.find(type => type.name === currentToken.type.name)) {
                this.cursor += 1;
                return currentToken;
            }
        }

        return null;
    }

    require(...expected: TokenType[]): Token {
        const token = this.match(...expected);
        if (!token) {
            throw new Error(`на позиции ${this.cursor} ожидается ${expected[0].name}, а вместо ${this.tokens[this.cursor]}`);
        }
        return token;
    }
}