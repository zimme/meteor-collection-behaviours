attach = share.attach

Mongo.Collection::attachBehaviour = (args...) ->
  objectOrString = Match.OneOf Object, String
  check args[0], Match.OneOf objectOrString, [objectOrString]

  if Match.test args[0], Match.OneOf Array, Object
    args = args.slice 0, 1

  attach.apply @, args
