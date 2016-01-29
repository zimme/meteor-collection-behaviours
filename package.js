Package.describe({
  git: 'https://github.com/zimme/meteor-collectionbehaviours.git',
  name: 'collectionbehaviours:core',
  summary: 'Create, define, attach and detach behaviours to collections',
  version: '1.0.0-alpha.1',
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');

  api.use([
    'check',
    'ecmascript',
    'lai:collection-extensions@0.2.1_1',
    'mongo',
  ]);

  api.addFiles([
    'lib/utilities.js',
    'lib/collectionbehaviour.js',
    'lib/collectionbehaviours.js',
  ], ['client', 'server'], { bare: true });

  api.addFiles('lib/mongo.js');

  api.export([
    'CollectionBehaviour',
    'CollectionBehaviours',
  ]);
});

Package.onTest(function(api) {
  api.versionsFrom('1.2.1');

  api.use([
    'check',
    'collectionbehaviours:core',
    'ecmascript',
    'mongo',
    'practicalmeteor:mocha@2.1.0_5',
    'random'
  ]);

  api.addFiles([
    'tests/collectionbehaviour.js',
    'tests/collectionbehaviours.js',
  ]);
});
