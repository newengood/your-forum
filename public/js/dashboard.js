// script to load when on dashboard page
// note!!: use as a reference only to create and delete a grouo!
// create two calls, one to create usergroup and one to delete invitation

// create group
// const newGroupFormHandler = async (event) => {
//   event.preventDefault();

//   const name = document.querySelector('#group-name').value.trim();


//   if (name ) {
//     const response = await fetch(`/api/groupRoutes`, {
//       method: 'POST',
//       body: JSON.stringify({ name }),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     if (response.ok) {
//       document.location.replace('/dashboard');
//     } else {
//       alert('Failed to create group');
//     }
//   }
// };

// delete group
// const delGroupHandler = async (event) => {
//   if (event.target.hasAttribute('data-id')) {
//     const id = event.target.getAttribute('data-id');

//     const response = await fetch(`/api/groups/${id}`, {
//       method: 'DELETE',
//     });

//     if (response.ok) {
//       document.location.replace('/dashboard');
//     } else {
//       alert('Failed to delete group');
//     }
//   }
// };

const invitationHandler = async (event) => {

  const id = event.target.getAttribute('data-id');


  const response = await fetch(`/api/invitations/${id}`, {
    method: 'DELETE',

  });
  if (response.ok) {

    const user_id = event.target.getAttribute('data-user');
    const group_id = event.target.getAttribute('data-group');


    const response = await fetch(`/api/usergroups`, {
      method: 'POST',
      body: JSON.stringify({ user_id, group_id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      alert('Deleted Invitation, and failed to add group membership');
    }
    document.location.reload();
  } else {
    alert('Failed to delete invitation');
  }




};

document
  .querySelector('#invitation')
  .addEventListener('click', invitationHandler);

// document
//   .querySelector('.')
//   .addEventListener('click', delHandler);
