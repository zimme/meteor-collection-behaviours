const Patterns = {

  behaviour: Match.ObjectIncluding({
    attach: Function,
    detach: Match.Optional(Function),
    name: Match.Optional(String),
    options: Match.Optional(Object),
  }),

  // Should match objects with this form
  // {
  //   timestamp: { ... },
  //   softremove: { ... },
  // }
  behaviourOptions: Match.Where(function(behaviourOptions) {
    for (const [name, options] of behaviourOptions.entries()) {
      if (!Match.test(name, String) || !Match.test(options, Object)) {
        return false;
      }
    }
    return true;
  }),

};
