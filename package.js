Package.describe({
  git: 'https://github.com/zimme/meteor-collection-behaviours.git',
  name: 'zimme:collection-behaviours',
  summary: 'Define and attach behaviours to collections',
  version: '1.1.3'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use([
    'check',
    'mongo'
    'ecmascript',
  ]);

  api.addFiles([
  ]);

  api.export('CollectionBehaviours');
});
