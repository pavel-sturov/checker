import mailTransporter from 'nodemailer'

const user = 'nodejs.257@gmail.com'
const pass = 'rbue qofn jtek ibot'

export const transporter = mailTransporter.createTransport({
  service: 'Gmail',
  host:    'smtp.gmail.com',
  port:    465,
  secure:  true,
  auth:    { user, pass },
})
