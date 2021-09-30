// js script to load on group page
// !! grab id from form handler in handlebars

const invitationFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const email = document.querySelector('#email').value.trim();
    const group_id= event.target;
  
    if (email && group_id) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/invitations', {
        method: 'POST',
        body: JSON.stringify({ email, group_id }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.replace(`/group/${group_id}`);
      } else {
        alert(response.statusText);
      }
    }
  };

  const postFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();
    const group_id= document.querySelector('#group-id');
  
    if (title && content && group_id) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ title, content, group_id}),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.replace(`/group/${group_id}`);
      } else {
        alert(response.statusText);
      }
    }
  };

  document
    .querySelector('.new-invitation')
    .addEventListener('submit', invitationFormHandler);

    document
    .querySelector('.new-post')
    .addEventListener('submit', postFormHandler);
  