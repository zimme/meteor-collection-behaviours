describe('CollectionBehaviours', function() {
  describe('attach()', function() {
    it('Should throw when called without arguments', function() {
      expect(() => {
        CollectionBehaviours.attach();
      }).to.throw(Match.Error);
    });
  });

  describe('config()', function() {
    it('Should throw when called without arguments', function() {
      expect(() => {
        CollectionBehaviours.config();
      }).to.throw(Match.Error);
    });
  });

  describe('configure()', function() {
    it('Should be an alias for config()', function() {
      expect(CollectionBehaviours).itself.to.respondTo('configure');
    });
  });

  describe('define()', function() {
    it('Should be an alias for register()', function() {
      expect(CollectionBehaviours).itself.to.respondTo('define');
    });
  });

  describe('register()', function() {
    it('Should throw when called without arguments', function() {
      expect(() => {
        CollectionBehaviours.register();
      }).to.throw(Match.Error);
    });
  });
});
