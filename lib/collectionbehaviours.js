const definedBehaviours = {};

class CollectionBehaviours {

  static attach(collections, behaviours) {
    if (Match.test(behaviours, String)) {
      behaviours = {
        [behaviours]: {},
      };
    } else if (Match.test(behaviours, [String])) {
      behaviours = _.object(behaviours, []);
    }
    check(behaviours, Patterns.objectWithStringKeys);
  }

  static config(behaviour, options) {
    if (Match.test(behaviour, String)) {
      var behaviourOptions = {
        [behaviour]: options,
      };
    } else if (Match.test(behaviour, Object)) {
      var behaviourOptions = behaviour;
    }

    check(behaviourOptions, Patterns.objectWithStringKeys);

    behaviourOptions.entries().forEach((name, options) => {
      const behaviour = definedBehaviours[name];
      behaviour.config(options);
    });
  }

  static configure(behaviour, options) {
    this.config(behaviour, options);
  }

  static define(behaviours, options) {
    this.register(behaviours, options);
  }

  static register(behaviours, options) {
    if (Match.test(behaviours,
    Match.OneOf(CollectionBehaviour, Function, Patterns.behaviourObject))) {
      behaviours = [behaviours];
    }
    check(behaviours,
    [Match.OneOf(CollectionBehaviour, Function, Patterns.behaviourObject)]);
  }

}
