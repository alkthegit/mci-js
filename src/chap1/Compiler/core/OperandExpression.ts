import { Expression } from "./Expression";

export enum Operator {
    Plus = 1,
    Minus = 2,
    Times = 3,
    Div = 4,
}

export class OperandExpression extends Expression {
    constructor(
        public left: Expression,
        public oper: Operator,
        public right: Expression,
    ) {
        super();
    }
}