'use strict';
const pos = require("../src/app");
const load = require("./fixture");

describe("separateTags", function () {
    it("should separate tags", function () {
        let tags = ['IEM0000000', 'IEM0000003-2'];
        let result = pos.separateTags(tags);
        let itemsTag = [
            {
                barcode: 'IEM0000000',
                count: 1
            },
            {
                barcode: 'IEM0000003',
                count: 2
            }
        ];
        expect(result).toEqual(itemsTag);
    })
});

describe("amountBarcodes", function () {
    it("should amount the items barcodes", function () {
        let itemsTag = [
            {
                barcode: 'IEM0000000',
                count: 1
            },
            {
                barcode: 'IEM0000003',
                count: 2
            },
            {
                barcode: 'IEM0000003',
                count: 2
            }];
        let result = pos.amountBarcodes(itemsTag);
        let itemsCount = [
            {
                barcode: 'IEM0000000',
                count: 1
            },
            {
                barcode: 'IEM0000003',
                count: 4
            }
        ];
        expect(result).toEqual(itemsCount);
    })
});

describe("matchPromotions", function () {
    it("match the item's promotion type", function () {
        let itemsCount = [
            {
                barcode: "ITEM000001",
                count: 1
            },
            {
                barcode: "ITEM000003",
                count: 2.5
            },
            {
                barcode: "ITEM000005",
                count: 3
            }
        ];
        let allPromoteItems = load.loadPromotions();
        let result = pos.matchPromotions(itemsCount, allPromoteItems);

        expect(result).toEqual([
            {
                barcode: "ITEM000001",
                count: 1,
                type: "BUY_TWO_GET_ONE_FREE"
            },
            {
                barcode: "ITEM000003",
                count: 2.5,
                type: "1"
            },
            {
                barcode: "ITEM000005",
                count: 3,
                type: "BUY_TWO_GET_ONE_FREE"
            }
        ]);
    })
});

describe("matchItems", function () {
    it("match items message", function () {
        let itemsPromotionList = [
            {
                barcode: "ITEM000001",
                count: 1,
                type: "BUY_TWO_GET_ONE_FREE"
            },
            {
                barcode: "ITEM000003",
                count: 2.5,
                type: "1"
            }
        ];
        let allItems = load.loadAllItems();
        let result = pos.matchItems(itemsPromotionList, allItems);
        expect(result).toEqual([
            {
                barcode: "ITEM000001",
                name: "雪碧",
                unit: "瓶",
                price: 3,
                count: 1,
                type: "BUY_TWO_GET_ONE_FREE"
            },
            {
                barcode: "ITEM000003",
                name: "荔枝",
                unit: "斤",
                price: 15,
                count: 2.5,
                type: "1"
            }
        ]);

    })
});

describe("calculateSubtotal", function () {
    it("calculateSubtotal test", function () {
        let itemsList = [
            {
                barcode: "ITEM000001",
                name: "雪碧",
                unit: "瓶",
                price: 3,
                count: 1,
                type: "BUY_TWO_GET_ONE_FREE"
            },
            {
                barcode: "ITEM000003",
                name: "荔枝",
                unit: "斤",
                price: 15,
                count: 2.5,
                type: "1"
            }
        ];
        let result = pos.calculateSubtotal(itemsList);
        expect(result).toEqual([
            {
                barcode: "ITEM000001",
                name: "雪碧",
                unit: "瓶",
                price: 3,
                count: 1,
                type: "BUY_TWO_GET_ONE_FREE",
                subtotal: 3.00
            },
            {
                barcode: "ITEM000003",
                name: "荔枝",
                unit: "斤",
                price: 15,
                count: 2.5,
                type: "1",
                subtotal: 37.5
            }
        ]);

    })
});

describe("calculateSavedSubtotal", function () {
    it("calculateSavedSubtotal test", function () {
        let itemsList = [
            {
                barcode: "ITEM000001",
                name: "雪碧",
                unit: "瓶",
                price: 3,
                count: 3,
                type: "BUY_TWO_GET_ONE_FREE"
            },
            {
                barcode: "ITEM000003",
                name: "荔枝",
                unit: "斤",
                price: 15,
                count: 2.5,
                type: "1"
            }
        ];
        let result = pos.calculateSavedSubtotal(itemsList);
        expect(result).toEqual([
            {
                barcode: "ITEM000001",
                name: "雪碧",
                unit: "瓶",
                price: 3,
                count: 3,
                type: "BUY_TWO_GET_ONE_FREE",
                discountSubtotal: 6.00
            },
            {
                barcode: "ITEM000003",
                name: "荔枝",
                unit: "斤",
                price: 15,
                count: 2.5,
                type: "1",
                discountSubtotal: 37.5
            }
        ]);

    })
});

describe("calculateTotal", function () {
    it("calculateTotal test", function () {
        let itemsList = [
            {
                barcode: "ITEM000001",
                name: "雪碧",
                unit: "瓶",
                price: 3,
                count: 3,
                type: "BUY_TWO_GET_ONE_FREE",
                discountSubtotal: 6.00
            },
            {
                barcode: "ITEM000003",
                name: "荔枝",
                unit: "斤",
                price: 15,
                count: 2.5,
                type: "1",
                discountSubtotal: 37.5
            }
        ];
        let result = pos.calculateTotal(itemsList);
        expect(result).toEqual(43.5);

    })
});

describe("calculateTotal", function () {
    it("calculateTotal test", function () {
        let itemSubtotal = [
            {
                barcode: "ITEM000001",
                name: "雪碧",
                unit: "瓶",
                price: 3,
                count: 3,
                type: "BUY_TWO_GET_ONE_FREE",
                subtotal: 9.00
            },
            {
                barcode: "ITEM000003",
                name: "荔枝",
                unit: "斤",
                price: 15,
                count: 2.5,
                type: "1",
                subtotal: 37.5
            }
        ];
        let itemsDiscountSubtotal = [
            {
                barcode: "ITEM000001",
                name: "雪碧",
                unit: "瓶",
                price: 3,
                count: 3,
                type: "BUY_TWO_GET_ONE_FREE",
                discountSubtotal: 6.00
            },
            {
                barcode: "ITEM000003",
                name: "荔枝",
                unit: "斤",
                price: 15,
                count: 2.5,
                type: "1",
                discountSubtotal: 37.5
            }
        ];
        let result = pos.getDiscount(itemSubtotal,itemsDiscountSubtotal);
        expect(result).toEqual(3);

    })
});



















