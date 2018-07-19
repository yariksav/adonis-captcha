'use strict'

const Recaptcha2 = require('recaptcha2')
const Env = use('Env')
const GE = require('@adonisjs/generic-exceptions')

class Captcha {

  constructor (Config) {
    this._fake = false
    const siteKey = Config.get('services.recaptcha.siteKey') || Env.get('RECAPTCHA_SITE_KEY')
    const secretKey = Config.get('services.recaptcha.secretKey') || Env.get('RECAPTCHA_SECRET')
    this.recaptcha = new Recaptcha2 ({
      siteKey,
      secretKey
    })
  }

  fake () {
    this._fake = true
  }

  restore () {
    this._fake = false
  }

  async validate (token) {
    if (this._fake) {
      return true
    }
    if (!token) {
      throw new GE.HttpException('Recaptcha token not found', 401, 'E_INVALID_CAPTCHA')
    }
    try {
      await this.recaptcha.validate(token)
    } catch (e) {
      throw new GE.HttpException('Invalid captcha', 401, 'E_INVALID_CAPTCHA')
    }
    return true
  }
}

module.exports = Captcha