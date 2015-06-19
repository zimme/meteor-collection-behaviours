[![Gitter]](https://gitter.im/zimme/meteor-collection-behaviours)
[![Code Climate]](https://codeclimate.com/github/zimme/meteor-collection-behaviours)
[![License]](https://github.com/zimme/meteor-collection-timestampable/blob/master/LICENSE.md)

# Behaviours for collections

Define and attach behaviours to collections.

## Installation

```sh
meteor add zimme:collection-behaviours
```

## Available behaviours


#### [Softremove]

This behaviour adds `.softRemove()` and `.restore()` to collections, which make
it possible to mark documents as removed. It also tracks the time and user for
the last soft remove and restore.

#### [Timestamp]

This behaviour timestamps documents on insert and update. It also tracks the
user who made the last insert or update.

## Usage

### Define a behaviour

```js
CollectionBehaviours.define('behaviourName', function(options) {
  var collection = this.collection;

  // Setup some default options for the behaviour
  var defaultOptions = {
    exampleOption: "I'm a default value"
  };

  // Make the behaviour configurable both globally and locally and uses the
  // defaults if not configured.
  options = _.defaults(options, this.options, defaultOptions);

  // Behaviour logic goes here
});
```

### Attach behaviours

```js
// Attach behavours using the collection identifier
Meteor.users.attachBehaviour('timestampable');

// Attach behaviours using CollectionBehaviours
CollectionBehaviours.attach(Meteor.users, 'timestampable');
```

### Configuration

```js
// Configure behaviour globally i.e. set you own defaults
CollectionBehaviours.configure('behaviourName', {
  exampleOption: "I'm a global value"
});

// Attach behaviour with custom options
Meteor.users.attachBehaviour('behaviourName', {
  exampleOption: "I'm a local value"
});

// Attach behaviour with custom options, using CollectionBehaviours
CollectionBehaviours.attach(Meteor.users, 'behaviourName', {
  exampleOption: "I'm a local value"
});
```

## Notes

* The inspiration for this package came from
[`sewdn:collection-behaviours`][sewdn]

[Atmosphere]: https://atmospherejs.com
[Code Climate]: https://img.shields.io/codeclimate/github/zimme/meteor-collection-behaviours.svg
[Gitter]: https://img.shields.io/badge/gitter-join_chat-brightgreen.svg
[License]: https://img.shields.io/badge/license-MIT-blue.svg
[sewdn]: https://github.com/Sewdn/meteor-collection-behaviours
[Softremove]: https://atmospherejs.com/zimme/collection-softremovable
[Timestamp]: https://atmospherejs.com/zimme/collection-timestampable
