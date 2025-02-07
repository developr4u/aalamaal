let cart = [];

function addToCart(productName, price) {
  cart.push({ name: productName, price: price });
  updateCart();
  alert(${productName} added to cart!);
}

function updateCart() {
  const cartItems = document.getElementById('cart-items');
  const subtotalElement = document.getElementById('subtotal');
  const totalElement = document.getElementById('total');

  // Clear previous items
  cartItems.innerHTML = '';

  // Add new items
  let subtotal = 0;
  cart.forEach((item, index) => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
      <p>${item.name}</p>
      <p>$${item.price.toFixed(2)}</p>
    `;
    cartItems.appendChild(cartItem);
    subtotal += item.price;
  });

  // Update totals
  const deliveryCharges = 10.00;
  const total = subtotal + deliveryCharges;
  subtotalElement.textContent = subtotal.toFixed(2);
  totalElement.textContent = total.toFixed(2);
}

function placeOrder(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const address = document.getElementById('address').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;

  if (!name || !address || !phone || !email) {
    alert('Please fill out all fields.');
    return;
  }

  const order = {
    name,
    address,
    phone,
    email,
    cart,
    total: parseFloat(document.getElementById('total').textContent)
  };

  // Save order to localStorage (for demo purposes)
  let orders = JSON.parse(localStorage.getItem('orders')) || [];
  orders.push(order);
  localStorage.setItem('orders', JSON.stringify(orders));

  alert('Order placed successfully!');
  cart = [];
  updateCart();
  window.location.href = 'index.html';
}

// Load cart on cart page
if (window.location.pathname.includes('cart.html')) {
  updateCart();
}
