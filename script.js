document.getElementById('rating').addEventListener('click', function (e) {
    if (e.target.tagName === 'SPAN') {
        // Get the clicked star's value
        const rating = e.target.getAttribute('data-value');

        // Update hidden input value
        document.getElementById('ratingValue').value = rating;

        // Highlight selected stars
        Array.from(this.children).forEach(star => {
            star.classList.remove('selected');
            if (star.getAttribute('data-value') <= rating) {
                star.classList.add('selected');
            }
        });
    }
});

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
        if (feedback.rating <= 3) {
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
