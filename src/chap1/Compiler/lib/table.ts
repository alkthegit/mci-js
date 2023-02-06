/**
 * тесты:

    const t = new Table('a', 2,
        new Table('b', 4,
            new Table('g', 32,
                new Table('z', 23,
                    new Table('c', 78)
                )
            )
        )
    );

    const f = t.lookup('c');
    console.log(f != null ? f.value : 'not found');

 */
export class Table<T = number> {
    constructor(
        public id: string,
        public value: T | null,
        public tail: Table<T> | null = null,
    ) {

    }

    public lookup(id: string): Table<T> | null {
        return this.id === id ? this : (
            this.tail != null ? this.tail.lookup(id) :
                null
        );
    }

    public update(id: Table<T>['id'], value: Table<T>['value']): Table<T> {
        if (id == null || id === '') {
            throw new ReferenceError('адрес в таблице неможет быть пустым');
        }

        return new Table<T>(id, value, this);
    }
}