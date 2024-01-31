const data = [
  {
    quantity: 1,
    items: [
      {
        product: { id: 1, name: "Donut 1" },
        quantity: 2,
      },
    ],
  },
  {
    quantity: 2,
    items: [
      {
        product: { id: 1, name: "Donut 1" },
        quantity: 1,
      },
      {
        product: { id: 2, name: "Donut 2" },
        quantity: 1,
      },
      {
        product: { id: 3, name: "Donut 3" },
        quantity: 1,
      },
      {
        product: { id: 4, name: "Donut 4" },
        quantity: 1,
      },
      {
        product: { id: 5, name: "Donut 5" },
        quantity: 1,
      },
      {
        product: { id: 6, name: "Donut 6" },
        quantity: 1,
      },
    ],
  },
];

const flatMappedData = data.map(item => {
  const innerQuantity = item.items.reduce((acc, innerItem) => acc + innerItem.quantity, 0);
  return { outerQuantity: item.quantity, innerQuantity };
});

console.log(flatMappedData);