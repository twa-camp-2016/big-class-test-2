/*global require,describe*/
'use strict'
const  obj = require("./../src/app");
describe("formatItem",function () {
    it("should format Item ",function () {
        let item = 'ITEM000003-2';
        let result = formatItem(item);
        expect(result).toEqual({barcode:'ITEM000003'},{count:2});
    });
});

