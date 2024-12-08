document.addEventListener('DOMContentLoaded', function () {
    // Initialize EmailJS
    emailjs.init("IWYidU1PxGPPkjelA"); // Replace with your actual EmailJS user ID

    // Form submission handler
    document.getElementById('sendLetterForm').addEventListener('submit', async function (event) {
        event.preventDefault(); // Prevent form reload on submission

        // Collect form inputs
        const senderName = document.getElementById('senderName').value;
        const senderEmail = document.getElementById('senderEmail').value;
        const senderZip = document.getElementById('senderZip').value.trim();
        const recipientName = document.getElementById('recipientName').value;
        const recipientEmail = document.getElementById('recipientEmail').value;
        const recipientZip = document.getElementById('recipientZip').value.trim();
        const letterContent = document.getElementById('letterContent').value;

        const distanceData = { senderZip, recipientZip };

        try {
            // Fetch distance and estimated time from the server
            const response = await fetch('http://localhost:3000/get-distance', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(distanceData),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch distance data from the server');
            }

            const data = await response.json();
            const distance = data.distance; // Distance in miles
            const estimatedTime = data.estimatedTime; // The calculated estimated time from server

            // Display the calculated distance and estimated time
            document.getElementById('distanceResult').textContent =
                `The mail will travel approximately ${distance} miles and may take an estimated ${estimatedTime}.`;

            // Send the email with the calculated data
            const emailData = {
                sender_name: senderName,
                sender_email: senderEmail,
                sender_zip: senderZip,
                recipient_name: recipientName,
                recipient_email: recipientEmail,
                recipient_zip: recipientZip,
                letter_content: letterContent,
                distance,
                estimated_time: estimatedTime,
            };

            const emailResponse = await emailjs.send('service_ge2rvyx', 'template_b0xlp7x', emailData);
            console.log('Email sent successfully!', emailResponse);
            alert('Your letter has been sent successfully!');
        } catch (error) {
            console.error('Error during form submission:', error.message);
            alert('There was an error processing your request. Please try again later.');
        }
    });
});


// document.addEventListener('DOMContentLoaded', function () {
//     // Initialize EmailJS
//     emailjs.init("IWYidU1PxGPPkjelA"); // Replace with your actual EmailJS user ID

//     // Form submission handler
//     document.getElementById('sendLetterForm').addEventListener('submit', async function (event) {
//         event.preventDefault(); // Prevent form reload on submission

//         // Collect form inputs
//         const senderName = document.getElementById('senderName').value;
//         const senderEmail = document.getElementById('senderEmail').value;
//         const senderZip = document.getElementById('senderZip').value.trim();
//         const recipientName = document.getElementById('recipientName').value;
//         const recipientEmail = document.getElementById('recipientEmail').value;
//         const recipientZip = document.getElementById('recipientZip').value.trim();
//         const letterContent = document.getElementById('letterContent').value;

//         const distanceData = { senderZip, recipientZip };

//         try {
//             // Fetch distance and estimated time from the server
//             const response = await fetch('http://localhost:3000/get-distance', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(distanceData),
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to fetch distance data from the server');
//             }

//             const data = await response.json();
//             const distance = data.distance; // Distance in miles
//             let estimatedTime = data.estimatedTime;

//             // Define the max distance and realistic max delivery time
//             const maxDistance = 2900; // Maximum believable distance (e.g., 2900 miles)

//             // Check if the distance exceeds maxDistance
//             if (distance > maxDistance) {
//                 // Generate a random number between 10 and 14 for delivery time
//                 estimatedTime = Math.floor(Math.random() * 5) + 10; // Random number between 10 and 14
//             } else {
//                 // Determine the delivery time based on the distance
//                 if (distance <= 2000) {
//                     estimatedTime = "3-5 days";
//                 } else if (distance > 2000 && distance <= 2900) {
//                     estimatedTime = "5-7 days";
//                 } else {
//                     estimatedTime = "7-10 days";
//                 }
//             }

//             // Display the calculated distance and estimated time
//             document.getElementById('distanceResult').textContent =
//                 `The mail will travel approximately ${distance} miles and may take an estimated ${estimatedTime} days to arrive.`;

//             // Send the email with the calculated data
//             const emailData = {
//                 sender_name: senderName,
//                 sender_email: senderEmail,
//                 sender_zip: senderZip,
//                 recipient_name: recipientName,
//                 recipient_email: recipientEmail,
//                 recipient_zip: recipientZip,
//                 letter_content: letterContent,
//                 distance,
//                 estimated_time: estimatedTime,
//             };

//             const emailResponse = await emailjs.send('service_ge2rvyx', 'template_b0xlp7x', emailData);
//             console.log('Email sent successfully!', emailResponse);
//             alert('Your letter has been sent successfully!');
//         } catch (error) {
//             console.error('Error during form submission:', error.message);
//             alert('There was an error processing your request. Please try again later.');
//         }
//     });
// });






// document.addEventListener('DOMContentLoaded', function () {
//     // Initialize EmailJS
//     emailjs.init("IWYidU1PxGPPkjelA"); // Replace with your actual EmailJS user ID

//     // Form submission handler
//     document.getElementById('sendLetterForm').addEventListener('submit', async function (event) {
//         event.preventDefault(); // Prevent form reload on submission

//         // Collect form inputs
//         const senderName = document.getElementById('senderName').value;
//         const senderEmail = document.getElementById('senderEmail').value;
//         const senderZip = document.getElementById('senderZip').value.trim();
//         const recipientName = document.getElementById('recipientName').value;
//         const recipientEmail = document.getElementById('recipientEmail').value;
//         const recipientZip = document.getElementById('recipientZip').value.trim();
//         const letterContent = document.getElementById('letterContent').value;

//         const distanceData = { senderZip, recipientZip };

//         try {
//             // Fetch distance and estimated time from the server
//             const response = await fetch('http://localhost:3000/get-distance', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(distanceData),
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to fetch distance data from the server');
//             }

//             const data = await response.json();
//             const distance = data.distance; // Distance in miles
//             let estimatedTime = data.estimatedTime;

//             // Define the max distance and realistic max delivery time
//             const maxDistance = 2900; // Maximum believable distance (e.g., 2900 miles)
            
//             // Check if the distance exceeds maxDistance
//             if (distance > maxDistance) {
//                 // Generate a random number between 10 and 14 for delivery time
//                 estimatedTime = Math.floor(Math.random() * 5) + 10; // Random number between 10 and 14
//             }

//             // Display the calculated distance and estimated time
//             document.getElementById('distanceResult').textContent =
//                 `The mail will travel approximately ${distance} miles and may take an estimated ${estimatedTime} days to arrive.`;

//             // Send the email with the calculated data
//             const emailData = {
//                 sender_name: senderName,
//                 sender_email: senderEmail,
//                 sender_zip: senderZip,
//                 recipient_name: recipientName,
//                 recipient_email: recipientEmail,
//                 recipient_zip: recipientZip,
//                 letter_content: letterContent,
//                 distance,
//                 estimated_time: estimatedTime,
//             };

//             const emailResponse = await emailjs.send('service_ge2rvyx', 'template_b0xlp7x', emailData);
//             console.log('Email sent successfully!', emailResponse);
//             alert('Your letter has been sent successfully!');
//         } catch (error) {
//             console.error('Error during form submission:', error.message);
//             alert('There was an error processing your request. Please try again later.');
//         }
//     });
// });



// document.addEventListener('DOMContentLoaded', function () {
//     // Initialize EmailJS
//     emailjs.init("IWYidU1PxGPPkjelA"); // Replace with your actual EmailJS user ID

//     // Form submission handler
//     document.getElementById('sendLetterForm').addEventListener('submit', async function (event) {
//         event.preventDefault(); // Prevent form reload on submission

//         // Collect form inputs
//         const senderName = document.getElementById('senderName').value;
//         const senderEmail = document.getElementById('senderEmail').value;
//         const senderZip = document.getElementById('senderZip').value.trim();
//         const recipientName = document.getElementById('recipientName').value;
//         const recipientEmail = document.getElementById('recipientEmail').value;
//         const recipientZip = document.getElementById('recipientZip').value.trim();
//         const letterContent = document.getElementById('letterContent').value;

//         const distanceData = { senderZip, recipientZip };

//         try {
//             // Fetch distance and estimated time from the server
//             const response = await fetch('http://localhost:3000/get-distance', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(distanceData),
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to fetch distance data from the server');
//             }

//             const data = await response.json();

//             // Check if the server returned valid data
//             if (!data.distance || !data.estimatedTime) {
//                 throw new Error('Invalid distance or estimated time received from the server');
//             }

//             const distance = data.distance;
//             const estimatedTime = data.estimatedTime;

//             // Display the calculated distance and estimated time
//             document.getElementById('distanceResult').textContent =
//                 `The mail will travel approximately ${distance} and may take an estimated ${estimatedTime} to arrive.`;

//             // Send the email with the calculated data
//             const emailData = {
//                 sender_name: senderName,
//                 sender_email: senderEmail,
//                 sender_zip: senderZip,
//                 recipient_name: recipientName,
//                 recipient_email: recipientEmail,
//                 recipient_zip: recipientZip,
//                 letter_content: letterContent,
//                 distance,
//                 estimated_time: estimatedTime,
//             };

//             const emailResponse = await emailjs.send('service_ge2rvyx', 'template_b0xlp7x', emailData);
//             console.log('Email sent successfully!', emailResponse);
//             alert('Your letter has been sent successfully!');
//         } catch (error) {
//             console.error('Error during form submission:', error.message);
//             alert('There was an error processing your request. Please try again later.');
//         }
//     });
// });



// document.addEventListener('DOMContentLoaded', function () {
//     // Initialize EmailJS
//     emailjs.init("IWYidU1PxGPPkjelA"); // Replace with your actual EmailJS user ID

//     // Form submission handler
//     document.getElementById('sendLetterForm').addEventListener('submit', async function (event) {
//         event.preventDefault(); // Prevent form reload on submission

//         // Collect form inputs
//         const senderName = document.getElementById('senderName').value;
//         const senderEmail = document.getElementById('senderEmail').value;
//         const senderZip = document.getElementById('senderZip').value.trim();
//         const recipientName = document.getElementById('recipientName').value;
//         const recipientEmail = document.getElementById('recipientEmail').value;
//         const recipientZip = document.getElementById('recipientZip').value.trim();
//         const letterContent = document.getElementById('letterContent').value;

//         const distanceData = { senderZip, recipientZip };

//         try {
//             // Fetch distance and estimated time from the server
//             const response = await fetch('http://localhost:3000/get-distance', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(distanceData),
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to fetch distance data from the server');
//             }

//             const data = await response.json();
//             const distance = data.distance;
//             const estimatedTime = data.estimatedTime;

//             // Display the calculated distance and estimated time
//             document.getElementById('distanceResult').textContent =
//                 `The mail will travel approximately ${distance} and may take an estimated ${estimatedTime} to arrive.`;

//             // Send the email with the calculated data
//             const emailData = {
//                 sender_name: senderName,
//                 sender_email: senderEmail,
//                 sender_zip: senderZip,
//                 recipient_name: recipientName,
//                 recipient_email: recipientEmail,
//                 recipient_zip: recipientZip,
//                 letter_content: letterContent,
//                 distance,
//                 estimated_time: estimatedTime,
//             };

//             const emailResponse = await emailjs.send('service_ge2rvyx', 'template_b0xlp7x', emailData);
//             console.log('Email sent successfully!', emailResponse);
//             alert('Your letter has been sent successfully!');
//         } catch (error) {
//             console.error('Error during form submission:', error.message);
//             alert('There was an error processing your request. Please try again later.');
//         }
//     });
// });


// document.addEventListener('DOMContentLoaded', function () {
//     // Initialize EmailJS
//     emailjs.init("IWYidU1PxGPPkjelA");

//     // Form submission handler
//     document.getElementById('sendLetterForm').addEventListener('submit', async function (event) {
//         event.preventDefault(); // Prevent form submission reload

//         // Collect form inputs
//         const senderName = document.getElementById('senderName').value;
//         const senderEmail = document.getElementById('senderEmail').value;
//         const senderZip = document.getElementById('senderZip').value.trim();
//         const recipientName = document.getElementById('recipientName').value;
//         const recipientEmail = document.getElementById('recipientEmail').value;
//         const recipientZip = document.getElementById('recipientZip').value.trim();
//         const letterContent = document.getElementById('letterContent').value;

//         const distanceData = { senderZip, recipientZip };

//         try {
//             // Fetch distance and estimated time from the backend
//             const response = await fetch('http://localhost:3000/get-distance', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(distanceData),
//             });

//             const data = await response.json();
//             const distance = data.distance;
//             const estimatedTime = data.estimatedTime;

//             // Display the calculated distance and estimated time
//             document.getElementById('distanceResult').textContent = 
//                 `The mail will travel approximately ${distance} and may take an estimated ${estimatedTime} to arrive.`;

//             // Send the email with the distance and estimated time included
//             const emailData = {
//                 sender_name: senderName,
//                 sender_email: senderEmail,
//                 sender_zip: senderZip,
//                 recipient_name: recipientName,
//                 recipient_email: recipientEmail,
//                 recipient_zip: recipientZip,
//                 letter_content: letterContent,
//                 distance,
//                 estimated_time: estimatedTime,
//             };

//             const emailResponse = await emailjs.send('service_ge2rvyx', 'template_b0xlp7x', emailData);
//             console.log('Email sent successfully!', emailResponse);
//             alert('Your letter has been sent successfully!');
//         } catch (error) {
//             console.error('Error during form submission:', error);
//             alert('There was an error sending your letter. Please try again later.');
//         }
//     });
// });
