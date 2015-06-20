Package.describe({
  git: 'https://github.com/zimme/meteor-collection-behaviours.git',
  name: 'zimme:collection-behaviours',
  summary: 'Define and attach behaviours to collections',
  version: '1.0.5-rc.2'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use([
    'check',
    'coffeescript',
    'mongo'
  ]);

  api.addFiles([
    'lib/collection-behaviours.coffee',
    'lib/mongo.coffee'
  ]);

  api.export('CollectionBehaviours');
});
