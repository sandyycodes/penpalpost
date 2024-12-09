document.addEventListener('DOMContentLoaded', function () {
    // Extract URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const senderName = urlParams.get('senderName') || 'Sender';  // Default to 'Sender' if null
    const recipientName = urlParams.get('recipientName') || 'Recipient';  // Default to 'Recipient' if null
    const recipientEmail = urlParams.get('recipientEmail') || 'email@example.com';  // Default if null
    const distance = urlParams.get('distance') || 'Unknown';  // Default to 'Unknown' if null
    const estimatedTime = urlParams.get('estimatedTime') || 'Unknown';  // Default to 'Unknown' if null

    // Log recipientEmail to check if it’s being correctly extracted
    console.log('Recipient Email:', recipientEmail);

    // Update the confirmation page content
    document.getElementById('confirmationMessage').innerHTML = `
        <h2>Letter Sent Successfully!</h2>
        <p>${senderName}, your letter has been delivered to <strong>${recipientName}</strong> at <strong>${recipientEmail}</strong>, and they will receive an email notification when the letter arrives.</p>
        <p>The letter will travel a distance of <strong>${distance}</strong>.</p>
        <p>The estimated time for delivery is <strong>${estimatedTime}</strong>.</p>
    `;

    // Add a button to allow users to send another letter
    const sendAnotherButton = document.createElement('button');
    sendAnotherButton.textContent = 'Send Another Letter';
    sendAnotherButton.classList.add('send-another-btn');
    sendAnotherButton.addEventListener('click', function () {
        window.location.href = 'send-letter.html';
    });

    // Append the button to the confirmation page
    document.getElementById('confirmationMessage').appendChild(sendAnotherButton);
});
