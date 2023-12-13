import * as http from 'node:http'
import mailTransporter from 'nodemailer'

const user = 'nodejs.257@gmail.com'
const pass = 'rbue qofn jtek ibot'

const transporter = mailTransporter.createTransport({
  service: 'Gmail',
  host:    'smtp.gmail.com',
  port:    465,
  secure:  true,
  auth:    { user, pass },
})

const MIME_TYPES = {
  default: 'application/octet-stream',
  html:    'text/html; charset=UTF-8',
  js:      'application/javascript',
  css:     'text/css',
  png:     'image/png',
  jpg:     'image/jpg',
  gif:     'image/gif',
  ico:     'image/x-icon',
  svg:     'image/svg+xml',
}

const PORT = 4000

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

transporter.sendMail(buildMailOptions(startOptions))

const check = async () => {
  try {
    const resp = await fetch(url)
    const json = await resp.json()

    const available = json.product.variants.nodes[0].quantityAvailable

    if (available) {
      await transporter.sendMail(buildMailOptions(successOptions))
    }
  } catch {
  }
}

check()


setInterval(check, TIMEOUT)

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': MIME_TYPES.html })
  res.write('<h1>Норма!</h1>')
  res.end()
})

server.listen(PORT)
