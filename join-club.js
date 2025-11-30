document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault(); // prevents page reload

    alert("Your form has been submitted successfully!");

    // You can later send data to backend here.
});
