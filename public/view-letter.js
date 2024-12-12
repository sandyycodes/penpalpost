document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const letterId = params.get('id');  

    const fetchLetter = async () => {
        try {
            const response = await fetch(`http://localhost:3000/fetch-letter-by-id?id=${letterId}`);
            if (response.ok) {
                const letter = await response.json();
                const letterDetails = document.getElementById('letter-details');
                letterDetails.innerHTML = `
                    <h3>From: ${letter.senderName}</h3>
                    <h3>To: ${letter.recipientName}</h3>
                    <p>${letter.letterContent}</p>
                    <p><strong>How Far Your Letter Has Traveled:</strong> ${letter.distance}</p>
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

    // Go back to mailbox
    document.getElementById('backBtn').addEventListener('click', () => {
        const userUUID = localStorage.getItem('userUUID');
        if (userUUID) {
            window.location.href = `mailbox.html?uuid=${userUUID}`; 
        } else {
            window.location.href = 'mailbox.html'; // Fallback if UUID is not found
        }
    });
});
