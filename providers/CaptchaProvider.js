'use strict'

/*
 * adonis-captcha
 *
 * (c) Savaryn Yaroslav <yariksav@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

const { ServiceProvider } = require('@adonisjs/fold')

class CaptchaProvider extends ServiceProvider {
  /**
   * Register Captcha provider under `Adonis/Addons/Captcha`
   * namespace
   *
   * @method _registerCcaptcha
   *
   * @return {void}
   *
   * @private
   */
  _registerCaptcha () {
    this.app.singleton('Adonis/Addons/Captcha', (app) => {
      const Config = app.use('Adonis/Src/Config')

      const Captcha = require('../src/Captcha')
      return new Captcha(Config)
    })
    this.app.alias('Adonis/Addons/Captcha', 'Captcha')
  }

  /**
   * Register authinit middleware under `Adonis/Middleware/Captcha`
   * namespace.
   *
   * @method _registerCaptchaMiddleware
   *
   * @return {void}
   */
  _registerCaptchaMiddleware () {
    this.app.bind('Adonis/Middleware/Captcha', (app) => {
      const CaptchaMiddleware = require('../src/Middleware')
      return new CaptchaMiddleware(app.use('Adonis/Src/Config'), app.use('Adonis/Addons/Captcha'))
    })
  }
  /**
   * Register bindings
   *
   * @method register
   *
   * @return {void}
   */
  register () {
    this._registerCaptcha()
    this._registerCaptchaMiddleware()
  }
}

module.exports = CaptchaProvider
