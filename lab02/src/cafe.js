// 953261 Lab 2 — Kad Café data functions
// Rules for this file:
//   • Use array methods (map, filter, find, reduce, some, ...). No for / while loops.
//   • Never change (mutate) the arrays or objects you are given — return new ones.
//   • Each function must RETURN its result. Run `npm test` after every task.

// Task 1 — map
// Return an array of item names, in menu order.
// menuNames(menu) → ["Thai Iced Tea", "Americano", ...]
export function menuNames(menu) {
  // TODO
  return menu.map((i) => i.name);
}

// Task 2 — filter
// Return only the items whose `available` is true.
export function availableItems(menu) {
  // TODO
  return menu.filter((i) => i.available)
  
}

// Task 3 — find
// Return the item with this id, or undefined if there is none.
// findItem(menu, "F01") → { id: "F01", name: "Khao Soi", ... }
export function findItem(menu, id) {
  // TODO
  return menu.find((i) => i.id === id)
}

// Task 4 — filter + map
// Return the NAMES of the available items in one category.
// availableIn(menu, "dessert") → ["Mango Sticky Rice", "Coconut Ice Cream"]
export function availableIn(menu, category) {
  // TODO
  return menu
  .filter((i) => i.category === category)
  .filter((i) => i.available)
  .map((i) => i.name);
}

// Task 5 — template literal + destructuring
// Return one line of text for the menu board:
//   "Thai Iced Tea — 45 THB"
//   "Butterfly Pea Soda — 50 THB (sold out)"     ← when available is false
// Hint: start with  const { name, price, available } = item;
export function menuLine(item) {
  const { name, price, available } = item;
  const status = available ? "" : " (sold out)";
  return `${name} — ${price} THB${status}`;
}

// Task 6 — spread
// Return a NEW item with the price reduced by `percent`, rounded to a whole baht.
// The original item must not change.
// withDiscount({ ..., price: 45 }, 10) → { ..., price: 41 }   (45 × 0.9 = 40.5 → 41)
export function withDiscount(item, percent) {
  const discountedPrice = Math.round(item.price * (1 - percent / 100));
  return {
    ...item,
    price: discountedPrice,
  };
}

// Task 7 — reduce + find
// Return the total price of one order in baht.
// Each line costs  (price of that menu item) × qty.
// orderTotal(orders[0], menu) → 160   (2 × 45 + 1 × 70)
// Task 7 — reduce + find
export function orderTotal(order, menu) {
  const lines = Array.isArray(order)
    ? order
    : (order?.items ?? order?.lines ?? order?.entries ?? []);

  return lines.reduce((sum, line) => {
    const id = line.menuId ?? line.itemId ?? line.menuItemId ?? line.productId ?? line.id;
    const qty = line.qty ?? line.quantity ?? line.count ?? 1;
    const found = Array.isArray(menu) ? menu.find((entry) => entry.id === id) : undefined;
    const price = found ? found.price : (line.price ?? 0);
    return sum + price * qty;
  }, 0);
}

// Task 8 — map + reduce   (this is quiz Q10 again!)
// Return the average order total, rounded to 2 decimal places.
// Return 0 when there are no orders.
export function averageOrder(orders, menu) {
  if (!orders || orders.length === 0) {
    return 0;
  }

  const totals = orders.map((order) => orderTotal(order, menu));
  const grandTotal = totals.reduce((sum, amount) => sum + amount, 0);
  const avg = grandTotal / orders.length;

  return Number(avg.toFixed(2));
}

// ───────────── Stretch (optional) ─────────────

// Task 9 — return the NAME of the item with the highest total quantity sold.
export function bestSeller(orders, menu) {
  if (!Array.isArray(orders) || orders.length === 0 || !Array.isArray(menu) || menu.length === 0) {
    return null;
  }

  const lines = orders.flatMap((order) =>
    Array.isArray(order) ? order : (order?.items ?? order?.lines ?? [])
  );

  const totalsById = lines.reduce((acc, line) => {
    const id = line.menuId ?? line.itemId ?? line.menuItemId ?? line.id;
    const qty = line.qty ?? line.quantity ?? 1;
    acc[id] = (acc[id] ?? 0) + qty;
    return acc;
  }, {});

  const best = menu.reduce(
    (acc, item) => {
      const sold = totalsById[item.id] ?? 0;
      return sold > acc.sold ? { name: item.name, sold } : acc;
    },
    { name: null, sold: -Infinity }
  );

  return best.name;
}

// Task 10 — group item names by category:
// { drink: ["Thai Iced Tea", ...], food: [...], dessert: [...] }
export function namesByCategory(menu) {
  return menu.reduce((groups, item) => {
    const { category, name } = item;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(name);
    return groups;
  }, {});
}
export function cheapDrinks(menu, maxPrice) {
  return menu
    .filter((item) => item.category === "drink" && item.available && item.price <= maxPrice)
    .toSorted((a, b) => a.price - b.price)
    .map((item) => menuLine(item));
}
