const groceryProducts = [
    { id: 1, name: "Basmati Rice", price: 200 },
    { id: 2, name: "Toor Dal", price: 150 },
    { id: 3, name: "Chana Dal", price: 180 },
    { id: 4, name: "Wheat Flour", price: 50 },
    { id: 5, name: "Sugar", price: 40 },
    { id: 6, name: "Cooking Oil", price: 250 },
    { id: 7, name: "Masoor Dal", price: 160 },
    { id: 8, name: "Green Tea", price: 120 },
    { id: 9, name: "Turmeric Powder", price: 60 },
    { id: 10, name: "Salt", price: 20 }
];

let cart = [];
let totalPrice = 0;

function renderProducts() {
    const productList = document.getElementById("product-list");
    groceryProducts.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("col-md-4");
        productDiv.innerHTML = `
            <div class="product">
                <h5>${product.name}</h5>
                <p>Price: ₹${product.price}</p>
                <button class="btn btn-success" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
        productList.appendChild(productDiv);
    });
}

function addToCart(productId) {
    const product = groceryProducts.find(p => p.id === productId);
    cart.push(product);
    totalPrice += product.price;
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";
    
    cart.forEach((item, index) => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("list-group-item", "cart-item");
        cartItem.innerHTML = `
            ${item.name} <span>₹${item.price}</span>
            <button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItems.appendChild(cartItem);
    });

    document.getElementById("total-price").innerText = totalPrice;
}

function removeFromCart(index) {
    totalPrice -= cart[index].price;
    cart.splice(index, 1);
    updateCart();
}

document.getElementById("checkout").addEventListener("click", () => {
    if (cart.length > 0) {
        // Show the modal for user details
        const userDetailsModal = new bootstrap.Modal(document.getElementById('userDetailsModal'));
        userDetailsModal.show();
    } else {
        alert("Your cart is empty!");
    }
});

document.getElementById("proceed").addEventListener("click", () => {
    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const mobile = document.getElementById("mobile").value;

    if (name && address && mobile) {
        const deliveryDate = getDeliveryDate(4);
        const orderDetails = `Delivering to: ${address}\nYour order will be delivered by: ${deliveryDate}`;

        // Save order in local storage
        saveOrder({ name, address, mobile, items: cart, total: totalPrice, deliveryDate });

        // Show only order confirmation card
        document.getElementById("order-details").innerText = orderDetails;
        document.getElementById("order-confirmation").style.display = 'block';
        document.querySelector('.container').style.display = 'none'; // Hide the product and cart view

        // Clear cart and reset total
        cart = [];
        totalPrice = 0;
        updateCart();

        // Hide the modal
        const userDetailsModal = bootstrap.Modal.getInstance(document.getElementById('userDetailsModal'));
        userDetailsModal.hide();
    } else {
        alert("Please fill all details.");
    }
});

// Function to calculate the delivery date
function getDeliveryDate(days) {
    const today = new Date();
    today.setDate(today.getDate() + days);
    return today.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

// Save order in local storage
function saveOrder(order) {
    const orders = JSON.parse(localStorage.getItem('myOrders')) || [];
    orders.push(order);
    localStorage.setItem('myOrders', JSON.stringify(orders));
}

// Show My Orders
document.getElementById("my-orders").addEventListener("click", () => {
    const orders = JSON.parse(localStorage.getItem('myOrders')) || [];
    const orderList = document.getElementById("order-list");
    orderList.innerHTML = "";

    if (orders.length === 0) {
        orderList.innerHTML = "<li class='list-group-item'>No orders placed yet.</li>";
    } else {
        orders.forEach((order, index) => {
            const orderItem = document.createElement("li");
            orderItem.classList.add("list-group-item");
            orderItem.innerText = `Order ${index + 1}: ${order.items.map(item => item.name).join(', ')} - Total: ₹${order.total} - Delivery Date: ${order.deliveryDate}`;
            orderList.appendChild(orderItem);
        });
    }

    // Show My Orders card and hide other views
    document.getElementById("my-orders-card").style.display = 'block';
    document.querySelector('.container').style.display = 'none';
});

document.getElementById("close-orders").addEventListener("click", () => {
    document.getElementById("my-orders-card").style.display = 'none';
    document.querySelector('.container').style.display = 'block';
});

document.getElementById("go-back").addEventListener("click", () => {
    document.getElementById("order-confirmation").style.display = 'none';
    document.querySelector('.container').style.display = 'block'; // Show the main container again
});

// Initialize the product display
renderProducts();
