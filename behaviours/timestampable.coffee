c2 = Package['aldeed:collection2']
ss = Package['aldeed:simple-schema']

defaults =
  createdAt: 'createdAt'
  createdBy: 'createdBy'
  updatedAt: 'updatedAt'
  updatedBy: 'updatedBy'

behaviour = (options = {}) ->

  {clientOnly, createdAt, createdBy, updatedAt, updatedBy} =
    _.defaults options, defaults

  if c2? and ss?
    SimpleSchema = ss.SimpleSchema

    definition = {}

    if createdAt
      definition[createdAt] =
        optional: true
        type: Date

    if createdBy
      definition[createdBy] =
        optional: true
        regEx: new RegExp "(#{SimpleSchema.RegEx.Id.source})|^0$"
        type: String

    if updatedAt
      definition[updatedAt] =
        denyInsert: true
        optional: true
        type: Date

    if updatedBy
      definition[updatedBy] =
        denyInsert: true
        optional: true
        regEx: new RegExp "(#{SimpleSchema.RegEx.Id.source})|^0$"
        type: String

    @attachSchema new SimpleSchema definition

  isLocalCollection = @_connection is null

  if Meteor.isServer or isLocalCollection
    @before.insert (userId = '0', doc) ->
      if createdAt
        doc[createdAt] = new Date
      if createdBy and not doc[createdBy]?
        doc[createdBy] = userId

    @before.update (userId = '0', doc, fieldNames, modifier, options) ->
      $set = modifier.$set ?= {}

      if updatedAt
        $set[updatedAt] = new Date
      if updatedBy and not doc[updatedBy]?
        $set[updatedBy] = userId

CollectionBehaviours.define 'timestampable', behaviour
