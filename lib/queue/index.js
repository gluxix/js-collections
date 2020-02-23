'use strict';

const LinkedList = require('../linkedList');

const defaultQueueOptions = {
  capacity: Infinity,
};

/**
 * Queue based on LinkedList.
 */
class Queue {
  /**
   * Creates a queue.
   * @param {Object} [options] The options.
   * @param {number} [options.capacity=Infinity] The current queue capacity.
   */
  constructor(options = {}) {
    const opts = {
      ...defaultQueueOptions,
      ...options,
    };

    this.capacity = opts.capacity;
    this.list = new LinkedList();
  }

  /**
   * Enqueues values to the queue.
   * @throws {Error} is thrown if queue capacity is exceeded.
   * @param  {...any} values The enqueued values.
   */
  enqueue(...values) {
    if (values.length > this.availableSize()) {
      throw new Error('Cannot enqueue. Queue capacity exceeded');
    }

    this.list.push(...values);
  }

  /**
   * Dequeues value from the queue.
   * @throws {Error} is thrown if queue is empty.
   * @returns {any}
   */
  dequeue() {
    if (this.isEmpty()) {
      throw new Error('Cannot dequeue. Queue is empty');
    }

    return this.list.shift();
  }

  /**
   * Removes all values from the queue.
   */
  clear() {
    this.list.clear();
  }

  /**
   * Returns available size of the queue.
   * @returns {number}
   */
  availableSize() {
    return this.capacity - this.length;
  }

  /**
   * Returns true if the queue is empty.
   * @returns {boolean}
   */
  isEmpty() {
    return this.length === 0;
  }

  /**
   * Converts the queue to the array.
   * @returns {any[]}
   */
  toArray() {
    return this.list.toArray();
  }

  /**
   * Returns the length of the queue.
   * @returns {number}
   */
  get length() {
    return this.list.length;
  }
}

module.exports = Queue;
