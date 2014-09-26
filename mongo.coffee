attach = share.attach
detach = share.detach

Mongo.Collection::attachBehaviour = ->
  attach.apply @, arguments

Mongo.Collection::detachBehaviour = ->
  detach.apply @, arguments
