const Patterns = {

  behaviourObject: Match.ObjectIncluding({
    attach: Function,
    detach: Match.Optional(Function),
    name: Match.Optional(String),
    options: Match.Optional(Match.Any),
  }),

  // Should only allow objects with strings as keys
  objectWithStringKeys: Match.Where(function(object) {
    check(object, Object);

    for (const key in object) {
      check(name, String);
    }
  }),

};
