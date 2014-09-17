attach = share.attach

Mongo.Collection::attachBehaviour = ->
  attach.apply @, arguments
