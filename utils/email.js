import nodemailer from 'nodemailer'
import nodemailerSendgrid from 'nodemailer-sendgrid'

export default class Email {
	constructor(user, url) {
		this.to = user.email
		this.url = url
		this.name = user.name
		this.from = process.env.EMAIL_FROM || 'default@test.com'
	}

	newTransport() {
		if (process.env.NODE_ENV == 'production') {
			// use sendgrid
			return nodemailer.createTransport(
				nodemailerSendgrid({ apiKey: process.env.SENDGRID_API_KEY })
			)
		} else {
			return nodemailer.createTransport({
				host: process.env.EMAIL_HOST,
				port: process.env.EMAIL_PORT,
				auth: {
					user: process.env.EMAIL_USERNAME,
					pass: process.env.EMAIL_PASSWORD,
				},
			})
		}
	}

	async send(template, subject) {
		const mailOptions = {
			from: this.from,
			to: this.to,
			subject,
			html: template === 'welcome' ? '<p>Welcome!</p>' : '<p>Default</p>',
			text: 'This is the plain text',
		}

		await this.newTransport().sendMail(mailOptions)
	}

	async sendWelcome() {
		await this.send('welcome', 'Welcome to the site!')
	}
}