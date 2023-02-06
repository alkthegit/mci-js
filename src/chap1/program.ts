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
* Программы
*/
export const programs: Statement[] = [
    /**
     * a := 5 + 3; b := (print(a, a - 1), 10 * a); print(b)
     */
    new CompoundStatement(
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
    ),

    /**
     * a := 5; с := (print(a), a - 1); a := a + c; b := (print(a, a + 2), 7 * a); print(b)
     * 
     * результат:
     *  a = 5
     *  > 5
     *  c = 4
     *  a = 9
     *  > 9
     *  > 11
     *  b = 63
     *  > 63
     *  
     */
    new CompoundStatement(
        new AssignStatement(// a := 5
            'a',
            new NumExpression(5)
        ),
        new CompoundStatement(
            new AssignStatement(// с := (print(a), a - 1)
                'c',
                new EseqExpression(
                    new PrintStatement(// print(a)
                        new LastExpressionList(new IdExpression('a'))
                    ),
                    new OperandExpression(// a - 1
                        new IdExpression('a'),
                        Operator.Minus,
                        new NumExpression(1)
                    )
                )
            ),
            new CompoundStatement(
                new AssignStatement(// a := a + 4
                    'a',
                    new OperandExpression(
                        new IdExpression('a'),
                        Operator.Plus,
                        new IdExpression('c')
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
                                            Operator.Plus,
                                            new NumExpression(2)
                                        )
                                    )
                                )
                            ),
                            new OperandExpression(
                                new NumExpression(7),
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
            )
        )
    )
];