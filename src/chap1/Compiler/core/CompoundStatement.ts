import { Statement } from "./Statement";

export class CompoundStatement extends Statement {
    constructor(
        public s1: Statement,
        public s2: Statement
    ) {
        super();
    };
}