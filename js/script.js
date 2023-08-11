// Select all items in the cart
const items = document.querySelectorAll(".item");

// Select display elements for subtotal, delivery fee, and grand total
const subtotalDisplay = document.getElementById("subtotal");
const deliveryFeeDisplay = document.getElementById("delivery-fee");
const grandTotalDisplay = document.getElementById("grand-total");

// Select the dropdown element for area selection
const areaSelect = document.getElementById("area");

// Define delivery fees based on selected areas
const deliveryFees = {
  0: 0,
  1: 100,
  2: 200,
  3: 400,
  4: 500,
  5: 600,
};

// Iterate through each item in the cart
items.forEach((item) => {
  // Select buttons, displays, and other elements within each item
  const minusBtn = item.querySelector(".minus");
  const plusBtn = item.querySelector(".plus");
  const quantityDisplay = item.querySelector(".quantity");
  const itemPrice = parseInt(
    item.querySelector(".item-price").textContent.substring(1)
  );
  const itemTotalDisplay = item.querySelector(".item-total");
  const deleteBtn = item.querySelector(".delete-btn");
  const likeBtn = item.querySelector(".like-btn");

  // Initialize quantity and liked status for each item
  let quantity = parseInt(quantityDisplay.textContent);
  let liked = false;

  // Add event listener for decreasing quantity
  minusBtn.addEventListener("click", () => {
    if (quantity > 1) {
      quantity--;
      quantityDisplay.textContent = quantity;
      updateItemTotal(itemTotalDisplay, itemPrice, quantity);
      updateSubtotal();
      updateGrandTotal();
    }
  });

  // Add event listener for increasing quantity
  plusBtn.addEventListener("click", () => {
    quantity++;
    quantityDisplay.textContent = quantity;
    updateItemTotal(itemTotalDisplay, itemPrice, quantity);
    updateSubtotal();
    updateGrandTotal();
  });

  // Add event listener for deleting an item
  deleteBtn.addEventListener("click", () => {
    const itemTotal = parseInt(itemTotalDisplay.textContent.substring(1));
    subtotalDisplay.textContent = `₦${
      parseInt(subtotalDisplay.textContent.substring(1)) - itemTotal
    }`;
    updateGrandTotal();
    item.remove();
  });

  // Add event listener for toggling item like status
  likeBtn.addEventListener("click", () => {
    liked = !liked;
    if (liked) {
      likeBtn.querySelector("i").classList.add("fas");
      likeBtn.querySelector("i").classList.remove("far");
      likeBtn.querySelector("i").style.color = "red";
    } else {
      likeBtn.querySelector("i").classList.add("far");
      likeBtn.querySelector("i").classList.remove("fas");
      likeBtn.querySelector("i").style.color = "#ccc";
    }
  });
});

// Add event listener for area selection change
areaSelect.addEventListener("change", () => {
  const selectedArea = areaSelect.value;
  const deliveryFee = deliveryFees[selectedArea] || 0;
  deliveryFeeDisplay.textContent = deliveryFee;
  updateGrandTotal();
});

// Update the displayed item total based on price and quantity
function updateItemTotal(display, price, quantity) {
  const total = price * quantity;
  display.textContent = `₦${total}`;
}

// Update the displayed subtotal based on item totals
function updateSubtotal() {
  let subtotal = 0;
  items.forEach((item) => {
    const itemTotal = parseInt(
      item.querySelector(".item-total").textContent.substring(1)
    );
    subtotal += itemTotal;
  });
  subtotalDisplay.textContent = `₦${subtotal}`;
}

// Update the displayed grand total based on subtotal and delivery fee
function updateGrandTotal() {
  const subtotal = parseInt(subtotalDisplay.textContent.substring(1));
  const deliveryFee = parseInt(deliveryFeeDisplay.textContent);
  grandTotalDisplay.textContent = `₦${subtotal + deliveryFee}`;
}

// Initial calculations when the page loads
updateSubtotal();
updateGrandTotal();
