import { createLogger, format, transports } from 'winston'
import * as path from 'path'

const Logger = createLogger({
  format: format.combine(
    format.simple(),
    format.timestamp(),
    format.printf(info => `[${info.timestamp}] ${info.level} : ${info.message}`)
  ),
  transports: [
    new transports.File({
      maxsize: 51200000,
      maxFiles: 5,
      filename: path.resolve(__dirname, '../logs/api.log')
    })
  ]
})

export default Logger
