document.addEventListener('DOMContentLoaded', function () {
    // Initialize EmailJS
    emailjs.init("IWYidU1PxGPPkjelA");

    // Form submission handler
    document.getElementById('sendLetterForm').addEventListener('submit', async function (event) {
        event.preventDefault(); // Prevent form submission reload

        // Collect form inputs
        const senderName = document.getElementById('senderName').value;
        const senderEmail = document.getElementById('senderEmail').value;
        const senderZip = document.getElementById('senderZip').value.trim();
        const recipientName = document.getElementById('recipientName').value;
        const recipientEmail = document.getElementById('recipientEmail').value;
        const recipientZip = document.getElementById('recipientZip').value.trim();
        const letterContent = document.getElementById('letterContent').value;

        // Data to send to the server for distance calculation
        const distanceData = {
            senderZip: senderZip,
            recipientZip: recipientZip
        };

        try {
            // Fetch the distance from the backend
            const response = await fetch('http://localhost:3000/get-distance', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(distanceData),
            });

            const data = await response.json();
            const distance = data.distance; // Distance received from the backend

            // Include the calculated distance in the email data
            const emailData = {
                sender_name: senderName,
                sender_email: senderEmail,
                sender_zip: senderZip,
                recipient_name: recipientName,
                recipient_email: recipientEmail,
                recipient_zip: recipientZip,
                letter_content: letterContent,
                distance: distance // Send the calculated distance with the email
            };

            // Send email using EmailJS
            const emailResponse = await emailjs.send('service_ge2rvyx', 'template_b0xlp7x', emailData);
            console.log('Email sent successfully!', emailResponse);
            alert('Your letter has been sent successfully!');
        } catch (error) {
            console.error('Error during form submission:', error);
            alert('There was an error sending your letter. Please try again later.');
        }
    });
});



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

//         // Data to send via EmailJS
//         const emailData = {
//             sender_name: senderName,
//             sender_email: senderEmail,
//             sender_zip: senderZip,
//             recipient_name: recipientName,
//             recipient_email: recipientEmail,
//             recipient_zip: recipientZip,
//             letter_content: letterContent,
//         };

//         try {
//             // Send email using EmailJS
//             const emailResponse = await emailjs.send('service_ge2rvyx', 'template_b0xlp7x', emailData);
//             console.log('Email sent successfully!', emailResponse);
//             alert('Your letter has been sent successfully!');
//         } catch (error) {
//             console.error('Error during form submission:', error);
//             alert('There was an error sending your letter. Please try again later.');
//         }

//         // Fetch distance from the backend
//         try {

//             const response = await fetch('http://localhost:3000/get-distance', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ senderZip, recipientZip })
//             });

//             // const response = await fetch('/get-distance', {
//             //     method: 'POST',
//             //     headers: {
//             //         'Content-Type': 'application/json'
//             //     },
//             //     body: JSON.stringify({ senderZip, recipientZip })
//             // });

//             const data = await response.json();

//             if (data.error) {
//                 console.error('Error:', data.error);
//                 alert('There was an issue calculating the distance.');
//             } else {
//                 console.log('Distance:', data.distance);
//                 alert('Distance: ' + data.distance);
//             }
//         } catch (error) {
//             console.error('Error calculating distance:', error);
//             document.getElementById('distanceResult').textContent = 'Error calculating distance.';
//         }
//     });
// });
