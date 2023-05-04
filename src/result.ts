export type Result<T> = {
    operation: T | undefined
    sideEffects: any[]
    pgListens: any[]
}