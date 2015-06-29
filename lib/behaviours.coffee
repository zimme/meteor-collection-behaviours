definedBehaviours = {}

messages =
  attachAborted: (name, collectionName) ->
    "Attach aborted, behaviour \"#{name}\" already attached to" +
    " #{collectionName} collection"
  attachFailed: (name) ->
    "Attach failed, behaviour \"#{name}\" not found"

share.attach = attach = (behaviours, options...) ->
  check behaviours, Match.OneOf Function, [Match.OneOf Function, String], Object
  , String

  if Match.test behaviours, String
    name = behaviours.toLowerCase()
    behaviourObject = definedBehaviours[name]

    unless behaviourObject
      console.error messages.attachFailed name
      return

    behaviourObject.collections ?= []

    if @_name in behaviourObject.collections
      console.warn messages.attachAborted name, @_name
      return

    behaviours = behaviourObject.behaviour

  if Match.test behaviours, Function
    context =
      collection: @
      options: behaviourObject?.options or {}

    behaviours.apply context, options

    behaviourObject?.collections ?= []
    behaviourObject?.collections.push @_name

    return

  if Match.test behaviours, [Match.OneOf Function, String]
    context =
      collection: @

    for behaviour in behaviours
      if Match.test behaviour, String
        name = behaviour.toLowerCase()
        behaviourObject = definedBehaviours[name]

        unless behaviourObject
          console.error messages.attachFailed name
          continue

        behaviourObject.collections ?= []

        if @_name in behaviourObject.collections
          console.warn messages.attachAborted name, @_name
          continue

        behaviour = behaviourObject.behaviour

        context.options = behaviourObject.options

      if Match.test behaviour, Function
        context.options ?= {}

        behaviour.apply context, {}

        behaviourObject?.collections ?= []
        behaviourObject?.collections.push @_name

    return

  if Match.test behaviours, Object
    for name, options of behaviours
      check name, String

      name = name.toLowerCase()

      behaviourObject = definedBehaviours[name]

      unless behaviourObject
        console.error messages.attachFailed name
        continue

      behaviourObject.collections ?= []

      if @_name in behaviourObject.collections
        console.warn messages.attachAborted name, @_name
        continue

      behaviour = behaviourObject.behaviour

      context =
        collection: @
        options: behaviourObject.options or {}

      if Match.test behaviour, Function
        behaviour.call context, options

        behaviourObject.collections.push @_name

      else
        console.error messages.attachFailed name

    return

  console.error "Attach failed, unknown reason"

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

    name = name.toLowerCase()

    behaviourObject = definedBehaviours[name]

    if behaviourObject
      behaviourObject.options = options

    else
      console.error "Configure failed, behaviour \"#{name}\" not found"

  define: (name, behaviour, options) ->
    check name, String
    check behaviour, Function

    optionsPattern = Match.ObjectIncluding
      replace: Boolean

    check options, Match.Optional optionsPattern

    name = name.toLowerCase()

    behaviourObject = definedBehaviours[name]

    if behaviourObject and not options?.replace
      console.warn 'Behaviour already defined, use {replace: true} to override'

    else
      definedBehaviours[name] = behaviour: behaviour
