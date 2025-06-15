const BaseError = require("../errors/base.error")




module.exports = async function (req, res, next) {
    try {
        const authorization = req.headers.authorization

        if (!authorization) {
            return next(BaseError.Unauthorized())
        }

        const token = authorization.split(' ')[1]
        if (!token) {
            return next(BaseError.Unauthorized())
        }

        const { userId } = JsonWebTokenError.verify(token, process.env.JWT_SECRET)
        if (!userId) {
            return next(BaseError.Unauthorized())
        }

        const user = await userModel.findById(userId)
        if (!user) {
            return next(BaseError.Unauthorized())
        }

        req.user = user
        next()
    } catch (error) {}
}