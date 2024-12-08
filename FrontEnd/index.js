document.addEventListener('DOMContentLoaded', function() {
    //emailjs.init("uNI2cxUcdxtTH7ij3");
    emailjs.init("IWYidU1PxGPPkjelA");

    document.getElementById('sendLetterForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const senderName = document.getElementById('senderName').value;
        const senderEmail = document.getElementById('senderEmail').value;
        const senderZip = document.getElementById('senderZip').value;
        const recipientName = document.getElementById('recipientName').value;
        const recipientEmail = document.getElementById('recipientEmail').value;
        const letterContent = document.getElementById('letterContent').value;
      
        // The data object that will be sent in the email
        const emailData = {
          sender_name: senderName,
          sender_email: senderEmail,
          recipient_name: recipientName,
          recipient_email: recipientEmail,
          letter_content: letterContent,
        };
      
        // Send email using EmailJS
        //emailjs.send('service_vxxz8dc', 'template_u24ohpm', emailData)
        emailjs.send('service_ge2rvyx', 'template_b0xlp7x', emailData)
          .then(function(response) {
            console.log('Sent email successfully!', response);
            alert('Your letter has been sent!');
          }, function(error) {
            console.log('Failed to send email.', error);
            alert('There was an error sending your letter. Please try again later.');
          });
    });
      
});



// emailjs.init("uNI2cxUcdxtTH7ij3");

// document.getElementById('sendLetterForm').addEventListener('submit', function(event) {
//   event.preventDefault();  // Prevent form submission from reloading the page

//   const senderName = document.getElementById('senderName').value;
//   const senderEmail = document.getElementById('senderEmail').value;
//   //const senderZip = document.getElementById('senderZip').value;
//   const recipientName = document.getElementById('recipientZip').value;
//   const recipientEmail = document.getElementById('recipientEmail').value;
//   const letterContent = document.getElementById('letterContent').value;

//   // The data object that will be sent in the email
//   const emailData = {
//     sender_name: senderName,
//     sender_email: senderEmail,
//     recipient_name: recipientName,
//     recipient_email: recipientEmail,
//     letter_content: letterContent,
//   };

//   // Send email using EmailJS
//   emailjs.send('service_vxxz8dc', 'template_u24ohpm', emailData)
//     .then(function(response) {
//       console.log('Sent email successfully!', response);
//       alert('Your letter has been sent!');
//     }, function(error) {
//       console.log('Failed to send email.', error);
//       alert('There was an error sending your letter. Please try again later.');
//     });
// });
