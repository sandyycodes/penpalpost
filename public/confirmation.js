document.addEventListener('DOMContentLoaded', function () {
    // Extract URL parameters and set to null if unknown
    const urlParams = new URLSearchParams(window.location.search);
    const senderName = urlParams.get('senderName') || 'Sender';  
    const recipientName = urlParams.get('recipientName') || 'Recipient';  
    const recipientEmail = urlParams.get('recipientEmail') || 'email@example.com';  
    const distance = urlParams.get('distance') || 'Unknown';  
    const estimatedTime = urlParams.get('estimatedTime') || 'Unknown';  

    console.log('Recipient Email:', recipientEmail);

    document.getElementById('confirmationMessage').innerHTML = `
        <h2>Letter Sent Successfully!</h2>
        <p>${senderName}, your letter has been delivered to <strong>${recipientName}</strong> at <strong>${recipientEmail}</strong>, and they will receive an email notification when the letter arrives.</p>
        <p>The letter will travel a distance of <strong>${distance}</strong>.</p>
        <p>The estimated time for delivery is <strong>${estimatedTime}</strong>.</p>
    `;

    const sendAnotherButton = document.createElement('button');
    sendAnotherButton.textContent = 'Send Another Letter';
    sendAnotherButton.classList.add('send-another-btn');
    sendAnotherButton.addEventListener('click', function () {
        window.location.href = 'send-letter.html';
    });

    document.getElementById('confirmationMessage').appendChild(sendAnotherButton);
});
