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
          if @isFromTrustedCode and not @isSet
            '0'
          else
            if @isInsert
              @userId
            else if @isUpsert
              $setOnInsert: @userId
            else
              @unset()

        optional: true
        regEx: new RegExp "(" + SimpleSchema.RegEx.Id.source + ")|^0$"
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
          if @isFromTrustedCode and @isUpdate and not @isSet
            '0'
          else
            if @isUpdate
              @userId
            else
              @unset()

        denyInsert: true
        optional: true
        regEx: new RegExp "(" + SimpleSchema.RegEx.Id.source + ")|^0$"
        type: String

    @attachSchema new SimpleSchema definition

  else
    if Meteor.isServer
      @before.insert (userId, doc) ->
        if createdAt
          doc[createdAt] = new Date
        if createdBy and not doc.createdBy?
          userId ?= '0'
          doc[createdBy] = userId

      @before.update (userId, doc, fieldNames, modifier, options) ->
        $set = modifier.$set

        unless $set
          $set = {}

        if updatedAt
          $set[updatedAt] = new Date
        if updatedBy and not doc.updatedBy?
          userId ?= '0'
          $set[updatedBy] = userId

CollectionBehaviours.define 'timestampable', behaviour
