import {MAX_DAY, MAX_MONTH, MIN_DAY, MIN_MONTH} from "./constans";

export function isDayValid(day: number): boolean {
    return Number.isInteger(day) && day >= MIN_DAY && day <= MAX_DAY;

}

export function isMonthValid(month: number): boolean {
    return Number.isInteger(month) && month >= MIN_MONTH && month <= MAX_MONTH;
}

