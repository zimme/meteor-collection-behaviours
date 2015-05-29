Package.describe({
  git: 'https://github.com/zimme/meteor-collection-behaviours.git',
  name: 'zimme:collection-behaviours',
  summary: 'Define and attach behaviours on collections',
  version: '1.0.5-rc.1'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use([
    'check',
    'coffeescript',
    'mongo'
  ]);

  api.addFiles([
    'collection-behaviours.coffee',
    'mongo.coffee'
  ]);

  api.export('CollectionBehaviours');
});
