Package.describe({
  git: 'https://github.com/zimme/meteor-collection-behaviours',
  name: 'zimme:collection-behaviours',
  summary: 'Define and attach behaviours for collections',
  version: '0.1.5-rc1'
});

Package.onUse(function(api) {
  api.versionsFrom('0.9.3');

  api.use([
    'coffeescript',
    'mongo',
    'underscore'
  ]);

  api.use('matb33:collection-hooks@0.7.6');

  api.use([
    'aldeed:autoform@2.0.0 || 3.0.0 || 4.0.0-rc1',
    'aldeed:collection2@2.0.0',
    'aldeed:simple-schema@1.0.3'
  ], ['client', 'server'], {weak: true});

  api.addFiles([
    'collection-behaviour.coffee',
    'mongo.coffee'
  ]);

  api.addFiles([
    'behaviours/timestampable.coffee',
    'behaviours/softremovable.coffee'
  ]);

  api.export('CollectionBehaviours');
});
