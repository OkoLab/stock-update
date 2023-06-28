import BinaryOperationNode from "./AST/BinaryOperationNode";
import ExpressionNode from "./AST/ExpressionNode";
import IdentifierNode from "./AST/IdentifierNode";
import NumberNode from "./AST/NumberNode";
import StatementsNode from "./AST/StatementsNode";
import Token from "./Token";
import TokenType, { tokenTypesList } from "./TokenType";

export default class Parser {
    tokens: Token[];
    cursor: number = 0;
    scope: any = {};

    constructor(tokens: Token[]) {
        this.tokens = tokens;
    }

    run(node: ExpressionNode): any {
        if (node instanceof NumberNode) {
            return parseInt(node.number.text);
        }
        if(node instanceof BinaryOperationNode) {
            switch(node.operator.type.name) {
                case tokenTypesList.ASSIGN.name:
                    
            }
        }
        if(node instanceof IdentifierNode) {
            return 
        }
        if(node instanceof StatementsNode) {
            node.codeStrings.forEach(codeString => {
                this.run(codeString);
            });
            return;
        }        
    }

    parseCode():ExpressionNode {
        const root = new StatementsNode();
        while(this.cursor < this.tokens.length) {
            const codeStringNode = this.parseExpression();
            this.require(tokenTypesList.SEMICOLON);
            root.addNode(codeStringNode);
        }

        return root;
    }

    parseExpression(): ExpressionNode {
        if(this.match(tokenTypesList.IDENTIFIER, tokenTypesList.MAINIDENTIFIER) == null) {
            return this.parseParentheses();
        }
        this.cursor -=1  ;
        let identifierNode = this.parseIdentifierOrNumber();
        const assignOperator = this.match(tokenTypesList.ASSIGN);
        if(assignOperator != null) {
            //const rightNode = this.parseFormula();
            const rightNode = this.parseIdentifierOrNumber();
            const binaryNode = new BinaryOperationNode(assignOperator, identifierNode, rightNode);
            return binaryNode;
        }

        throw new Error(`// После переменной ожидается оператор присваивания количества оборудования`);
    }

    parseIdentifierOrNumber(): ExpressionNode {
        const number = this.match(tokenTypesList.NUMBER);
        if (number != null) {
            return new NumberNode(number);
        }

        const identifier = this.match(tokenTypesList.IDENTIFIER, tokenTypesList.MAINIDENTIFIER);
        if (identifier != null ) {
            return new IdentifierNode(identifier);
        }

        throw new Error(`Ожидаем название модели оборудования или число на позиции ${this.cursor}`);
    }

    parseFormula(): ExpressionNode {
        let leftNode =  this.parseParentheses();
        let operator = this.match(tokenTypesList.OPERATOR);
        while (operator != null) {
            const rightNode = this.parseParentheses();
            leftNode = new BinaryOperationNode(operator, leftNode, rightNode);
            operator = this.match(tokenTypesList.OPERATOR);
        }

        return leftNode;
    }

    parseParentheses() : ExpressionNode {
        if (this.match(tokenTypesList.OPENPAR) != null) {
            const node = this.parseFormula();
            this.require(tokenTypesList.CLOSEPAR);
            return node;
        }
        
        return this.parseIdentifierOrNumber();

        //throw Error (`Ожидаем формулу или название модели на позиции ${this.cursor}`)
    }

    match(...expected: TokenType[]): Token | null {
        if(this.cursor < this.tokens.length) {
            const currentToken = this.tokens[this.cursor];
            if(expected.find(type => type.name === currentToken.type.name)) {
                this.cursor++;
                return currentToken;
            }
        }

        return null; 
    }

    require(...expected: TokenType[]): Token {
        const token = this.match(...expected);
        if(!token) {
            throw new Error(`на позиции ${this.cursor} ожидается ${expected[0].name}`);
        }
        return token;
    }
}