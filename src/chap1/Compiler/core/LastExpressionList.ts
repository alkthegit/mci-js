import { Expression } from "./Expression";
import { ExpressionList } from "./ExpressionList";

export class LastExpressionList extends ExpressionList {
    constructor(
        public head: Expression
    ){
        super();
    }
}