import { Statement } from "./Compiler/core/Statement";
import { PrintStatement } from "./Compiler/core/PrintStatement";
import { CompoundStatement } from "./Compiler/core/CompoundStatement";
import { AssignStatement } from "./Compiler/core/AssignStatement";
import { OperandExpression, Operator } from "./Compiler/core/OperandExpression";
import { IdExpression } from "./Compiler/core/IdExpression";
import { NumExpression } from "./Compiler/core/NumExpression";
import { EseqExpression } from "./Compiler/core/EseqExpression";
import { PairExpressionList } from "./Compiler/core/PairExpressionList";
import { LastExpressionList } from "./Compiler/core/LastExpressionList";

/**
* Программа:
* 
* a := 5 + 3; b := (print(a, a - 1), 10 * a); print(b)
* 
*/
export const program1: Statement = new CompoundStatement(
    new AssignStatement("a",
        new OperandExpression(
            new NumExpression(5),
            Operator.Plus,
            new NumExpression(3)
        )
    ),
    new CompoundStatement(
        new AssignStatement("b",
            new EseqExpression(
                new PrintStatement(
                    new PairExpressionList(
                        new IdExpression("a"),
                        new LastExpressionList(
                            new OperandExpression(
                                new IdExpression("a"),
                                Operator.Minus,
                                new NumExpression(1)
                            )
                        )
                    )
                ),
                new OperandExpression(
                    new NumExpression(10),
                    Operator.Times,
                    new IdExpression("a")
                )
            )
        ),
        new PrintStatement(
            new LastExpressionList(
                new IdExpression("b")
            )
        )
    )
);