import { Expression } from "./Expression";

export class NumExpression extends Expression {
    constructor(
        public num: number
    ){
        super();
    }
}