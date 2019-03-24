'use stric'
const debug = require('debug')('platziverse:db:setup')
const db = require('./')
const inquirer = require('inquirer')
const chalk = require('chalk')

const prompt = inquirer.createPromptModule()
async function setup () {
  if (process.argv[2] === '--yes' || process.argv[2] === '--y') {
    resetDB()
  } else {
    const answer = await prompt([{
      type: 'confirm',
      name: 'setup',
      message: 'this will destroy your database, are you sure?'
    }])
    if (!answer.setup) {
      return console.log('Nothing happend :)')
    }
    resetDB()
  }
}

async function resetDB() {
  const config = {
    database: process.env.DB_NAME || 'platziverse',
    username: process.env.DB_USER || 'platzi',
    password: process.env.DB_PASS || 'platzi',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: s => debug(s),
    setup: true
  }

  await db(config).catch(handleFatalEror)

  console.log('Success!')
  process.exit(0)
}

function handleFatalEror(err) {
  console.error(`${chalk.red('[faltal error]')} ${err.mesaage}`)
  console.error(err.stack)
  process.exit(1)
}
setup()