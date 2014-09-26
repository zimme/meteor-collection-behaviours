behaviours = {}

share.attach = attach = (behaviour, args...) ->
  if _.isString behaviour
    behaviour = behaviours[behaviour]

  if _.isFunction behaviour
    behaviour.apply @, args

  else
    console.warn 'Behaviour not found'

class CollectionBehaviours

  @attach: (collection, args...) ->
    attach.apply collection, args

  @define: (name, behaviour, options) ->
    if name of behaviours and not options?.replace
      console.warn 'Behaviour already defined, use replace option to override'
    else
      behaviours[name] = behaviour
