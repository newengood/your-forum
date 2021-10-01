// js script to load on group page

const invitationFormHandler = async event => {
	event.preventDefault();

	// Collect values from the new-invitation form
	const email = document.querySelector('#email').value.trim();
	const group_id = event.target.getAttribute('data-id');
	console.log(email, group_id);
	if (email && group_id) {
		// Send a POST request to the API endpoint
		const response = await fetch('/api/invitations', {
			method: 'POST',
			body: JSON.stringify({ email, group_id }),
			headers: { 'Content-Type': 'application/json' },
		});

		if (response.ok) {
			// If successful, redirect the browser to the profile page
			//document.location.replace(`/group/${group_id}`);
			alert('User invitation sent!');
		} else {
			alert(response.statusText);
		}
	}
};

const postFormHandler = async event => {
	event.preventDefault();

	// Collect values from the login form
	const title = document.querySelector('#post-title').value.trim();
	const content = document.querySelector('#post-content').value.trim();
	const group_id = event.target.getAttribute('data-id');

	if (title && content && group_id) {
		// Send a POST request to the API endpoint
		const response = await fetch('/api/posts', {
			method: 'POST',
			body: JSON.stringify({ title, content, group_id }),
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

const topicButtonHandler = async (group_id, topic_id) => {
	if (group_id && topic_id) {
		try {
			const response = await fetch(`/group/${group_id}/topic/${topic_id}`, {
				method: 'GET',
			});

			if (response.ok) {
				const html = await response.text();
				document.querySelector('html').innerHTML = html;
			}
		} catch (err) {
			console.error(err);
		}
	}
};

document
	.querySelector('.new-invitation')
	.addEventListener('submit', invitationFormHandler);

document.querySelector('.new-post').addEventListener('submit', postFormHandler);
