const signupFormHandler = async (event) => {

    event.preventDefault();
  
    const email = document.querySelector('#email-sign-up').value.trim();
    const password = document.querySelector('#password-sign-up').value.trim();
  
    // if there is an email and password, it will go through the following process to check.
    if (email && password) {

      // an API call being saved inside a variable. This will run a post request to /api/users/signup
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      // if the api came back as true, it will take you to the / route
      if (response.ok) {
        document.location.replace('/');
      } else {
        console.log('Error');
        alert('Failed to log in');
      }
    }
  };
  

  // When the form is submitted, the function above will run.
  document
    .querySelector('.sign-up-form')
    .addEventListener('submit', signupFormHandler);
  