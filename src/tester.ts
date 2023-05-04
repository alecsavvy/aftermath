import { Knex, knex } from "knex";
import { Result } from "./result";

export class Tester {
    db: Knex;

    // defaults to sqlite in mem if you dont want to stand up db
    // this is just for ease, its on the author to make sure they
    // have the correct downstream db dependency installed for knex
    // https://knexjs.org/guide/#node-js
    constructor(db: Knex | undefined ) {
        if (db === undefined) {
            this.db = knex({
                client: 'better-sqlite3',
                connection: {
                  filename: ":memory:"
                }
              });
        } else {
            this.db = db
        }
    }

    // initial operation that triggers multiple effects
    // the first one processed against db
    operation<T>(): Tester {
        return this
    }

    // side effects that happen as a result of the initial operation
    // these are pushed into an array and executed concurrently 
    // after the operation is complete
    sideEffect(): Tester {
        return this
    }

    // a postgres specific side effect
    // when an operation is run a subscription to this topic is opened
    // received messages are dropped into an array and returned after the
    // run so further assertions can be done
    pgListen(): Tester {
        if (!(this.db.client === "pg")) throw new Error("pg notify only works with postgres")
        return this
    }

    // a "getter" fn to get a handle to the underlying db for anything else
    // the author might want to do
    getDb(): Knex {
        return this.db
    }

    // runs the sequence of events
    // 1. runs the operation first, subscribes to PG notifies if present
    // 2. runs all side effect operations after the success of the operation
    // 3. gathers all pg listen messages within timeout concurrently
    // 4. assembles all relevant data into the result structure and returns
    async run<T>(): Promise<Result<T>> {
        return {
            operation: undefined,
            sideEffects: [],
            pgListens: []
        }
    }
}
