import Token from "../Token";
import ExpressionNode from "./ExpressionNode";

export default class IdentifierNode extends ExpressionNode {
    variable: Token;
    
    constructor(variable: Token) {
        super();
        this.variable = variable;
    }
}