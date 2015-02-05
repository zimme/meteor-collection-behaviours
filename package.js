Package.describe({
  git: 'https://github.com/zimme/meteor-collection-behaviours.git',
  name: 'zimme:collection-behaviours',
  summary: 'Define and attach behaviours on collections',
  version: '1.0.2'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use([
    'coffeescript',
    'mongo',
    'underscore'
  ]);

  api.addFiles([
    'collection-behaviour.coffee',
    'mongo.coffee'
  ]);

  api.export('CollectionBehaviours');
});
