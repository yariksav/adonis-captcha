'use strict'

const Captcha = require('../Captcha)

class CaptchaMiddleware {

  async handle ({ request, response }, next) {
    const token = request.input('recaptcha-token')
    await Captcha.validate(token)
    await next()
  }
}

module.exports = CaptchaMiddlewares