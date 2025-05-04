import { isDayValid, isMonthValid } from "./helpers";

export class DateValidator {
    private errors: string[] = [];

    constructor(
        private day: number,
        private month: number,
        private year: number
    ) {}

    isValidInput(): boolean {
        let isValid = true;

        if (!isDayValid(this.day)) {
            this.errors.push("Invalid day");
            isValid = false;
        }

        if (!isMonthValid(this.month)) {
            this.errors.push("Invalid month");
            isValid = false;
        }

        if (isValid) {
            const date = new Date(this.year, this.month - 1, this.day);
            const dateValid =
                date.getFullYear() === this.year &&
                date.getMonth() === this.month - 1 &&
                date.getDate() === this.day;

            if (!dateValid) {
                this.errors.push("Invalid date combination");
                isValid = false;
            }
        }

        return isValid;
    }

    getErrors(): string[] {
        return this.errors;
    }
}
