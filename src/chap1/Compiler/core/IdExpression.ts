import { Expression } from "./Expression";

export class IdExpression extends Expression {
    constructor(
        public id: string
    ) {
        super();
    }
}