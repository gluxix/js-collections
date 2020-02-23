'use strict';

const Node = require('./node');

/**
 * Linked list.
 */
class LinkedList {
  /**
   * Creates an empty list.
   */
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  /**
   * Creates a list from an iterable.
   * @param {Iterable} iterable The iterable object.
   * @returns {LinkedList}
   */
  static fromIterable(iterable) {
    const linkedList = new LinkedList();
    for (const value of iterable) {
      linkedList.push(value);
    }
    return linkedList;
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
