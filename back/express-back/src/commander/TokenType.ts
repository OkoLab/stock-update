export default class TokenType {
    name: string;
    regex: string;

    constructor(name: string, regex: string) {
        this.name = name;
        this.regex = regex;
    }
}

export const tokenTypesList = {
    'OPERATOR' : new TokenType('OPERATOR', '(==|<=|=<|>=|=>|<|>|&&|\\||)'),
    'NUMBER': new TokenType('NUMBER', '[0-9]*'),
    'IDENTIFIER': new TokenType('IDENTIFIER', '[a-zA-Z0-9]*'),
    'MAINIDENTIFIER': new TokenType('MAINIDENTIFIER', '\\*'),
    'SEMICOLON': new TokenType('SEMICOLON', ';'),
    'SPACE': new TokenType('SPACE', '[ \\n\\t\\r\\s]'),
    'ASSIGN': new TokenType('ASSIGN', '='),
    'OPENPAR': new TokenType('OPENPAR', '\\('),
    'CLOSEPAR': new TokenType('CLOSEPAR', '\\)'),
}

// {
//     regexp: /^(==|<=|=<|>=|=>|<|>)/,
//     type: TokenType.Operator
// },
// {
//     regexp: /^\(/,
//     type: TokenType.OpenParen
// },
// {
//     regexp: /^\)/,
//     type: TokenType.CloseParen
// },
// {
//     regexp: /^(,;)/,
//     type: TokenType.Separator
// },
// {
//     regexp: /^=/,
//     type: TokenType.Equils
// },