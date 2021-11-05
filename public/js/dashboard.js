// script to load when on dashboard page

const invitationHandler = async event => {
	if (event.target.hasAttribute('data-id')) {
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
	}
};

const newGroupHandler = async event => {
	event.preventDefault();

	const name = document.querySelector('#group-title').value.trim();

	if (name) {
		try {
			const response = await fetch(`/api/groups`, {
				method: 'POST',
				body: JSON.stringify({ name }),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			if (response.ok) {
				document.location.reload();
			}
		} catch (err) {
			console.error(err);
		}
	}
};

document
	.querySelector('#invitation')
	.addEventListener('click', invitationHandler);

document
	.querySelector('.new-group')
	.addEventListener('submit', newGroupHandler);
