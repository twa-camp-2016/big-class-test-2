module.exports = {
    loadAllItems : loadAllItems,
    loadPromotions : loadPromotions
};

function loadAllItems() {
  return [
    {
      barcode: 'ITEM000',
      name: '可口可乐',
      unit: '瓶',
      price: 3.00
    },
    {
      barcode: 'ITEM001',
      name: '雪碧',
      unit: '瓶',
      price: 3.00
    },
    {
      barcode: 'ITEM002',
      name: '苹果',
      unit: '斤',
      price: 5.50
    },
    {
      barcode: 'ITEM003',
      name: '荔枝',
      unit: '斤',
      price: 15.00
    },
    {
      barcode: 'ITEM004',
      name: '电池',
      unit: '个',
      price: 2.00
    },
    {
      barcode: 'ITEM005',
      name: '方便面',
      unit: '袋',
      price: 4.50
    }
  ];
}

function loadPromotions() {
  return [
    {
      type: 'BUY_TWO_GET_ONE_FREE',
      barcodes: [
        'ITEM000',
        'ITEM001',
        'ITEM005'
      ]
    }
  ];
}