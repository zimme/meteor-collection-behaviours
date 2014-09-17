Package.describe({
  git: 'https://github.com/zimme/meteor-collection-behaviour',
  name: 'zimme:collection-behaviour',
  summary: 'Define and attach behaviours for collections',
  version: '0.1.0'
});

Package.onUse(function(api) {
  api.versionsFrom('0.9.0');

  api.use([
    'coffeescript',
    'mongo',
    'underscore'
  ]);

  api.use('matb33:collection-hooks@0.7.6');

  api.use([
    'aldeed:collection2@2.0.0',
    'aldeed:simple-schema@1.0.3'
  ], ['client', 'server'], {weak: true});

  api.addFiles([
    'collection-behaviour.coffee',
    'mongo.coffee'
  ]);

  api.addFiles([
    'behaviours/timestampable.coffee'
  ]);

  api.export('CollectionBehaviour');
});
