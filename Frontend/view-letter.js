document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const letterId = params.get('id');

    const fetchLetter = async () => {
        try {
            const response = await fetch(`http://localhost:3000/get-letter?id=${letterId}`);
            if (response.ok) {
                const letter = await response.json();
                const letterDetails = document.getElementById('letter-details');
                letterDetails.innerHTML = `
                    <h3>From: ${letter.senderName}</h3>
                    <h4>To: ${letter.recipientName}</h4>
                    <p><strong>Content:</strong> ${letter.letterContent}</p>
                    <p><strong>Distance:</strong> ${letter.distance}</p>
                    <p><strong>Estimated Time:</strong> ${letter.estimatedTime}</p>
                `;
            } else {
                console.error('Failed to fetch letter.');
            }
        } catch (error) {
            console.error('Error fetching letter:', error);
        }
    };

    // Fetch the letter data
    fetchLetter();

    // Go back to the mailbox
    document.getElementById('backBtn').addEventListener('click', () => {
        window.location.href = 'mailbox.html';
    });
});
