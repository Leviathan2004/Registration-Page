const form = document.getElementById('registrationForm');
const message = document.getElementById('message');
const formMethod = form.method;
const formAction = form.action;

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const messageText = 'An error occurred. Please try again later.';

  try {
    const response = await fetch(formAction, {
      method: formMethod,
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (data.message === 'success') {
      message.textContent = 'Registration successful. Your information is stored.';
      form.reset();
      const redirectUrl = '/success.html';
      setTimeout(() => {
        window.location.href = redirectUrl;
      }, 3000); // Redirect to success.html after 3 seconds
    } else if (data.message === 'exists') {
      message.textContent = 'User with this information already exists.';
      const redirectUrl = '/already-signed-in.html';
      setTimeout(() => {
        window.location.href = redirectUrl;
      }, 3000); // Redirect to already-signed-in.html after 3 seconds
    } else {
      message.textContent = messageText;
    }
  } catch (error) {
    console.error('Error:', error);
    message.textContent = messageText;
  }
});

const messageElement = document.getElementById('message');
messageElement.textContent = '';