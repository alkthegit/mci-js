import { maxargs, interpret } from "./chap1/Compiler/lib/lib";
import { program1 } from "./chap1/program";

main();

function main(): void {
    // console.log(`Наибольшее количество аргументов print в программе равно:`);
    // console.log(`${maxargs(program1)}`);
    // interpret(program1);

    // console.log('Hello World');
    interpret(program1);
}

