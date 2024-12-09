document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const letterId = params.get('id');  // Get the letter ID from the query string

const fetchLetter = async () => {
    try {
        // Use the new endpoint /fetch-letter-by-id
        const response = await fetch(`http://localhost:3000/fetch-letter-by-id?id=${letterId}`);
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

    
    fetchLetter();

    // Go back to the mailbox
    document.getElementById('backBtn').addEventListener('click', () => {
        window.location.href = 'mailbox.html';
    });
});
