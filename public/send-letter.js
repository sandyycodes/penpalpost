document.addEventListener('DOMContentLoaded', function () {
    // Initialize EmailJS
    emailjs.init("uNI2cxUcdxtTH7ij3");

    
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
            const estimatedTimeDays = parseInt(distanceDataResponse.estimatedTime.split(' ')[0], 10);

            // Generate or fetch the UUID based on recipient's email
            const recipientUUID = await getOrCreateUUID(recipientEmail);

        
            const emailData = {
                sender_name: senderName,
                sender_email: senderEmail,
                sender_zip: senderZip,
                recipient_name: recipientName,
                recipient_email: recipientEmail,
                recipient_zip: recipientZip,
                letter_content: letterContent,
                distance,
                estimated_time: `${estimatedTimeDays} day(s)`,
                recipient_uuid: recipientUUID, // Send UUID in the email
            };

            // // Schedule email to be sent after  delay
            // const delayInMilliseconds = estimatedTimeDays * 60 * 1000; // Convert days to minutes, then to milliseconds
            // console.log("letter will be sent in ", estimatedTimeDays, "min(s)");
            // setTimeout(async () => {
            //     try {
            //         const emailResponse = await emailjs.send('service_vxxz8dc', 'template_u24ohpm', emailData);
            //         console.log('Email sent successfully after delay!', emailResponse);
            //     } catch (emailError) {
            //         console.error('Error sending email:', emailError);
            //     }
            // }, delayInMilliseconds);

            // Send email immediately
            try {
                const emailResponse = await emailjs.send('service_vxxz8dc', 'template_u24ohpm', emailData);
                console.log('Email sent successfully!', emailResponse);
            } catch (emailError) {
                console.error('Error sending email:', emailError);
            }


            // data for Mongodb
            const saveData = {
                senderName,
                senderEmail,
                senderZip,
                recipientName,
                recipientEmail,
                recipientZip,
                letterContent,
                distance,
                estimatedTime: `${estimatedTimeDays} day(s)`,
                recipientUUID, 
            };


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

 
            window.location.href = `confirmation.html?recipientUUID=${recipientUUID}&senderName=${senderName}&recipientName=${recipientName}&recipientEmail=${recipientEmail}&distance=${distance}&estimatedTime=${estimatedTimeDays} day(s)`;

        } catch (error) {
            console.error('Error during letter submission:', error);
            alert('There was an error submitting your letter. Please try again.');
        }
    });

  
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


