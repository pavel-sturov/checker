const mailer = require('./utils/mail-transporter')

const url     = 'https://nomadgoods.com/products/sport-band-ultra-strike?_data=routes%2F%28%24lang%29._frame.products.%24handle'
const TIMEOUT = 10 * 1000

const startOptions = {
  subject: 'Сервер запущен.',
  html:    '<h1>Сервер запущен, как только ремешок появится - вы получите уведомление.</h1>',
}

const successOptions = {
  subject: 'Это случилось!!!',
  html:    '<h1>Появился ремешок!</h1><br><b><a href="https://nomadgoods.com/products/sport-band-ultra-strike">Вот линка!</a></b>',
}

const buildMailOptions = ({ subject, html }) => ({
  from: 'nodejs.257@gmail.com',
  to:   'gdedat@gmail.com',
  subject,
  html,
})

mailer.sendMail(buildMailOptions(startOptions))

const check = async () => {
  try {
    const resp = await fetch(url)
    const json = await resp.json()

    const available = json.product.variants.nodes[0].quantityAvailable

    if (available) {
      await mailer.sendMail(buildMailOptions(successOptions))
    }
  } catch {
  }
}

check()

setInterval(check, TIMEOUT)
