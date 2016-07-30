'use strict';
const pos = require("../src/app");

describe("separateTags",function () {
    it("should separate tags",function () {
        let tags = ['IEM0000000','IEM0000003-2'];
        let result = pos.separateTags(tags);
        let itemsTag = [
            {
                barcode:'IEM0000000',
                count:1
            },
            {
                barcode:'IEM0000003',
                count:2
            }
        ];
        expect(result).toEqual(itemsTag);
    })
});































