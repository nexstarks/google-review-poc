document.addEventListener("DOMContentLoaded", () => {
    const ratingStars = document.querySelectorAll("#rating span");
    const ratingValueInput = document.getElementById("ratingValue");

    // Handle star click event
    ratingStars.forEach(star => {
        star.addEventListener("click", () => {
            const selectedValue = star.getAttribute("data-value");

            // Highlight the selected stars
            ratingStars.forEach(s => {
                if (s.getAttribute("data-value") <= selectedValue) {
                    s.classList.add("selected");
                } else {
                    s.classList.remove("selected");
                }
            });

            // Set the hidden input value
            ratingValueInput.value = selectedValue;

            // Redirect immediately if 5-star is selected
            if (selectedValue >= 4) {
                window.location.href = "https://g.page/r/CR8Rr1ipSzokEBE/review";
            }
        });
    });

});
// Handle form submission
document.getElementById('feedbackForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const feedback = {
        rating: document.getElementById('ratingValue').value,
        name: document.getElementById('name').value,
        contact: document.getElementById('contact').value,
        thoughts: document.getElementById('thoughts').value
    };

    try {
        console.log('[INFO] Feedback:', feedback);
        if (feedback.name && feedback.contact) {
            if (Number(feedback.rating) <= 3) {
                fetch(`https://script.google.com/macros/s/AKfycbxhqLaOAG6TUie0aD_YwLZj_IsJ-kqAprv_SEv8m-A2AtfDNcLdu2M9ADqPLQ_FcPE1/exec`, {
                    redirect: "follow",
                    method: 'POST',
                    body: JSON.stringify(feedback),
                    headers: {
                        'Content-Type': "text/plain;charset=utf-8"
                    }
                })
                    .then(response => response.text())
                    .then(result => {
                        const res = JSON.parse(result);
                        alert(res.message);
                        document.getElementById('feedbackForm').reset();
                        resetRatingStars();
                        console.log(res);
                    });
            }
            else {
                alert("Thank you for your feedback!");
            }
        }
    } catch (error) {
        console.error('Error sending feedback:', error);
        alert('Failed to save feedback. Please try again later.');
    }
});

// Function to reset the rating stars
function resetRatingStars() {
    document.getElementById('ratingValue').value = ''; // Clear the hidden input
    Array.from(document.getElementById('rating').children).forEach(star => {
        star.classList.remove('selected');
    });
}