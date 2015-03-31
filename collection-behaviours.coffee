behaviours = {}

share.attach = attach = (behaviour, args...) ->
  if _.isString behaviour
    options = behaviours[behaviour].options
    behaviour = behaviours[behaviour].behaviour

  if _.isFunction behaviour
    context =
      collection: @
      options: options or {}

    behaviour.apply context, args

  else
    console.warn 'Behaviour not found'

  return

class CollectionBehaviours

  @attach: (collection, args...) ->
    attach.apply collection, args

  @configure: (name, options) ->
    if name of behaviours
      behaviours[name].options = options

    else
      console.warn 'Configure failed, behaviour not found'

  @define: (name, behaviour, options) ->
    if name of behaviours and not options?.replace
      console.warn 'Behaviour already defined, use {replace: true} to override'

    else
      behaviours[name] =
        behaviour: behaviour
