document.addEventListener('DOMContentLoaded', () => {
    let userUUID = null; // To store the user's UUID

    // Function to fetch and display letters based on UUID
    const fetchLetters = async (uuid) => {
        try {
            const response = await fetch(`http://localhost:3000/get-letters?uuid=${uuid}`);
            if (response.ok) {
                const letters = await response.json();
                const lettersList = document.getElementById('letters-list');
                lettersList.innerHTML = ''; // Clear the existing list

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
                        // Add event listener for "View Letter"
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

    // Handle form submission
    document.getElementById('uuid-form').addEventListener('submit', event => {
        event.preventDefault();
        userUUID = document.getElementById('uuid-input').value;
        fetchLetters(userUUID);

        // Show the refresh button after submitting the UUID
        document.getElementById('refreshLetters').style.display = 'inline-block';
    });

    // Refresh letters list when the refresh button is clicked
    document.getElementById('refreshLetters').addEventListener('click', () => {
        if (userUUID) {
            fetchLetters(userUUID);
        }
    });

    // Function to handle the "View Letter" button click
    const viewLetter = (letterId) => {
        console.log(`View details for letter with ID: ${letterId}`);
        // Redirect to the view-letter.html page with the letterId as a query parameter
        window.location.href = `view-letter.html?id=${letterId}`;
    };
});



// document.addEventListener('DOMContentLoaded', () => {
//     let userUUID = null; // To store the user's UUID

//     // Function to fetch and display letters based on UUID
//     const fetchLetters = async (uuid) => {
//         try {
//             const response = await fetch(`http://localhost:3000/get-letters?uuid=${uuid}`);
//             if (response.ok) {
//                 const letters = await response.json();
//                 const lettersList = document.getElementById('letters-list');
//                 lettersList.innerHTML = ''; // Clear the existing list

//                 if (letters.length > 0) {
//                     // Display each letter
//                     letters.forEach(letter => {
//                         const letterDiv = document.createElement('div');
//                         letterDiv.classList.add('letter');
//                         letterDiv.innerHTML = `
//                             <h3>From: ${letter.senderName}</h3>
//                             <p>To: ${letter.recipientName}</p>
//                             <p>Distance: ${letter.distance}</p>
//                             <button class="view-btn" data-id="${letter._id}">View Letter</button>
//                         `;
//                         // Add event listener for "View Letter"
//                         letterDiv.querySelector('.view-btn').addEventListener('click', () => viewLetter(letter._id));
//                         lettersList.appendChild(letterDiv);
//                     });
//                 } else {
//                     lettersList.innerHTML = '<p>No letters found for this UUID.</p>';
//                 }
//             } else {
//                 console.error('Failed to fetch letters.');
//             }
//         } catch (error) {
//             console.error('Error fetching letters:', error);
//         }
//     };

//     // Handle form submission
//     document.getElementById('uuid-form').addEventListener('submit', event => {
//         event.preventDefault();
//         userUUID = document.getElementById('uuid-input').value;
//         fetchLetters(userUUID);

//         // Show the refresh button after submitting the UUID
//         document.getElementById('refreshLetters').style.display = 'inline-block';
//     });

//     // Refresh letters list when the refresh button is clicked
//     document.getElementById('refreshLetters').addEventListener('click', () => {
//         if (userUUID) {
//             fetchLetters(userUUID);
//         }
//     });

//     // Function to handle the "View Letter" button click
//     const viewLetter = (letterId) => {
//         console.log(`View details for letter with ID: ${letterId}`);
//         // You can add your view letter logic here (e.g., open a modal or navigate to a detailed page)
//     };
// });
