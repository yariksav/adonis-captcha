# Adonis Captcha Provider

This package helps you to use recaptcha in your project

## Setup

Install the package from npm

```npm
adonis install adonis-captcha
```

```javascript
const providers = [
  ...
  'adonis-captcha/providers/CaptchaProvider'
]
```

## Usage as middleware

Add row in start/kernel.js
```js
const namedMiddleware = {
  ...
  recaptcha: 'Adonis/Middleware/Captcha',
}
```
Then in your route

```js
  Route.post('account/register', 'AccountController.register').middleware(['recaptcha'])
```
## Use in tests

```js
const Captcha = use('Capptcha')

...

test('try to register new user', async ({ assert, client}) => {
  Captcha.fake()
  const user = await User.create(newUser)

  const response = await client.post('account/register')
    .send({
      username: 'test'
    })
    .end()

  response.assertStatus(200)

  Captcha.restore()
})
```

## Use directle
```js
const Captcha = use('Capptcha')
await Captcha.validate(request.input('recaptcha-token'))
```

validate will throw Error when recaphca is incorrect
