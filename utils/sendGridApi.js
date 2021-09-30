const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * Delivers an email to the recipient using SendGrid's V3 API via the '@sendgrid/mail' npm package.
 *
 * NOTE: Requires SENDGRID_API_KEY and SENDGRID_VERIFIED_USER environment variables.
 * @param {*} sendTo Recipient email address
 * @param {*} subject Email subject
 * @param {*} bodyText Email body plain-text
 * @param {*} bodyHTML Email body HTML
 */
function sendEmailNotification(sendTo, subject, bodyText, bodyHTML) {
	if (process.env.SENDGRID_VERIFIED_USER) {
		const msg = {
			to: sendTo,
			from: process.env.SENDGRID_VERIFIED_USER,
			subject: subject,
			text: bodyText,
			html: bodyHTML,
		};
		sgMail
			.send(msg)
			.then(() => {
				console.log('Email sent');
			})
			.catch(error => {
				console.error(error);
			});
	}
}

module.exports = { sendEmailNotification };
