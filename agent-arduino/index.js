'use strict'

const five = require('johnny-five')
const platziverseAgent = require('../platziverse-agent')

let board = new five.Board()

const agent = new platziverseAgent({
  name: 'arduino/Sensor1',
  username: 'alex',
  interval: 1000,
  mqtt: {
    host: 'http://138.197.215.53'
  }
})

const agent1 = new platziverseAgent({
  name: 'arduino/Sensor2',
  username: 'alex',
  interval: 1000,
  mqtt: {
    host: 'http://138.197.215.53'
  }
})

board.on('ready', function () {
  let temp = 0, temp1 = 1

  const sensor = new five.Thermometer({
    controller: 'LM35',
    pin: 'A0'
  })

  const sensor1 = new five.Thermometer({
    controller: 'LM35',
    pin: 'A1'
  })

  const motor = new five.Motor({
    pin: 5
  });

  agent.addMetric('temperature', function () {
    return temp;
  })
  
  agent1.addMetric('temperature', function () {
    if(temp1 < 35){
      motor.start()
    }else{
      motor.stop()
    }
    return temp1;
  })

  sensor.on('change', function () {
    temp = this.celsius
  })
  sensor1.on('change', function () {
    temp1 = this.celsius
  })
  agent.connect()
  agent1.connect()
})
