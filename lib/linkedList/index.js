'use strict';

const Node = require('./node');

/**
 * Linked list.
 */
class LinkedList {
  /**
   * Creates an empty list.
   * @param {Iterable} [iterable=null]
   */
  constructor(iterable = null) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    if (iterable && Symbol.iterator in iterable) {
      this.push(...iterable);
    }
  }

  /**
   * Adds a value to a list by position.
   * @param {any} value The value.
   * @param {number} position The position.
   */
  add(value, position) {
    if (position < 0 || position > this.length) {
      throw new Error('Cannot add value. Out of range.');
    }

    if (position === 0) {
      this.unshift(value);
    } else if (position === this.length) {
      this.push(value);
    } else {
      const addedNode = new Node(value);
      let prev = this.head;
      let i = 1;
      while (i < position) {
        prev = prev.next;
        i++;
      }
      const next = prev.next;
      addedNode.next = next;
      addedNode.prev = prev;
      prev.next = addedNode;
      next.prev = addedNode;

      this.length++;
    }    
  }

  /**
   * Adds values to the end (tail) of a list.
   * @param  {...any} values The values.
   */
  push(...values) {
    for (const value of values) {
      const node = new Node(value);

      if (!this.tail) {
        this.tail = node;
        this.head = node;
      } else {
        const prevTail = this.tail;
        this.tail = node;
        node.prev = prevTail;
        prevTail.next = node;
      }

      this.length++;
    }
  }

  /**
   * Adds values to the beginning (head) of a list.
   * @param  {...any} values The values.
   */
  unshift(...values) {
    for (const value of values.reverse()) {
      const node = new Node(value);

      if (!this.head) {
        this.head = node;
        this.tail = node;
      } else {
        const prevHead = this.head;
        this.head = node;
        node.next = prevHead;
        prevHead.prev = node;
      }

      this.length++;
    }
  }

  /**
   * Removes and returns a value from a list by position.
   * @throws {Error} is thrown when position is out of range or a list is empty.
   * @param {number} position The position.
   * @returns {any}
   */
  remove(position) {
    if (this.length === 0) {
      throw new Error('Cannot remove() from an empty list');
    }

    if (position < 0 || position >= this.length) {
      throw new Error('Cannot remove a value. Out of range.');
    }

    if (position === 0) {
      return this.shift();
    } else if (position === this.length - 1) {
      return this.pop();
    }

    let prev = this.head;
    let i = 1;
    while (i < position) {
      prev = prev.next;
      i++;
    }
    const removable = prev.next;
    const next = removable.next;
    prev.next = next;
    next.prev = prev;
    removable.next = null;
    removable.prev = null;
    this.length--;
    return removable.value;
  }

  /**
   * Removes a value from the end (tail) of a list and returns the value.
   * @throws {Error} is thrown when a list is empty.
   * @returns {any} Removed value.
   */
  pop() {
    if (this.length === 0) {
      throw new Error('Cannot pop() from an empty list');
    }

    const value = this.tail.value;

    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      const node = this.tail;
      this.tail = node.prev;
      this.tail.next = null;
    }
    this.length--;

    return value;
  }

  /**
   * Removes a value from the beginning (head) of a list and returns the value.
   * @throws {Error} is thrown when a list is empty.
   * @returns {any} Removed value.
   */
  shift() {
    if (this.length === 0) {
      throw new Error('Cannot shift() from an empty list');
    }

    const value = this.head.value;

    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      const node = this.head;
      this.head = node.next;
      this.head.prev = null;
    }
    this.length--;

    return value;
  }

  /**
   * Removes all values from a list.
   */
  clear() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  /**
   * Converts a list to an array.
   * @returns {any[]}
   */
  toArray() {
    const array = [];
    for (const value of this) {
      array.push(value);
    }
    return array;
  }

  [Symbol.iterator]() {
    return {
      current: this.head,

      next() {
        if (this.current) {
          const result = { done: false, value: this.current.value };
          this.current = this.current.next;
          return result;
        } else {
          return { done: true };
        }
      }
    };
  }
}

module.exports = LinkedList;
