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

            // Generate or fetch the UUID based on recipient's email
            const recipientUUID = await getOrCreateUUID(recipientEmail);

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
                recipient_uuid: recipientUUID,  // Send UUID in the email
            };

            // Send email via EmailJS
            const emailResponse = await emailjs.send('service_ge2rvyx', 'template_b0xlp7x', emailData);
            console.log('Email sent successfully!', emailResponse);

            // Prepare data to save to MongoDB
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
                recipientUUID,  // Include UUID for recipient
            };

            // Save letter data to MongoDB (assumed backend API)
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
            //window.location.href = `confirmation.html?recipientUUID=${recipientUUID}`;
            // Redirect to confirmation page with query parameters
            window.location.href = `confirmation.html?recipientUUID=${recipientUUID}&senderName=${senderName}&recipientName=${recipientName}&recipientEmail=${recipientEmail}&distance=${distance}&estimatedTime=${estimatedTime}`;

        } catch (error) {
            console.error('Error during letter submission:', error);
            alert('There was an error submitting your letter. Please try again.');
        }
    });

    // Function to fetch or create UUID for recipient email
    async function getOrCreateUUID(recipientEmail) {
        try {
            const response = await fetch('http://localhost:3000/check-or-create-uuid', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ recipientEmail }),
            });

            if (!response.ok) {
                throw new Error('Failed to check or create UUID');
            }

            const data = await response.json();
            return data.uuid;
        } catch (error) {
            console.error('Error fetching or creating UUID:', error);
            throw new Error('Failed to fetch or create UUID');
        }
    }
});




// document.addEventListener('DOMContentLoaded', function () {
//     // Initialize EmailJS
//     emailjs.init("IWYidU1PxGPPkjelA");

//     // Form submission handler
//     document.getElementById('sendLetterForm').addEventListener('submit', async function (event) {
//         event.preventDefault();

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
//             const distanceResponse = await fetch('http://localhost:3000/get-distance', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(distanceData),
//             });

//             if (!distanceResponse.ok) {
//                 throw new Error('Failed to fetch distance data from the server');
//             }

//             const distanceDataResponse = await distanceResponse.json();
//             const distance = distanceDataResponse.distance;
//             const estimatedTime = distanceDataResponse.estimatedTime;

//             // Prepare email data
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

//             // Send email via EmailJS
//             const emailResponse = await emailjs.send('service_ge2rvyx', 'template_b0xlp7x', emailData);
//             console.log('Email sent successfully!', emailResponse);

//             // Save form data to MongoDB via the server
//             const saveData = {
//                 senderName,
//                 senderEmail,
//                 senderZip,
//                 recipientName,
//                 recipientEmail,
//                 recipientZip,
//                 letterContent,
//                 distance,
//                 estimatedTime,
//             };

//             // const saveResponse = await fetch('/save-letter', {
//             //     method: 'POST',
//             //     headers: { 'Content-Type': 'application/json' },
//             //     body: JSON.stringify(saveData),
//             // });

//             const saveResponse = await fetch('http://localhost:3000/save-letter', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(saveData),
//             });


//             if (!saveResponse.ok) {
//                 throw new Error('Failed to save letter to the database');
//             }

//             const saveResult = await saveResponse.json();
//             console.log('Letter saved successfully in MongoDB!', saveResult);

//             // Redirect to confirmation page with query parameters
//             window.location.href = `confirmation.html?senderName=${encodeURIComponent(senderName)}&recipientName=${encodeURIComponent(recipientName)}&recipientEmail=${encodeURIComponent(recipientEmail)}&distance=${encodeURIComponent(distance)}&estimatedTime=${encodeURIComponent(estimatedTime)}`;
//         } catch (error) {
//             console.error('Error during form submission:', error.message);
//             alert('There was an error processing your request. Please try again later.');
//         }
//     });
// });
