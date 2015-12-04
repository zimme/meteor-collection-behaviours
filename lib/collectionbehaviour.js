const attachKey = Symbol('attach');
const detachKey = Symbol('detach');

class CollectionBehaviour {

  constructor(behaviour = {}) {
    if (Match.test(behaviour, Function)) {
      behaviour = { attach: behaviour };
    }

    check(behaviour, Patterns.behaviour);

    behaviour = {
      [attachKey]: behaviour.attach,
      [detachKey]: behaviour.detach,
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
      context.collection = collection; // Backwards compatibility
      this[attachKey].call(context, collection, options);
    }

    if (!this[detachKey]) {
      return;
    }

    return {
      detach: () => {
        for (const collection of collections) {
          context.collection = collection; // Backwards compatibility
          this[detachKey].call(context, collection, options);
        }
      },
    };
  }

  config(options) {
    this.options = options;
  }

  configure(options) {
    this.config(options);
  }

}
