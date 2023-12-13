const mailer = require('./utils/mail-transporter')

const url     = 'https://nomadgoods.com/products/sport-band-ultra-strike?_data=routes%2F%28%24lang%29._frame.products.%24handle'
const TIMEOUT = 10 * 1000

const mailOptions = {
  from:    'nodejs.257@gmail.com',
  to:      'gdedat@gmail.com',
  subject: 'Это случилось!!!',
  html:    '<h1>Появился ремешок!</h1><br><b><a href="https://nomadgoods.com/products/sport-band-ultra-strike">Вот линка!</a></b>',
}

const check = async () => {
  try {
    const resp = await fetch(url)
    const json = await resp.json()

    const available = json.product.variants.nodes[0].quantityAvailable

    if (available) {
      mailer.sendMail(mailOptions)
    }
  } catch {
  }
}

check()

setInterval(check, TIMEOUT)
