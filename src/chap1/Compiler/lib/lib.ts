import { Statement } from "../core/Statement";
import { Expression } from "../core/Expression";
import { CompoundStatement } from "../core/CompoundStatement";
import { AssignStatement } from "../core/AssignStatement";
import { PrintStatement } from "../core/PrintStatement";
import { IdExpression } from "../core/IdExpression";
import { NumExpression } from "../core/NumExpression";
import { ExpressionList } from "../core/ExpressionList";
import { LastExpressionList } from "../core/LastExpressionList";
import { PairExpressionList } from "../core/PairExpressionList";
import { OperandExpression, Operator } from "../core/OperandExpression";
import { EseqExpression } from "../core/EseqExpression";
import { Table, update } from "./table";

let maxArgs = 0;
export function maxargs(stm: Statement): number {
    calcArgsStmt(stm);

    return maxArgs;
}

function calcArgsStmt(s: Statement): void {
    if (s instanceof CompoundStatement) {
        calcArgsStmt(s.s1);
        calcArgsStmt(s.s2);
    } else if (s instanceof AssignStatement) {
        calcArgsExpr(s.exp);
    } else if (s instanceof PrintStatement) {
        maxArgs = Math.max(
            maxArgs,
            listSize(s.expList)
        );
        calcArgsExpr(s.expList);
    }
}

function calcArgsExpr(e: Expression | ExpressionList): void {
    if (e instanceof LastExpressionList) {
        calcArgsExpr(e.head);
    } else if (e instanceof PairExpressionList) {
        calcArgsExpr(e.head);
        calcArgsExpr(e.expList);
    } else if (e instanceof OperandExpression) {
        calcArgsExpr(e.left);
        calcArgsExpr(e.right);
    } else if (e instanceof EseqExpression) {
        calcArgsStmt(e.stm);
        calcArgsExpr(e.exp);
    }
}

function listSize(e: ExpressionList): number {
    if (e instanceof LastExpressionList) {
        return 1;
    } else if (e instanceof PairExpressionList) {
        return 1 + listSize(e.expList);
    }

    return 0;
}

class ValAndTable {
    constructor(
        public value: number | null,
        public table: Table<number>,
    ) { }
}

export function interpret(stm: Statement): void {
    interpStm(stm, new Table('$$$', 0));
}

function interpStm(s: Statement, t: Table): Table {
    if (s instanceof CompoundStatement) {
        return interpStm(s.s2, interpStm(s.s1, t))
    } else if (s instanceof AssignStatement) {
        // вычисляем правую сторону
        const expResult = interpExp(s.exp, t);
        if (t == null) {
            // если таблица не определена - создаем новую
            t = new Table<number>(s.id, expResult != null ? expResult.value : null);
        } else {
            // ищем в таблице левую часть (id)
            const fountTable = t.lookup(s.id);
            if (fountTable != null) {
                // если есть запись - устанавливаем значение выражения
                fountTable.value = expResult.value;
            } else {
                // если нет - добавляем в таблицу запись с левой частью (id)
                t = update(t, s.id, expResult.value);
            }
        }

        return t;
    } else if (s instanceof PrintStatement) {
        interpExp(s.expList, t);
    }

    return t;
}

function interpExp(e: Expression | ExpressionList, t: Table): ValAndTable {
    let expResult: ValAndTable;
    if (e instanceof LastExpressionList) {
        expResult = interpExp(e.head, t);
        console.log(expResult.value);

        return new ValAndTable(expResult.value, t);
    } else if (e instanceof PairExpressionList) {
        const headResult = interpExp(e.head, t);
        console.log(headResult.value);

        expResult = interpExp(e.expList, headResult.table);

        return new ValAndTable(
            expResult.value,
            expResult.table
        );
    } else if (e instanceof EseqExpression) {
        expResult = interpExp(
            e.exp,
            interpStm(e.stm, t)
        );

        return new ValAndTable(
            expResult.value,
            expResult.table
        );
    } else if (e instanceof OperandExpression) {
        const right = interpExp(e.right, t);
        const left = interpExp(e.left, right.table);

        return new ValAndTable(
            evalOpExpr(e.oper, left.value, right.value),
            left.table
        );
    } else if (e instanceof IdExpression) {
        const foundId = t.lookup(e.id);
        if (foundId == null) {
            throw new ReferenceError(`неизвестный идентификатор: ${e.id}`);
        } else {
            return new ValAndTable(foundId.value, t)
        }
    } else if (e instanceof NumExpression) {
        return new ValAndTable(e.num, t)
    }

    return new ValAndTable(0, new Table('$$$', 0));
}

function evalOpExpr(o: Operator, a: number | null, b: number | null): number | null {
    if (a == null) {
        throw new ReferenceError(`операнд слева не определен`);
    }

    if (b == null) {
        throw new ReferenceError(`операнд справа не определен`);
    }

    return (o === Operator.Plus ? a + b :
        (o === Operator.Minus ? a - b :
            (o === Operator.Times ? a * b :
                (o === Operator.Div ? a / b : null)
            )
        )
    );

}