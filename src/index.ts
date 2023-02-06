import { maxargs, interpret } from "./chap1/Compiler/lib/compiler";
import { programs } from "./chap1/program";

main();

function main(): void {
    // console.log('Hello World');
    interpret(programs[1]);
}

