// call the ticket layout
function buyTickets(){
    const ticketLayout = document.getElementById('ticket-layout')
    ticketLayout.scrollIntoView({behavior: 'smooth'})
}
// find each seat row class
const SeatRow = document.querySelectorAll('#seat-row .cell');
let seatsCount = 0;
let seatsLeft = 40; 
let totalPrice = 0;

for (let index = 0; index < SeatRow.length; index++) {
  const seat = SeatRow[index];
  seat.addEventListener("click", function(event) {
    if (!event.target.classList.contains('cell')) return;

    const backgroundColor = event.target.style.backgroundColor;

    if (backgroundColor === 'rgb(29, 209, 0)') {
      event.target.style.backgroundColor = '';
      event.target.style.color = 'black';
      seatsCount--;
      seatsLeft++; 

    //   remove deselected seats info
   
    const seatNumbers = document.getElementById('seat-number').getElementsByTagName('p');
    if(seatNumbers.length > 0) {
        seatNumbers[seatsCount].remove();
    }
    // remove deselected seats class status

    const seatClassElements = document.getElementById('seat-class').getElementsByTagName('p');
      if (seatClassElements.length > 0) {
        seatClassElements[seatsCount].remove();
      }

    // remove deselected seat's ticket price

      const ticketPriceElements = document.getElementById('ticket-price').getElementsByTagName('p');
      ticketPriceElements[seatsCount].remove(); 

    } else {

      if (seatsCount < 4 && seatsLeft > 0) { 
        event.target.style.backgroundColor = '#1DD100';
        event.target.style.color = 'white';
        seatsCount++;
        seatsLeft--; 
        totalPrice += 550;
        
        // Add seat number 
        const seatNumber = event.target.innerText;
        const p = document.createElement('p');
        p.innerText = seatNumber;
        document.getElementById('seat-number').appendChild(p);

        // Add seat class 'Economy'
        const ticketClassContainer = document.getElementById('seat-class');
        const seatClass = document.createElement('p');
        seatClass.innerText = 'Economy'
        ticketClassContainer.appendChild(seatClass)

        // Add ticket price information
        const ticketPriceContainer = document.getElementById('ticket-price');
        const ticketPrice = document.createElement('p');
        ticketPrice.innerText = '550'; // Ticket price is 550 BDT per ticket
        ticketPriceContainer.appendChild(ticketPrice);

      } else {
        alert('You can only select up to 4 seats.');
      }
    }

    // Display seats count
    document.getElementById('seat-amount').textContent = seatsCount;
    // Display seats left 
    document.getElementById('seat-left').textContent = seatsLeft;
    // Total Price
    document.getElementById('total-price').textContent = totalPrice.toFixed(2)
    // Grand Total
    document.getElementById('grand-total').textContent = totalPrice.toFixed(2)
    
  });
}

// Modal layout and setup for Apply button
const modal = document.getElementById('my_modal_6');
const closeButton = document.querySelector('.modal-action .btn');
const continueButton = document.getElementById('continue-btn');


closeButton.addEventListener('click', function() {
    modal.checked = false;
});

// Close the modal when clicking outside of it
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.checked = false;
    }
});

// When the user clicks the button to continue, redirect to the ticket purchase section
continueButton.addEventListener('click', function() {
    buyTickets()
    // location.reload()
});

function showModal() {
    modal.checked = true;
}

// Event listener for applying the coupon code
document.getElementById('apply-coupon').addEventListener('click', function() {
    const couponCodeInput = document.getElementById('coupon-code');
    const couponCode = couponCodeInput.value;

    // Check if the entered coupon code matches the expected value
    if (couponCode === 'NEW15'  ) {
        // Apply a discount of 15% to the total price
        const discount = totalPrice * 0.15;
        const grandTotal = totalPrice - discount;

        // Update the grand total display
        document.getElementById('grand-total').textContent = grandTotal.toFixed(2);

        // Show the modal
        showModal();

        // Reset the coupon code input field
        couponCodeInput.value = '';
        document.getElementById('apply-coupon').disabled = true;

    }else if(couponCode === 'Couple 20'){
        // Apply a discount of 20% to the total price
        const discount = totalPrice * 0.20;
        const grandTotal = totalPrice - discount;

        // Update the grand total display
        document.getElementById('grand-total').textContent = grandTotal.toFixed(2);

        // Show the modal
        showModal();

        // Reset the coupon code input field
        couponCodeInput.value = '';
        document.getElementById('apply-coupon').disabled = true;
    }
    
    else {
        // Display an error message if the entered coupon code is incorrect
        alert('Invalid coupon code. Please enter a valid code.');
    }
});











