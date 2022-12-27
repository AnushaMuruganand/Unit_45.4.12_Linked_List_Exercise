/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val) {
    // Creating a new node
    const newNode = new Node(val);

    // If its the first node in the list then make that node as "head" and "tail"
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    }
    else {
      // making the previous node ".next" point to the new node created
      this.tail.next = newNode;

      // Now making the new node as a tail
      this.tail = newNode;
    }
    this.length += 1;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    // Creating a new node
    const newNode = new Node(val);

    // If its the first node in the list then make that node as "head" and "tail"
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    }
    else {
      // Now making this new node .next point to the previous first node in the list
      newNode.next = this.head;
    
      // Making this new node as the "head"
      this.head = newNode;
    }

    this.length += 1;
  }

  /** pop(): return & remove last item. */

  pop() {

    if (this.length === 0) {
      throw new Error("List is empty.");
    }

    let currentNode = this.head;

    // Traversing till the last node
    while (currentNode) {
      
      // if the current node's ".next.next" is "null" means "currentNode.next" is the last node
      // then make the "currentNode" to be the "tail", so this means we are removing the last item in the list
      if (currentNode.next.next === null) {
        const removedValue = this.tail.val;
        this.tail = currentNode;

        this.length -= 1;

        if (this.length === 0) {
          this.head = this.tail = null;
        }
        return removedValue;
      }
    }
  }

  /** shift(): return & remove first item. */

  shift() {

    if (this.length === 0) {
      throw new Error("List is empty.");
    }

    let currentNode = this.head;

    // Making the head to be the next node from the current node
    this.head = currentNode.next;

    this.length -= 1;

    if (this.length === 0) {
      this.head = this.tail = null;
    }

    return currentNode.val;
  }

  /** _get(idx): retrieve node at idx. */

  _get(idx) {
    let currentNode = this.head;
    let count = 0;

    // Traversing the list until currentNode is not NULL and also until count is  ot equal to "idx"
    while (currentNode !== null && count != idx) {
      count += 1;
      currentNode = currentNode.next;
    }

    return currentNode;
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    if (idx >= this.length || idx < 0) {
      throw new Error("Invalid index.");
    }

    return this._get(idx).val;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    if (idx >= this.length || idx < 0) {
      throw new Error("Invalid index.");
    }

    // Get the node at the "idx";
    const node = this._get(idx);

    // setting the "val" to the node
    node.val = val;
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    if (idx > this.length || idx < 0) {
      throw new Error("Invalid index.");
    }

    // if "idx" is 0 then insert the node at the beginning
    if (idx === 0) return this.unshift(val);

    // if "idx" is equal to length of the list then insert the node at the end
    if (idx === this.length) return this.push(val);

    // Creating a new node 
    const newNode = new Node(val);

    // Get the previous node of the "idx", currentNode of the "idx";
    const previousNode = this._get(idx - 1);
    const currentNode = this._get(idx);

    // setting the previous node's ".next" to the new node created
    previousNode.next = newNode;

    // setting the new node's ".next" to be the current node
    newNode.next = currentNode;

    this.length += 1;
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    if (idx > this.length || idx < 0) {
      throw new Error("Invalid index.");
    }

    // if "idx" is 0 then remove the first node from the list
    if (idx === 0) return this.shift();

    // if "idx" is equal to length of the list then remove the last node from the list
    if (idx === this.length) return this.pop();

    // Get the previous node of the "idx", currentNode of the "idx", nextNode from the "idx";
    const previousNode = this._get(idx - 1);
    const currentNode = this._get(idx);
    const nextNode = this._get(idx + 1);

    // setting the previous node's ".next" to the nextNode, so it means we have removed the "currentNode"
    previousNode.next = nextNode;

    this.length -= 1;

    return currentNode.val;



  }

  /** average(): return an average of all values in the list */

  average() {

    // If empty list return 0
    if (this.length === 0) {
      return 0;
    }

    let total = 0;
    let currentNode = this.head;

    while (currentNode) {
      total += currentNode.val;
      currentNode = currentNode.next;
    }

    return total / this.length;
  }
}

module.exports = LinkedList;
