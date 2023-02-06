
import * as process from 'process';

export function write(...args: any[]): void {
    // console.debug(args);
    // return;
    for (const d of args) {
        if (d == null) {
            process.stdout.write('null');
        } else {
            if (typeof d.toString === 'function') {
                process.stdout.write(d.toString());
            } else {
                process.stdout.write('unknown data');
            }
        }
    }
}

export function writeln(...args: any[]): void {
    write(args);
    process.stdout.write(`\n`);
}

export function appendBuffer(): void {

}