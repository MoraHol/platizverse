'use strict'

const agent = {
  id: 1,
  uuid: 'yyyy-yy-a',
  name: 'fixture',
  username: 'platzi',
  hostname: 'test-host',
  pid: 0,
  connected: true,
  createdAt: new Date(),
  updateAt: new Date()
}
const agents = [
  agent,
  extend(agent, {
    id: 2,
    uuid: 'yyyy_w',
    connected: false,
    username: 'test'
  }), extend(agent, {
    id: 3,
    uuid: 'yyyy_x'
  }),
  extend(agent, {
    id: 4,
    uuid: 'yyyy-z',
    username: 'test'
  })
]

function extend(obj, values) {
  const clone = Object.assign({}, obj)
  return Object.assign(clone, values)
}
module.exports = {
  single: agent,
  all: agents,
  connected: agents.filter(a => a.connected),
  platzi: agents.filter(a => a.username === 'platzi'),
  findByUuid: id => agents.filter(a => a.uuid === id).shift(),
  findById: id => agents.filter(a => a.id === id).shift()
}