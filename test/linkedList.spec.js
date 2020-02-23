const expect = require('chai').expect;

const LinkedList = require('../lib/linkedList');

describe('LinkedList', () => {
  describe('constructor', () => {
    it('creates an empty list', () => {
      const list = new LinkedList();
      expect(list).to.be.instanceOf(LinkedList);
      expect(list).lengthOf(0);
      expect(list.tail).to.be.null;
      expect(list.head).to.be.null;
    });
  });

  describe('.fromIterable()', () => {
    it('creates a list from iterable', () => {
      const array = [1, 2, 3];
      const list = LinkedList.fromIterable(array);
      expect(list).to.be.instanceOf(LinkedList);
      expect(list).lengthOf(3);
      expect(list.toArray()).to.be.eql(array);
    });

    it('create a list from empty iterable', () => {
      const array = [];
      const list = LinkedList.fromIterable(array);
      expect(list).to.be.instanceOf(LinkedList);
      expect(list).lengthOf(0);
      expect(list.toArray()).to.be.eql(array);
    });
  });

  describe('#push()', () => {
    it('adds values to the tail', () => {
      const list = new LinkedList();
      list.push(1, 2);
      expect(list).lengthOf(2);
      list.push(3, 4);
      expect(list).lengthOf(4);
      expect(list.toArray()).to.be.eql([1, 2, 3, 4]);
    });
  });

  describe('#unshift()', () => {
    it('adds values to the head', () => {
      const list = new LinkedList();
      list.unshift(1, 2);
      expect(list).lengthOf(2);
      list.unshift(3, 4);
      expect(list).lengthOf(4);
      expect(list.toArray()).to.be.eql([3, 4, 1, 2]);
    });
  });

  describe('#pop()', () => {
    it('removes and returns value from the tail', () => {
      const list = new LinkedList();
      list.push(1, 2);
      const value = list.pop();
      expect(list).lengthOf(1);
      expect(value).to.be.eq(2);
    });

    it('clears list after pop the last value', () => {
      const list = new LinkedList();
      list.push(1);
      list.pop();
      expect(list).lengthOf(0);
      expect(list.tail).to.be.null;
      expect(list.head).to.be.null;
    });

    describe('when a list is empty', () => {
      it('throws an error', () => {
        const list = new LinkedList();
        expect(list.pop.bind(list)).to.throws(Error, 'Cannot pop() from an empty list');
      });
    });
  });

  describe('#shift()', () => {
    it('removes and returns value from the head', () => {
      const list = new LinkedList();
      list.unshift(1, 2);
      const value = list.shift();
      expect(list).lengthOf(1);
      expect(value).to.be.eq(1);
    });

    it('clears list after pop the last value', () => {
      const list = new LinkedList();
      list.unshift(1);
      list.shift();
      expect(list).lengthOf(0);
      expect(list.tail).to.be.null;
      expect(list.head).to.be.null;
    });

    describe('when a list is empty', () => {
      it('throws an error', () => {
        const list = new LinkedList();
        expect(list.shift.bind(list)).to.throws(Error, 'Cannot shift() from an empty list');
      });
    });
  });

  describe('#clear()', () => {
    it('clears a filled list', () => {
      const list = new LinkedList();
      list.push(1, 2, 3);
      list.clear();
      expect(list).lengthOf(0);
      expect(list.tail).to.be.null;
      expect(list.head).to.be.null;
    });

    it('clears an empty list', () => {
      const list = new LinkedList();
      list.clear();
      expect(list).lengthOf(0);
      expect(list.tail).to.be.null;
      expect(list.head).to.be.null;
    });
  });

  describe('#toArray()', () => {
    it('converts a list to an array', () => {
      const list = new LinkedList();
      const emptyArray = list.toArray();
      expect(emptyArray).to.be.eql([]);
      list.push(1, 2, 3);
      const array = list.toArray();
      expect(array).to.be.eql([1, 2, 3]);
    });
  });

  describe('iterator', () => {
    it('iterates a list', () => {
      const list = new LinkedList();
      const arr = [1, 2, 3];
      list.push(...arr);
      let i = 0;
      for (const value of list) {
        expect(value).to.be.eq(arr[i++]);
      }
    });
  });
});
