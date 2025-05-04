import {DateBuilder} from "../src";


describe('get proper format', () => {
    it('should format correctly from custom object', () => {
        const date = DateBuilder.from({ day: 1, month: 3, year: 2004 }).format('MM/dd/yyyy');
        expect(date).toBe('03/01/2004');
    });

    it('should format correctly from ISO string', () => {
        const date = DateBuilder.from('2021-10-12T00:00:00.000Z').format('dd/MM/yyyy');
        expect(date).toBe('12/10/2021');
    });

    it('should format correctly from Unix timestamp', () => {
        const date = DateBuilder.from(1728518400).format('MM/dd/yyyy');
        expect(date).toBe('10/10/2024');
    });

    it('should format correctly from Unix MS timestamp', () => {
        const date = DateBuilder.from(1728518400000).format('MM/dd/yyyy');
        expect(date).toBe('10/10/2024');
    });

    it('should format correctly from Date object', () => {
        const date = DateBuilder.from(new Date(2024, 10, 30)).format('yyyy.MM.dd');
        expect(date).toBe('2024.11.30');
    });
    it('should create a DateBuilder from ISO string and format correctly', () => {
        const formatted = DateBuilder.from('2024-12-25').format('yyyy-MM-dd');
        expect(formatted).toBe('2024-12-25');
    });

    it('should return correct object representation', () => {
        const obj = DateBuilder.from('2024-12-25').toObject();
        expect(obj).toEqual({ day: 25, month: 12, year: 2024 });
    });

    it('should return correct Unix timestamp', () => {
        const unix = DateBuilder.from('1970-01-01T00:00:01.000Z').toUnix();
        expect(unix).toBe(1);
    });
});

describe('get full day and month names', () => {
    it('should return correct full month name for a given date', () => {
        const date = DateBuilder.from({ day: 1, month: 3, year: 2004 }).format('MMMM');
        expect(date).toBe('March');
    });

    it('should return correct full month name for a given date', () => {
        const date = DateBuilder.from({ day: 1, month: 4, year: 2004 }).format('MMMM');
        expect(date).toBe('April');
    });

    it('should return correct full day name for a given date', () => {
        const date = DateBuilder.from('2024-11-30').format('dddd');
        expect(date).toBe('Saturday');
    });

    it('should return correct full month name from ISO string', () => {
        const date = DateBuilder.from('2024-07-15T00:00:00.000Z').format('MMMM');
        expect(date).toBe('July');
    });

    it('should return correct full day name from ISO string', () => {
        const date = DateBuilder.from('2024-12-25T00:00:00.000Z').format('dddd');
        expect(date).toBe('Wednesday');
    });

    it('should return correct full month name from Unix timestamp', () => {
        const date = DateBuilder.from(1672540800).format('MMMM');
        expect(date).toBe('January');  // Check this expected value
    });

    it('should return correct full day name from Unix timestamp', () => {
        const date = DateBuilder.from(1672540800).format('dddd');
        expect(date).toBe('Sunday');  // Check this expected value
    });

    it('should return correct full month name from Unix MS timestamp', () => {
        const date = DateBuilder.from(1672540800000).format('MMMM');
        expect(date).toBe('January');  // Check this expected value
    });

    it('should return correct full day name from Unix MS timestamp', () => {
        const date = DateBuilder.from(1672540800000).format('dddd');
        expect(date).toBe('Sunday');  // Check this expected value
    });
});

describe('custom date format tests', () => {
    it('should format as "dd. MMMM. yyyy" november', () => {
        const date = DateBuilder.from('2022-11-10').format('dd. MMMM. yyyy');
        expect(date).toBe('10. November. 2022');
    });

    it('should format as "dd. MMMM. yyyy" april', () => {
        const date = DateBuilder.from('2022-4-10').format('dd. MMMM. yyyy');
        expect(date).toBe('10. April. 2022');
    });

    it('should format as "dd. MMMM. yyyy march"', () => {
        const date = DateBuilder.from('2022-3-19').format('dd. MMMM. yyyy');
        expect(date).toBe('19. March. 2022');
    });

    it('should format as "MMMM dd, yyyy" july', () => {
        const date = DateBuilder.from('2022-07-04').format('MMMM dd, yyyy');
        expect(date).toBe('July 04, 2022');
    });

    it('should format as "E, MMM dd yyyy"', () => {
        const date = DateBuilder.from('2023-09-01').format('E, MMM dd yyyy');
        expect(date).toBe('Fri, Sep 01 2023'); // 'E' = short day name, 'MMM' = short month
    });

    it('should format as "dd/MMM/yyyy"', () => {
        const date = DateBuilder.from('2021-12-25').format('dd/MMM/yyyy');
        expect(date).toBe('25/Dec/2021');
    });

    it('should format as "DDDD, dd MMMM yyyy"', () => {
        const date = DateBuilder.from('2020-02-29').format('DDDD, dd MMMM yyyy');
        expect(date).toBe('Saturday, 29 February 2020'); // long weekday + full month
    });

    it('should format as "yyyyMMdd"', () => {
        const date = DateBuilder.from('1999-01-01').format('yyyyMMdd');
        expect(date).toBe('19990101');
    });
});


