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

    it('creates a list from passed iterable', () => {
      const array = [1, 2, 3];
      const list = new LinkedList(array);
      expect(list).to.be.instanceOf(LinkedList);
      expect(list).lengthOf(3);
      expect(list.toArray()).to.be.eql(array);
    });

    it('ignore iterable if passed not iterable object', () => {
      const notIterable = 0;
      const list = new LinkedList(notIterable);
      expect(list).to.be.instanceOf(LinkedList);
      expect(list).lengthOf(0);
      expect(list.tail).to.be.null;
      expect(list.head).to.be.null;
    });
  });

  describe('#add()', () => {
    it('adds a value to the middle of list', () => {
      const list = new LinkedList([1, 3]);
      list.add(2, 1);
      expect(list).lengthOf(3);
      expect(list.toArray()).to.be.eql([1, 2, 3])
    });

    it('adds a value to the head of list', () => {
      const list = new LinkedList([2, 3]);
      list.add(1, 0);
      expect(list).lengthOf(3);
      expect(list.toArray()).to.be.eql([1, 2, 3]);
    });

    it('adds a value to the tail of list', () => {
      const list = new LinkedList([1, 2]);
      list.add(3, 2);
      expect(list).lengthOf(3);
      expect(list.toArray()).to.be.eql([1, 2, 3]);
    });

    it('adds a first value of a list', () => {
      const list = new LinkedList();
      list.add(1, 0);
      expect(list).lengthOf(1);
      expect(list.toArray()).to.be.eql([1]);
    });

    it('throws an error if out of range', () => {
      const list = new LinkedList();
      const errorMessage = 'Cannot add value. Out of range.';
      expect(list.add.bind(list, 1, -1)).to.throws(Error, errorMessage);
      expect(list.add.bind(list, 1, 1)).to.throws(Error, errorMessage);
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

  describe('#remove()', () => {
    it('removes and returns a value from a middle', () => {
      const list = new LinkedList([1, 2, 3]);
      const value = list.remove(1);
      expect(list).lengthOf(2);
      expect(list.toArray()).to.be.eql([1, 3]);
      expect(value).to.be.eq(2);
    });

    it('removes and returns a value from a head', () => {
      const list = new LinkedList([1, 2, 3]);
      const value = list.remove(0);
      expect(list).lengthOf(2);
      expect(list.toArray()).to.be.eql([2, 3]);
      expect(value).to.be.eq(1);
    });

    it('removes and returns a value from a tail', () => {
      const list = new LinkedList([1, 2, 3]);
      const value = list.remove(2);
      expect(list).lengthOf(2);
      expect(list.toArray()).to.be.eql([1, 2]);
      expect(value).to.be.eq(3);
    });

    it('clears list after removes the last value', () => {
      const list = new LinkedList([1]);
      const value = list.remove(0);
      expect(list).lengthOf(0);
      expect(list.toArray()).to.be.eql([]);
      expect(value).to.be.eq(1);
    });

    it('throws an error if a list is empty', () => {
      const list = new LinkedList();
      const errorMessage = 'Cannot remove() from an empty list';
      expect(list.remove.bind(list, 0)).to.throws(Error, errorMessage);
    });

    it('throws an error if a position is out of range', () => {
      const list = new LinkedList([1, 2, 3]);
      const errorMessage = 'Cannot remove a value. Out of range.';
      expect(list.remove.bind(list, -1)).to.throws(Error, errorMessage);
      expect(list.remove.bind(list, 3)).to.throws(Error, errorMessage);
    });
  });

  describe('#pop()', () => {
    it('removes and returns value from the tail', () => {
      const list = new LinkedList([1, 2]);
      const value = list.pop();
      expect(list).lengthOf(1);
      expect(value).to.be.eq(2);
    });

    it('clears list after pop the last value', () => {
      const list = new LinkedList([1]);
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
      const list = new LinkedList([1, 2]);
      const value = list.shift();
      expect(list).lengthOf(1);
      expect(value).to.be.eq(1);
    });

    it('clears list after pop the last value', () => {
      const list = new LinkedList([1]);
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
      const list = new LinkedList([1, 2, 3]);
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
      const arr = [1, 2, 3];
      const list = new LinkedList(arr);
      let i = 0;
      for (const value of list) {
        expect(value).to.be.eq(arr[i++]);
      }
    });
  });
});
