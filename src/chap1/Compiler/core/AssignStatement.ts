import { Expression } from "./Expression";
import { Statement } from "./Statement";

export class AssignStatement extends Statement {
    constructor(
        public id: string,
        public exp: Expression
    ) {
        super();
    }
}