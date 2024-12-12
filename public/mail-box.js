document.addEventListener('DOMContentLoaded', () => {
    let userUUID = localStorage.getItem('userUUID'); // Get the UUID from localStorage if it exists

    // Fetch letters based on UUID
    const fetchLetters = async (uuid) => {
        try {
            const response = await fetch(`http://localhost:3000/fetch-letters-by-uuid?uuid=${uuid}`);
            if (response.ok) {
                const letters = await response.json();
                const lettersList = document.getElementById('letters-list');
                lettersList.innerHTML = '';

                if (letters.length > 0) {
                    // Display each letter
                    letters.forEach(letter => {
                        const letterDiv = document.createElement('div');
                        letterDiv.classList.add('letter');
                        letterDiv.innerHTML = `
                            <h3>From: ${letter.senderName}</h3>
                            <p>To: ${letter.recipientName}</p>
                            <p>Distance: ${letter.distance}</p>
                            <button class="view-btn" data-id="${letter._id}">View Letter</button>
                        `;
                        
                        letterDiv.querySelector('.view-btn').addEventListener('click', () => viewLetter(letter._id));
                        lettersList.appendChild(letterDiv);
                    });
                } else {
                    lettersList.innerHTML = '<p>No letters found for this UUID.</p>';
                }
            } else {
                console.error('Failed to fetch letters.');
            }
        } catch (error) {
            console.error('Error fetching letters:', error);
        }
    };

    // Fetch letters if UUID exists
    if (userUUID) {
        fetchLetters(userUUID);
    }

    // Handle form submission
    document.getElementById('uuid-form').addEventListener('submit', event => {
        event.preventDefault();
        userUUID = document.getElementById('uuid-input').value;
        localStorage.setItem('userUUID', userUUID); 
        fetchLetters(userUUID);

        // Show the refresh button after submitting the UUID
        document.getElementById('refreshLetters').style.display = 'inline-block';
    });

    document.getElementById('refreshLetters').addEventListener('click', () => {
        if (userUUID) {
            fetchLetters(userUUID);
        }
    });

    const viewLetter = (letterId) => {
        window.location.href = `view-letter.html?id=${letterId}`;
    };
});
