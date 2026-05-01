// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

const bookingForm = document.querySelector(".booking-form");

if (bookingForm) {
  const checkIn = document.getElementById("checkIn");
  const checkOut = document.getElementById("checkOut");
  const bookingNights = document.getElementById("bookingNights");
  const bookingTotal = document.getElementById("bookingTotal");
  const nightlyPrice = Number(bookingForm.dataset.nightlyPrice);
  const today = new Date().toISOString().split("T")[0];

  checkIn.min = today;
  checkOut.min = today;

  const formatINR = (amount) =>
    amount.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    });

  const updateBookingTotal = () => {
    if (!checkIn.value) {
      bookingNights.textContent = "Select dates";
      bookingTotal.textContent = formatINR(nightlyPrice);
      return;
    }

    checkOut.min = checkIn.value;

    if (!checkOut.value) {
      bookingNights.textContent = "Select checkout";
      bookingTotal.textContent = formatINR(nightlyPrice);
      return;
    }

    const start = new Date(checkIn.value);
    const end = new Date(checkOut.value);
    const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

    if (nights < 1) {
      bookingNights.textContent = "Choose valid dates";
      bookingTotal.textContent = formatINR(nightlyPrice);
      return;
    }

    bookingNights.textContent = `${nights} night${nights === 1 ? "" : "s"}`;
    bookingTotal.textContent = formatINR(nightlyPrice * nights);
  };

  checkIn.addEventListener("change", updateBookingTotal);
  checkOut.addEventListener("change", updateBookingTotal);
  updateBookingTotal();
}
