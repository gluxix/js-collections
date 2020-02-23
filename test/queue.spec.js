const expect = require('chai').expect;

const Queue = require('../lib/queue');

describe('Queue', () => {
  describe('constructor', () => {
    it('creates an empty default queue', () => {
      const queue = new Queue();
      expect(queue).to.be.instanceOf(Queue);
      expect(queue).lengthOf(0);
      expect(queue.capacity).to.be.eq(Infinity);
    });

    it('creates an empty queue', () => {
      const capacity = 100;
      const queue = new Queue({ capacity });
      expect(queue).to.be.instanceOf(Queue);
      expect(queue).lengthOf(0);
      expect(queue.capacity).to.be.eq(capacity);
    });
  });

  describe('#enqueue()', () => {
    it('adds values to the queue', () => {
      const queue = new Queue();
      queue.enqueue(1, 2);
      expect(queue).lengthOf(2);
      queue.enqueue(3, 4);
      expect(queue).lengthOf(4);
      expect(queue.toArray()).to.be.eql([1, 2, 3, 4]);
    });

    describe('when capacity exceeded', () => {
      it('throws an error', () => {
        const queue = new Queue({ capacity: 1 });
        const errorMessage = 'Cannot enqueue. Queue capacity exceeded';
        expect(queue.enqueue.bind(queue, 1, 2)).to.throws(Error, errorMessage);
      });
    });
  });

  describe('#dequeue()', () => {
    it('removes and returns a value from the queue', () => {
      const queue = new Queue();
      queue.enqueue(1, 2);
      const value = queue.dequeue();
      expect(queue).lengthOf(1);
      expect(value).to.be.eq(1);
    });

    it('clears the queue after dequeue the last value', () => {
      const queue = new Queue();
      queue.enqueue(1);
      queue.dequeue();
      expect(queue).lengthOf(0);
    });

    describe('when the queue is empty', () => {
      it('throws an error', () => {
        const queue = new Queue();
        const errorMessage = 'Cannot dequeue. Queue is empty';
        expect(queue.dequeue.bind(queue)).to.throws(Error, errorMessage);
      });
    });
  });

  describe('#clear()', () => {
    it('clears a filled queue', () => {
      const queue = new Queue();
      queue.enqueue(1, 2, 3);
      queue.clear();
      expect(queue).lengthOf(0);
    });

    it('clears an empty list', () => {
      const queue = new Queue();
      queue.clear();
      expect(queue).lengthOf(0);
    });
  });

  describe('#toArray()', () => {
    it('converts an queue to an array', () => {
      const queue = new Queue();
      const emptyArray = queue.toArray();
      expect(emptyArray).to.be.eql([]);
      queue.enqueue(1, 2, 3);
      const array = queue.toArray();
      expect(array).to.be.eql([1, 2, 3]);
    });
  });

  describe('#availableSize()', () => {
    describe('with infinite capacity', () => {
      it('returns available size in the queue', () => {
        const queue = new Queue();
        expect(queue.availableSize()).to.be.eq(Infinity);
        queue.enqueue(1, 2, 3);
        expect(queue.availableSize()).to.be.eq(Infinity);
      });
    });

    describe('with finite capacity', () => {
      it('returns available size in the queue', () => {
        const capacity = 10;
        const enqueuedArray = [1, 2, 3];
        const queue = new Queue({ capacity });
        expect(queue.availableSize()).to.be.eq(capacity);
        queue.enqueue(...enqueuedArray);
        expect(queue.availableSize()).to.be.eq(capacity - enqueuedArray.length);
      });
    });
  });

  describe('#isEmpty()', () => {
    it('returns true if an queue is empty', () => {
      const queue = new Queue();
      expect(queue.isEmpty()).to.be.true;
    });

    it('returns false if an queue is not empty', () => {
      const queue = new Queue();
      queue.enqueue(1);
      expect(queue.isEmpty()).to.be.false;
    });
  });
});
