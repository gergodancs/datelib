// src/errors/DateValidationError.ts
export class DateValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'DateValidationError';
    }
}
