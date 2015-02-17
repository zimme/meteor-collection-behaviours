# Behaviours for collections

[![Gitter](https://img.shields.io/badge/gitter-join_chat-brightgreen.svg)]
(https://gitter.im/zimme/meteor-collection-behaviours)
[![Code Climate](https://img.shields.io/codeclimate/github/zimme/meteor-collection-behaviours.svg)]
(https://codeclimate.com/github/zimme/meteor-collection-behaviours)

Define and attach behaviours on collections.

I used
[sewdn:collection-behaviours](https://github.com/Sewdn/meteor-collection-behaviours)
as inspiration and made a coffeescript rewrite with the base functionality.
The different behaviours are separated into their own packages to make it
easier to find them on [Atmosphere](http://atmospherejs.com) and with `meteor search`.

### Installation

```sh
meteor add zimme:collection-behaviours
```

### Available behaviours

Soft removable:
[Atmosphere](https://atmospherejs.com/zimme/collection-softremovable)
or
[Github](https://github.com/zimme/meteor-collection-softremovable)

Timestampable:
[Atmosphere](https://atmospherejs.com/zimme/collection-timestampable)
or
[Github](https://github.com/zimme/meteor-collection-timestampable)

### Usage

#### Define a behaviour

```js
CollectionBehaviours.define('behaviourName', function(options) {
  collection = this.collection;
  defaultOptions = {
    exampleOption: "I'm a default value"
  };
  options = _.defaults(options, this.options, defaultOptions);

  ... behaviour logic ...
});
```

#### Configuration

```js
// Configure behaviour globally i.e. override defaults
CollectionBehaviours.configure('behaviourName', {
  exampleOption: "I'm a global value"
});

Users = Meteor.users;

// Attach behaviour with optional custom options
CollectionBehaviours.attach(Users, 'behaviourName', {
  exampleOption: "I'm a local value"
});

// Attach behaviour with optional custom options
Users.attachBehaviour('behaviourName', {
  exampleOption: "I'm a local value"
});
```
