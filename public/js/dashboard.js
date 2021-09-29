// script to load when on dashboard page
// note!!: use as a reference only to create and delete a grouo!

// create group
const newGroupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#group-name').value.trim();


  if (name ) {
    const response = await fetch(`/api/groupRoutes`, {
      method: 'POST',
      body: JSON.stringify({ name }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create group');
    }
  }
};

// delete group
const delGroupHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/groups/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete group');
    }
  }
};

// handle buttons
// document
//   .querySelector('.')
//   .addEventListener('submit', newGroupFormHandler);

// document
//   .querySelector('.')
//   .addEventListener('click', delHandler);
