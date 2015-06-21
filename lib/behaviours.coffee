behaviours = {}

share.attach = attach = (behaviour, args...) ->
  check behaviour, Match.OneOf Function, String

  if Match.test behaviour, String
    options = behaviours[behaviour]?.options
    behaviour = behaviours[behaviour]?.behaviour

  if Match.test behaviour, Function
    context =
      collection: @
      options: options or {}

    behaviour.apply context, args

  else
    console.warn 'Behaviour not found'

  return

CollectionBehaviours =

  attach: (collections, args...) ->
    check collections, Match.OneOf Mongo.Collection, [Mongo.Collection]

    if Match.test collections, Mongo.Collection
      collections = [collections]

    attach.apply collection, args for collection in collections

    return

  config: ->
    @configure.apply @, arguments

  configure: (name, options) ->
    check name, String
    check options, Object

    if name of behaviours
      behaviours[name].options = options

    else
      console.warn 'Configure failed, behaviour not found'

  define: (name, behaviour, options) ->
    check name, String
    check behaviour, Function

    optionsPattern = Match.ObjectIncluding
      replace: Boolean

    check options, Match.Optional optionsPattern

    if name of behaviours and not options?.replace
      console.warn 'Behaviour already defined, use {replace: true} to override'

    else
      behaviours[name] =
        behaviour: behaviour
