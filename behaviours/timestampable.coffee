c2 = Package['aldeed:collection2']
ss = Package['aldeed:simple-schema']

if ss?
  SimpleSchema = ss.SimpleSchema

defaults =
  createdAt: 'createdAt'
  createdBy: 'createdBy'
  updatedAt: 'updatedAt'
  updatedBy: 'updatedBy'

behaviour = (options = {}) ->

  {createdAt, createdBy, updatedAt, updatedBy} = _.defaults options, defaults

  if c2? and ss?
    definition = {}

    if createdAt
      definition[createdAt] =
        autoValue: ->
          if @isInsert
            new Date
          else if @isUpsert
            $setOnInsert: new Date
          else
            @unset()

        type: Date

    if createdBy
      definition[createdBy] =
        autoValue: ->
          unless @isFromTrustedCode
            if @isInsert
              @userId
            else if @isUpsert
              $setOnInsert: @userId
            else
              @unset()

        regEx: SimpleSchema.RegEx.Id
        type: String

    if updatedAt
      definition[updatedAt] =
        autoValue: ->
          if @isUpdate
            new Date
          else
            @unset()

        denyInsert: true
        optional: true
        type: Date

    if updatedBy
      definition[updatedBy] =
        autoValue: ->
          unless @isFromTrustedCode
            if @isUpdate
              @userId
            else
              @unset()

        denyInsert: true
        optional: true
        regEx: SimpleSchema.RegEx.Id
        type: String

    @attachSchema new SimpleSchema definition

  else
    @before.insert (userId, doc) ->
      if createdAt
        doc[createdAt] = new Date
      if createdBy
        doc[createdBy] = userId

    @before.update (userId, doc, fieldNames, modifier, options) ->
      $set = modifier.$set

      unless $set
        $set = {}

      if updatedAt
        $set[updatedAt] = new Date

      if updatedBy
        $set[updatedBy] = userId

CollectionBehaviour.define 'timestampable', behaviour
