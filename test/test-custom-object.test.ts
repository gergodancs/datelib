import {DateBuilder} from "../src";

describe('get proper format', () => {
    it('should format correctly from custom object', () => {
        const date = DateBuilder.from({day: 1, month: 3, year: 2004}).format('MM/dd/yyyy');
        expect(date).toBe('03/01/2004');
    });
    it('should format correctly from custom object', () => {
        const date = DateBuilder.from({day: 1, month: 3, year: 2004}).format('MMMM/dd/yyyy');
        expect(date).toBe('March/01/2004');
    });
    it('should format correctly from custom object', () => {
        const date = DateBuilder.from({day: 1, month: 3, year: 2004}).format('dd/MMMM/yyyy');
        expect(date).toBe('01/March/2004');
    });
    it('should format correctly from custom object', () => {
        const date = DateBuilder.from({day: 1, month: 4, year: 2004}).format('MMMM/dd/yyyy');
        expect(date).toBe('April/01/2004');
    });
    it('should format correctly april from custom object', () => {
        const date = DateBuilder.from({day: 1, month: 4, year: 2004}).format('dd/MMMM/yyyy');
        expect(date).toBe('01/April/2004');
    });
    it('should format correctly from custom object', () => {
        const date = DateBuilder.from({day: 1, month: 5, year: 2004}).format('MMMM/dd/yyyy');
        expect(date).toBe('May/01/2004');
    });
    it('should format correctly from custom object', () => {
        const date = DateBuilder.from({day: 1, month: 5, year: 2004}).format('dd/MMMM/yyyy');
        expect(date).toBe('01/May/2004');
    });
});