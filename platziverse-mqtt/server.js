'use strict'

const debug = require('debug')('platziverse:mqqt')
const mosca = require('mosca')
const redis = require('redis')
const chalk = require('chalk')
const db = require('platziverse-db')
const backend = {
  type: 'redis',
  redis,
  return_buffers: true
}

const settings = {
  port: 1883,
  backend
}

const config = {
  database: process.env.DB_NAME || 'platziverse',
  username: process.env.DB_USER || 'platzi',
  password: process.env.DB_PASS || 'platzi',
  host: process.env.DB_HOST || 'localhost',
  dialect: 'postgres',
  logging: s => debug(s)
}

const server = new mosca.Server(settings)
let Agent 
let Metric

server.on('clientConnected', client => {
  debug(`Client Connected: ${client.id}`)
})

server.on('clientDisconnected', client => {
  debug(`client Disconnected: ${client.id}`)
})

server.on('published', (packet, client) => {
  debug(`Received : ${packet.topic}`)
  debug(`Pyaload: ${packet.payload}`)
})

server.on('ready', async () => {
  const services = await db(config).catch(handleFatalEror)
  Agent = services.Agent
  Metric = services.Metric
  console.log(`${chalk.green('[platziverse-mqtt]')} server is runnig`)
})

server.on('error', handleFatalEror)

function handleFatalEror (err) {
  console.error(`${chalk.red('[fatal error]')} ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}

process.on('uncaughtException', handleFatalEror)
process.on('unhandledRejection', handleFatalEror)
