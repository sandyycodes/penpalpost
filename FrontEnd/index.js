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

      // Data to send via EmailJS
      const emailData = {
          sender_name: senderName,
          sender_email: senderEmail,
          sender_zip: senderZip,
          recipient_name: recipientName,
          recipient_email: recipientEmail,
          recipient_zip: recipientZip,
          letter_content: letterContent,
      };

      try {
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
