"use strict"

const temp = require('../src/app.js');
describe("formatTags", function () {
    it("should return formattedTags from tags", function () {
        let tags =
            [
                'ITEM000001',
                'ITEM000002-2'
            ];
        let result = temp.formatTags(tags);
        let formattedTags =
            [
                {
                    barcode: 'ITEM000001',
                    amount: 1
                },
                {
                    barcode: 'ITEM000002',
                    amount: 2
                }
            ];
        expect(result).toEqual(formattedTags);

    });
});

describe("mergeBarcode", function () {
    it("should return mergedBarcode from formattedTags", function () {
        let formattedTags =
            [
                {
                    barcode: 'ITEM000001',
                    amount: 1
                },
                {
                    barcode: 'ITEM000001',
                    amount: 1
                },
                {
                    barcode: 'ITEM000002',
                    amount: 2
                }
            ];
        let mergedBarcode =
            [
                {
                    barcode: 'ITEM000001',
                    amount: 2
                },
                {
                    barcode: 'ITEM000002',
                    amount: 2
                }
            ];
        let result = temp.mergeBarcode(formattedTags);
        expect(result).toEqual(mergedBarcode);
    });
});

describe('getAmountItems', function () {
    it("should return amountItems from mergedBarcode ", function () {
        let mergedBarcode =
            [
                {
                    barcode: 'ITEM000000',
                    amount: 2
                },
                {
                    barcode: 'ITEM000002',
                    amount: 2
                }
            ];
        let allItems =
            [
                {
                    barcode: 'ITEM000000',
                    name: '可口可乐',
                    unit: '瓶',
                    price: 3.00
                }, {
                barcode: 'ITEM000001',
                name: '苹果',
                unit: '斤',
                price: 5.50
            }, {
                barcode: 'ITEM000002',
                name: '羽毛球',
                unit: '个',
                price: 1.00
            }
            ];
        let amountItems =
            [
                {
                    barcode: 'ITEM000000',
                    name: '可口可乐',
                    unit: '瓶',
                    price: 3.00,
                    amount: 2
                },
                {
                    barcode: 'ITEM000002',
                    name: '羽毛球',
                    unit: '个',
                    price: 1.00,
                    amount: 2
                }
            ];
        let result = temp.getAmountItems(mergedBarcode, allItems);
        expect(result).toEqual(amountItems);
    });
});
describe("getOriginSubtotal", function () {
    it("should return originSubtotal from amountItems", function () {
        let amountItems =
            [
                {
                    barcode: 'ITEM000000',
                    name: '可口可乐',
                    unit: '瓶',
                    price: 3.00,
                    amount: 2
                },
                {
                    barcode: 'ITEM000002',
                    name: '羽毛球',
                    unit: '个',
                    price: 1.00,
                    amount: 2
                }
            ];
        let originSubtotal =
            [
                {
                    barcode: 'ITEM000000',
                    name: '可口可乐',
                    unit: '瓶',
                    price: 3.00,
                    amount: 2,
                    originSubtotal: 6.00
                },
                {
                    barcode: 'ITEM000002',
                    name: '羽毛球',
                    unit: '个',
                    price: 1.00,
                    amount: 2,
                    originSubtotal: 2.00
                }
            ];
        let result = temp.getOriginSubTotal(amountItems);
        expect(result).toEqual(originSubtotal);
    });
});

describe("getPromotions", function () {
    it("should return savedPromotions from originSutotal and promotions", function () {
        let originSubtotal =
            [
                {
                    barcode: 'ITEM000000',
                    name: '可口可乐',
                    unit: '瓶',
                    price: 3.00,
                    amount: 4,
                    originSubtotal: 12.00
                }
            ];
        let promotions =
            [
                {
                    type: 'BUY_TWO_GET_ONE_FREE',
                    barcodes: [
                        'ITEM000000',
                        'ITEM000001',
                        'ITEM000005'
                    ]
                }
            ];

        let savedPromotions =
            [
                {
                    barcode: 'ITEM000000',
                    name: '可口可乐',
                    unit: '瓶',
                    price: 3.00,
                    amount: 4,
                    originSubtotal: 12.00,
                    savedAmount: 1,
                    savedMoney: 3.00
                }
            ];

        let result = temp.getPromotions(originSubtotal, promotions);
        expect(result).toEqual(savedPromotions);
    });
});

describe("getSubtotal", function () {
    it("should return subtotal from savedPromotions", function () {
        let savedPromotions =
            [
                {
                    barcode: 'ITEM000000',
                    name: '可口可乐',
                    unit: '瓶',
                    price: 3.00,
                    amount: 4,
                    originSubtotal: 12.00,
                    savedAmount: 1,
                    savedMoney: 3.00
                }
            ];
        let subtotal =
            [
                {
                    barcode: 'ITEM000000',
                    name: '可口可乐',
                    unit: '瓶',
                    price: 3.00,
                    amount: 4,
                    originSubtotal: 12.00,
                    savedAmount: 1,
                    savedMoney: 3.00,
                    subtotal: 9.00
                }
            ];
        let result = temp.getSubtotal(savedPromotions);
        expect(result).toEqual(subtotal);
    });
});

describe("getTotal", function () {
    it("should return total from subtotal ", function () {
        let detailItems =
            [
                {
                    barcode: 'ITEM000000',
                    name: '可口可乐',
                    unit: '瓶',
                    price: 3.00,
                    amount: 4,
                    originSubtotal: 12.00,
                    savedAmount: 1,
                    savedMoney: 3.00,
                    subtotal: 9.00
                },
                {
                    barcode: 'ITEM000002',
                    name: '羽毛球',
                    unit: '个',
                    price: 1.00,
                    amount: 2,
                    originSubtotal: 2.00,
                    savedAmount: 0,
                    savedMoney: 0,
                    subtotal: 2.00
                }
            ];
        let total = 11.00;
        let result = temp.getTotal(detailItems);
        expect(result).toEqual(total);
    });
});

describe("getTotalSavedMoney", function () {
    it("should return totalSavedMoney from savedPromotions", function () {
        let savedPromotions =
            [
                {
                    barcode: 'ITEM000000',
                    name: '可口可乐',
                    unit: '瓶',
                    price: 3.00,
                    amount: 4,
                    originSubtotal: 12.00,
                    savedAmount: 1,
                    savedMoney: 3.00
                },
                {
                    barcode: 'ITEM000002',
                    name: '羽毛球',
                    unit: '个',
                    price: 1.00,
                    amount: 4,
                    originSubtotal: 4.00,
                    savedAmount: 1,
                    savedMoney: 1.00
                }
            ];
        let totalSavedMoney = 4.00;
        let result = temp.getTotalSavedMoney(savedPromotions);
        expect(result).toEqual(totalSavedMoney);
    });
});

describe("print", function () {
    it("should return print from detailItems ,totalSavedMoney amd total", function () {
        let detailItems =
            [
                {
                    barcode: 'ITEM000000',
                    name: '可口可乐',
                    unit: '瓶',
                    price: 3.00,
                    amount: 4,
                    originSubtotal: 12.00,
                    savedAmount: 1,
                    savedMoney: 3.00,
                    subtotal: 9.00
                },
                {
                    barcode: 'ITEM000002',
                    name: '羽毛球',
                    unit: '个',
                    price: 1.00,
                    amount: 2,
                    originSubtotal: 2.00,
                    savedAmount: 0,
                    savedMoney: 0,
                    subtotal: 2.00

                }
            ];
        let totalSavedMoney = 3.00;
        let total = 11.00;
        let print =
            "***<没钱赚商店>收据***" + "\n" +
            "名称：可口可乐，数量：4瓶，单价：3.00(元)，小计：9.00(元)" + "\n" +
            "名称：羽毛球，数量：2个，单价：1.00(元)，小计：2.00(元)" + "\n" +
            "----------------------" + "\n" +
            "总计：11.00(元)" + "\n" +
            "节省：3.00(元)" + "\n" +
            "**********************";
        let result = temp.print(detailItems, totalSavedMoney, total);
        expect(result).toEqual(print);
    });
});

describe("printReceipt", function () {
    it("should return receipt from tags", function () {
        let tags =
            [
                'ITEM000001',
                'ITEM000001',
                'ITEM000001',
                'ITEM000001',
                'ITEM000001',
                'ITEM000003-2',
                'ITEM000005',
                'ITEM000005',
                'ITEM000005'
            ];
        let receipt =
            "***<没钱赚商店>收据***" + "\n" +
            "名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)" + "\n" +
            "名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)" + "\n" +
            "名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)" + "\n" +
            "----------------------" + "\n" +
            "总计：51.00(元)" + "\n" +
            "节省：7.50(元)" + "\n" +
            "**********************";
        let result = temp.printReceipt(tags);
        expect(result).toEqual(receipt);
    });
});



