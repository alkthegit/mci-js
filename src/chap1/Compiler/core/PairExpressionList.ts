import { Expression } from "./Expression";
import { ExpressionList } from "./ExpressionList";

export class PairExpressionList extends ExpressionList{
    constructor(
        public head: Expression,
        public expList: ExpressionList
    ){
        super();
    }
}