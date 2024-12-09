document.addEventListener('DOMContentLoaded', function () {
    // Initialize EmailJS
    emailjs.init("IWYidU1PxGPPkjelA");

    // Form submission handler
    document.getElementById('sendLetterForm').addEventListener('submit', async function (event) {
        event.preventDefault();

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
            const distanceResponse = await fetch('http://localhost:3000/get-distance', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(distanceData),
            });

            if (!distanceResponse.ok) {
                throw new Error('Failed to fetch distance data from the server');
            }

            const distanceDataResponse = await distanceResponse.json();
            const distance = distanceDataResponse.distance;
            const estimatedTime = distanceDataResponse.estimatedTime;

            // Prepare email data
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

            // Send email via EmailJS
            const emailResponse = await emailjs.send('service_ge2rvyx', 'template_b0xlp7x', emailData);
            console.log('Email sent successfully!', emailResponse);

            // Save form data to MongoDB via the server
            const saveData = {
                senderName,
                senderEmail,
                senderZip,
                recipientName,
                recipientEmail,
                recipientZip,
                letterContent,
                distance,
                estimatedTime,
            };

            // const saveResponse = await fetch('/save-letter', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(saveData),
            // });

            const saveResponse = await fetch('http://localhost:3000/save-letter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(saveData),
            });


            if (!saveResponse.ok) {
                throw new Error('Failed to save letter to the database');
            }

            const saveResult = await saveResponse.json();
            console.log('Letter saved successfully in MongoDB!', saveResult);

            // Redirect to confirmation page with query parameters
            window.location.href = `confirmation.html?senderName=${encodeURIComponent(senderName)}&recipientName=${encodeURIComponent(recipientName)}&recipientEmail=${encodeURIComponent(recipientEmail)}&distance=${encodeURIComponent(distance)}&estimatedTime=${encodeURIComponent(estimatedTime)}`;
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

