Package.describe({
  git: 'https://github.com/zimme/meteor-collection-behaviours.git',
  name: 'zimme:collection-behaviours',
  summary: 'Define and attach behaviours to collections',
  version: '1.1.3'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2');

  api.use([
    'check',
    'ecmascript',
    'mongo',
  ]);

  api.addFiles([
  api.export([
    'CollectionBehaviour',
    'CollectionBehaviours',
  ]);
Package.onTest(function(api) {
  api.versionsFrom('1.2');

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
  ]);
});
