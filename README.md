# Collection-behaviours

[![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/zimme/meteor-collection-behaviours_medium=badge&utm_campaign=pr-badge)
[![Code Climate](https://img.shields.io/codeclimate/github/zimme/meteor-collection-behaviours.svg?style=flat)](https://codeclimate.com/github/zimme/meteor-collection-behaviours)

Define and attach behaviours on collections.

I used
[sewdn:collection-behaviours](https://github.com/Sewdn/meteor-collection-behaviours)
as inspiration and did a coffeescript rewrite with only the base functionality.
The different behaviours are separated into their own packages to make it
easier to find them on [Atmosphere](http://atmospherejs.com) and `meteor search`.

## Installation

```sh
meteor add zimme:collection-behaviours
```

## Available behaviours

### Soft removable

Atmosphere: https://atmospherejs.com/zimme/collection-softremovable  
Github: https://github.com/zimme/meteor-collection-softremovable

### Timestampable

Atmosphere: https://atmospherejs.com/zimme/collection-timestampable  
Github: https://github.com/zimme/meteor-collection-timestampable

## Usage

```js
// Define a behaviour
CollectionBehaviours.define('behaviourName', function(options) {
  collection = this.collection;
  defaultOptions = {
    randomOption: "I'm a default value"
  };
  options = _.defaults(options, this.options, defaultOptions);

  ... behaviour logic ...
});

// Configure behaviour globally
CollectionBehaviours.configure('behaviourName', {
  randomOption: "I'm a global value"
});

// Attach behaviour with optional options
CollectionBehaviours.attach(Meteor.users, 'behaviourName', {
  randomOption: "I'm a local value"
});

// Attach behaviour with optional options
Meteor.users.attachBehaviour('behaviourName', {
  randomOption: "I'm a local value"
});
```
