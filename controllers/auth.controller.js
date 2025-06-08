
const mailService = require('../service/mail.service')
const userModel = require('../models/user.model')


class AuthController {
	async login(req, res, next) {
		const { email } = req.body
		res.json({ email })
		try {
			const { email } = req.body
			await mailService.sendOtp(email)
			// const existUser = await userModel.findOne({ email })
			// if (existUser) {
			// 	throw BaseError.BadRequest('User already exist', [{ email: 'User already exist' }])
			// }
			// const createdUser = await userModel.create({ email })
			res.status(201).json({ email })
		} catch (error) {
			next(error)
		}
	}

	async verify(req, res, next) {
		const { email, otp } = req.body
		res.json({ email, otp })
	}
}

module.exports = new AuthController()