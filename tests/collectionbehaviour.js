describe('CollectionBehaviour', function() {

  describe('new CollectionBehaviour()', function() {
    it('Should throw when called without arguments', function() {
      expect(() => {
        new CollectionBehaviour();
      }).to.throw(Match.Error);
    });

    it('Should create a new behaviour when called with a function',
    function() {
      const behaviour = new CollectionBehaviour(function() {});
      expect(behaviour).to.be.an.instanceof(CollectionBehaviour);
    });

    it('Should create a new behaviour when called with a valid object',
    function() {
      let behaviour = new CollectionBehaviour({
        attach() {},
      });
      expect(behaviour).to.be.an.instanceof(CollectionBehaviour);

      behaviour = new CollectionBehaviour({
        attach() {},
        detach() {},
        name: "behaviour",
        options: {
          option: true,
        },
      });
      expect(behaviour).to.be.an.instanceof(CollectionBehaviour);
    });
  });

  describe('attach()', function() {
    it('Should throw when called without arguments', function() {
      const behaviour = new CollectionBehaviour(function() {});
      expect(() => {
        behaviour.attach();
      }).to.throw();
    });

    it('Should attach behaviour to collection and return undefined for basic behaviours',
    function() {
      const Behaviours = new Mongo.Collection(Random.id());
      let value = 0;
      const behaviour = new CollectionBehaviour(function() { value++; });
      expect(behaviour.attach(Behaviours)).to.be.undefined;
      expect(value).to.equal(1);
    });

    it('Should attach behaviour to collection and return a handle for advanced behaviours',
    function() {
      const Behaviours = new Mongo.Collection(Random.id());
      let value = 0;
      const behaviour = new CollectionBehaviour({
        attach() { value++; },
        detach() {},
        name: "behaviour",
        options: { option: true },
      });
      const handle = behaviour.attach(Behaviours);
      expect(value).to.equal(1);
      expect(handle).to.respondTo('detach');
    });

    it('Should attach behaviour to mutiple collections', function() {
      const Behaviours = new Mongo.Collection(Random.id());
      const Posts = new Mongo.Collection(Random.id());
      let value = 0;
      const behaviour = new CollectionBehaviour(function() { value++; });
      expect(behaviour.attach([Behaviours, Posts])).to.be.undefined;
      expect(value).to.equal(2);
    });

    it('Should be able to detach advanced behaviours', function() {
      const Behaviours = new Mongo.Collection(Random.id());
      let value = 0;
      const behaviour = new CollectionBehaviour({
        attach() { value++; },
        detach() { value--; },
      });
      const handle = behaviour.attach(Behaviours);
      expect(value).to.equal(1);
      handle.detach();
      expect(value).to.equal(0);
    });

    it('Should attach/detach with expected arguments and context', function() {
      const Behaviours = new Mongo.Collection(Random.id());
      const behaviour = new CollectionBehaviour({
        attach(collection, options) {
          expect(collection).to.equal(Behaviours);
          expect(this.collection).to.equal(Behaviours);
          expect(options).to.equal(1);
          expect(this.options).to.equal(2);
          this.value = 42;
        },
        detach(collection, options) {
          expect(collection).to.equal(Behaviours);
          expect(this.collection).to.equal(Behaviours);
          expect(options).to.equal(1);
          expect(this.options).to.equal(2);
          expect(this.value).to.equal(42);
        },
      });
      behaviour.config(2);
      const handle = behaviour.attach(Behaviours, 1);
      handle.detach();
    });
  });

  describe('config()', function() {
    it('Should respond to config', function() {
      const behaviour = new CollectionBehaviour(function() {});
      expect(behaviour).to.respondTo('config');
      expect(behaviour).to.respondTo('configure');
    });
  });
});
