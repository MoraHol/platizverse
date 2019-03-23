'use strict'

const test = require('ava')
const proxyquire = require('proxyquire')
const sinon = require('sinon')
const agentFixtures = require('./fixtures/agent')
let db = null
let config = {
  logging: function () {}
}

let MetricStub = {
  belongsTo: sinon.spy()
}
let AgentStub = null
let sandbox = null
let single = Object.assign({}, agentFixtures.single)
let uuid = single.uuid
let id = 1
let uuidArgs = {
  where: {
    uuid
  }
}
test.beforeEach(async () => {
  sandbox = sinon.createSandbox()
  AgentStub = {
    hasMany: sandbox.spy()
  }
  // Model update Stub
AgentStub.update = sandbox.stub()
AgentStub.update.withArgs(single, uuidArgs).returns(Promise.resolve(single))
  // Model findOne Stub

  AgentStub.findOne = sandbox.stub()
  AgentStub.findOne.withArgs(uuidArgs).returns(Promise.resolve(agentFixtures.findByUuid(uuid)))
  // Model findbyId Stub
  AgentStub.findById = sandbox.stub()
  AgentStub.findById.withArgs(id).returns(Promise.resolve(agentFixtures.findById(id)))
  const setupDatabase = proxyquire('../', {
    './models/agent': () => AgentStub,
    './models/metric': () => MetricStub
  })
  db = await setupDatabase(config)
})

test.afterEach(() => {
  sandbox && sandbox.restore()
})

test('Agent', t => {
  t.truthy(db.Agent, 'Agent service should exist')
})

test.serial('Setup', t => {
  t.true(AgentStub.hasMany.called, 'AgentModel.hasMany was executed')
  t.true(AgentStub.hasMany.calledWith(MetricStub), 'Argument sholud be the MetricModel')
  t.true(MetricStub.belongsTo.called, 'MetricStub.belongsTo was executed')
  t.true(MetricStub.belongsTo.calledWith(AgentStub), 'Argument should be the AgentModel')
})

test.serial('Agent#findById', async t => {
  let agent = await db.Agent.findById(id)
  t.true(AgentStub.findById.called, 'findById sholud be called on model')
  t.true(AgentStub.findById.calledOnce, 'findById sholud be called once')
  t.true(AgentStub.findById.calledWith(id), 'findById sholud be called with id')
  t.deepEqual(agent, agentFixtures.findById(id), 'sholud be the same')
})

test.serial('Agent#createOrUpdate - exist', async t => {
  let agent = await db.Agent.createOrUpdate(single)
  t.true(AgentStub.findOne.called, 'findOne sholud be called on model')
  t.true(AgentStub.findOne.calledTwice, 'findOne sholud be called twice')
  t.true(AgentStub.update.calledOnce, 'update sholud be called once')
  t.deepEqual(agent, single, 'agent should be the same')
})