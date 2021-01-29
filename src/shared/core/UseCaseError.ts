interface UseCaseErrorInterface {
    message: string;
    name: string;
}

export abstract class UseCaseError implements UseCaseErrorInterface, Error {
    public readonly message: string;
    public readonly name: string;

    constructor(message: string, name = "UnKnown") {
        this.message = message;
        this.name = name;
    }
}