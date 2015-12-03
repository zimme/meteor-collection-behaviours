const Patterns = {

  behaviour: Match.ObjectIncluding({
    attach: Function,
    detach: Match.Optional(Function),
    name: Match.Optional(String),
    options: Match.Optional(Match.Any),
  }),

  // Should only allow objects with strings as keys
  behaviourOptions: Match.Where(function(behaviourOptions) {
    for (const name in behaviourOptions) {
      if (!Match.test(name, String)) {
        return false;
      }
    }
    return true;
  }),

};
