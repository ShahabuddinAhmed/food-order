export class Result<T> {
    private isSuccess: boolean;
    private isFailure: boolean;
    private error: T | string | Error;
    private _value: T;

    public constructor(isSuccess: boolean, error?: Error | string, value?: T) {
        if (isSuccess && error) {
            throw new Error("InvalidOperation: A result cannot be successful and contain an error");
        }
        if (!isSuccess && !error) {
            throw new Error("InvalidOperation: A failing result needs to contain an error message");
        }

        this.isSuccess = isSuccess;
        this.isFailure = !isSuccess;
        this.error = error as (T | string);
        this._value = value as T;

        Object.freeze(this);
    }

    public get didFailed(): boolean {
        return this.isFailure;
    }

    public get didSucceed(): boolean {
        return this.isSuccess;
    }

    public getValue(): T {
        if (!this.isSuccess) {
            console.log(this.error);
            throw new Error("Can't get the value of an error result. Use 'errorValue' instead.");
        }

        return this._value as T;
    }

    public getError(): string | T | Error {
        return this.error;
    }

    public static ok<U>(value?: U): Result<U> {
        return new Result<U>(true, undefined, value);
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    public static fail<U>(error: any): Result<U> {
        return new Result<U>(false, error);
    }

    public static combine(results: Result<any>[]): Result<any> {
        for (const result of results) {
            if (result.isFailure) return result;
        }
        return Result.ok();
    }
}