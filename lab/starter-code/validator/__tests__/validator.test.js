'use strict';

const validatorClass = require('../validator');
const validator = new validatorClass()

describe('validator module performs basic validation of', () => {

    it('strings', () => {
        let str = 'yes';
        let num = 1;
        let arr = ['a'];
        let obj = {x:'y'};
        let func = () => {};
        let bool = false;
        expect(validator.isString(str)).toBeTruthy();
        expect(validator.isString(num)).toBeFalsy();
        expect(validator.isString(arr)).toBeFalsy();
        expect(validator.isString(obj)).toBeFalsy();
        expect(validator.isString(func)).toBeFalsy();
        expect(validator.isString(bool)).toBeFalsy();
    });

    it('numbers', () => {
        expect(validator.isNumber('hello')).toBeFalsy();
        expect(validator.isNumber(3)).toBeTruthy();
    });

    it('arrays', () => {
        expect(validator.isArray([1,2,3])).toBeTruthy();
        expect(validator.isArray('hello')).toBeFalsy();
    });

    it('objects', () => {
        expect(validator.isObject('hello')).toBeFalsy();
        expect(validator.isObject({x:'y'})).toBeTruthy();
    });

    it('booleans', () => {
        expect(validator.isBoolean(3)).toBeFalsy();
        expect(validator.isBoolean(true)).toBeTruthy();
    });

    it('functions', () => {
        expect(validator.isFunction('hello')).toBeFalsy();
        expect(validator.isFunction(function() {})).toBeTruthy();
    });

});

describe('validator module performs complex validations', () => {

    it('validates the presence of required object properties at any level', () => {
        // i.e. does person.hair.color exist and have a good value, not just person.hair
        const schema = {
            fields: {
                id: {type: 'string'},
                age: {type: 'number'},
                favoriteToys: {type: 'object'}
            },
        };
        expect(validator.isObjectValid({id: 'evan', age: 12, favoriteToys: {}}, schema)).toEqual(true);
        expect(validator.isObjectValid({ted: 12, id: 3}, schema)).toEqual(false);
    });

    it('validates the proper types of object properties', () => {
        // i.e. person.name must be a string, etc.
        //expect(validator.isProperties(person.name.type)).toBeTruthy();
        const schema = {
            fields: {
                id: {type: 'string'},
                age: {type: 'number'},
                favoriteToys: {type: 'object'}
            },
        };
        expect(validator.isObjectValid('hello', schema)).toEqual(false);
    });


    it('validates the types of values contained in an array', () => {
        // i.e. an array of all strings or numbers
        expect(true).toBeFalsy();
    });

    it('validates a value array against an approved list', () => {
        // i.e. a string might only be allowed to be "yes" or "no"
        expect(true).toBeFalsy();
    });

    // TODO: Cover so, so many more cases

});

