

## Installation

```js
adonis install adonis-captcha
```

## Registering provider

The provider is registered inside `start/app.js` file under `providers` array.

```js
const providers = [
  'adonis-captcha/providers/CaptchaProvider'
]
```

That's all! Now you can use the sms provider as follows.

```js

```

The `verify` is the view name stored inside the `resources/views/sms` directory.


## Activator module

## Configuration and Environment variables

The configuration file is saved as `config/smser.js`, feel free to tweak it according.

Also make sure to define sensitive driver details inside the `.env` file and reference them via `Env` provider.
