const attach = Symbol('attach');
const detach = Symbol('detach');

class CollectionBehaviour {

  constructor(behaviour = {}) {
    if (Match.test(behaviour, Function)) {
      behaviour = { attach: behaviour };
    }

    check(behaviour, Patterns.behaviour);

    behaviour = {
      [attach]: behaviour.attach,
      [detach]: behaviour.detach,
      name: behaviour.name,
      options: behaviour.options,
    };

    Object.assign(this, behaviour);
  }

  attach(collections, options) {
    if (Match.test(collections, Mongo.Collection)) {
      collections = [collections];
    }

    check(collections, [Mongo.Collection]);

    const context = {
      options: this.options,
    };

    for (const collection of collections) {
      context.colllection = collection; // Backwards compatibility
      this[attach].call(context, collection, options);
    }

    if (!this[detach]) {
      return;
    }

    return {
      detach: () => {
        for (const collection of collections) {
          context.collection = collection; // Backwards compatibility
          this[detach](context, collection, options);
        }
      },
    };
  }

  config(options) {
    check(options, Object);
    this.options = options;
  }

  configure(options) {
    this.config(options);
  }

}
