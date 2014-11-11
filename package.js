Package.describe({
  git: 'https://github.com/zimme/meteor-collection-behaviours',
  name: 'zimme:collection-behaviours',
  summary: 'Define and attach behaviours for collections',
  version: '1.0.0'
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
