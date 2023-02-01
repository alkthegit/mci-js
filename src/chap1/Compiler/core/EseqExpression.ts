import { Expression } from "./Expression";
import { Statement } from "./Statement";

export class EseqExpression extends Expression {
    constructor(
        public stm: Statement,
        public exp: Expression
    ) {
        super();
    }
}