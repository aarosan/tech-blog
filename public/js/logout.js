const logout = async () => {

  console.log('Logout Clicked');

    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    
    console.log(response);
  
    if (response.ok) {
      console.log('Logout successful');
      document.location.replace('/login-page');
    } else {
      alert('Failed to log out');
    }
  };
  
  document.querySelector('#logout').addEventListener('click', logout);
  
  