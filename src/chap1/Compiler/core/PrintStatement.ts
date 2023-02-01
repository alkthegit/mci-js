import { ExpressionList } from "./ExpressionList";
import { Statement } from "./Statement";

export class PrintStatement extends Statement {
    constructor(
        public expList: ExpressionList
    ) {
        super();
    }
}