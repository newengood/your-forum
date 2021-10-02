// js script to load on group page

const invitationFormHandler = async event => {
	event.preventDefault();

	// Collect values from the new-invitation form
	const email = document.querySelector('#email').value.trim();
	const group_id = event.target.getAttribute('data-id');

	if (email && group_id) {
		// Send a POST request to the API endpoint
		const response = await fetch('/api/invitations', {
			method: 'POST',
			body: JSON.stringify({ email, group_id }),
			headers: { 'Content-Type': 'application/json' },
		});

		if (response.ok) {
			// If successful, redirect the browser to the profile page
			alert('User invitation sent!');
		} else {
			alert(response.statusText);
		}
	}
};

const postFormHandler = async (event, topic_id) => {
	event.preventDefault();

	// Collect values from the login form
	const title = document.querySelector('#post-title').value.trim();
	const content = document.querySelector('#post-content').value.trim();

	const pathParts = document.URL.split('/');
	const groupId = pathParts[pathParts.length - 1];

	if (title && content && topic_id) {
		// Send a POST request to the API endpoint - Create the new post
		const response = await fetch('/api/posts', {
			method: 'POST',
			body: JSON.stringify({ title, content, topic_id }),
			headers: { 'Content-Type': 'application/json' },
		});

		if (response.ok) {
			// If successful, refresh the topic page to reload the new post.
			topicButtonHandler(groupId, topic_id);
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

const topicFormHandler = async (event) => {
	event.preventDefault();

	const name = document.querySelector('#new-topic').value.trim();
	const group_id = event.target.getAttribute('data-id');

	if (name && group_id) {
		try {
			const response = await fetch(`/api/topics/`, {
				method: 'POST',
				body: JSON.stringify({ name, group_id }),
				headers: { 'Content-Type': 'application/json' },
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
	.querySelector('.new-invitation')
	.addEventListener('submit', invitationFormHandler);

document
	.querySelector('.new-topic')
	.addEventListener('submit', topicFormHandler);


	