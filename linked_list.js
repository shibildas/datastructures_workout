// Single Linked list
// Linked list contains Nodes and List
// Configure Node
class ListNode {
    constructor(value) {
        this.value = value; // The data stored in this node
        this.next = null; // Pointer to next ListNode (will be null if its last node of list)
    }
}

// Configure List
class LinkedList {
    constructor() {
        this.head = null; //First or Start node in the List
        this.tail = null; // Last node in the List
        this.length = 0; // Total number of nodes
    }

    // method append O(1) - Add a value to end of the List
    append(value) {
        // First create a Node object with next null as we append at tail
        const node = new ListNode(value);
        //Check First the list is empty
        if (!this.head) {
            //if empty, assign both tail and head as created node; 
            this.head = node;
            this.tail = node;
        } else {
            // Link current `tail` node's `.next` pointer to `node`
            //Before [head] -> ... -> [tail | next: null ]
            //After [head] -> ... -> [tail]-> [node(new) | next:null ]
            this.tail.next = node;
            //Update `this.tail` to be the `node(new)`
            this.tail = node;
        }
        //incriment length and return
        this.length++;
        return this;
    }
    // Add a value to Begining of the list O(1)
    prepend(value) {
        // Similar to append, only difference is we add to the head not tail
        const newNode = new ListNode(value) // create a Node object
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            //else created node next should be current head
            newNode.next = this.head;
            // Move `this.head` pointer to `newNode`
            this.head = newNode;
        }
        //increment lenth and return
        this.length++;
        return this;
    }
    _getNodeAt(index) {
        //Traverse the `index` steps from `head` and return that ListNode
        // Validate index exists
        if (index < 0 || index >= this.length) return null;
        // Start Pointer cursor at `head` to start with
        let current = this.head;
        // Hop forward `index` times along `.next` pointer 
        for (let i = 0; i < index; i++) {
            current = current.next;
        }
        return current;
    }
    getAt(index) {
        //Get Stored value at index
        const node = this._getNodeAt(index);
        return node ? node.value : undefined;
    }
    setAt(index, value) {
        // Set a value at a desired point
        const node = this._getNodeAt(index);
        if (!node) return false;
        node.value = value;
        return true;
    }
    insertAt(index, value) {
        //Insert a new Node at any index O(n)
        // Validate & Reject out of bound index
        if (index < 0 || index > this.length) return false;
        //Edge case - inserting at head
        if (index === 0) {
            this.prepend(value);
            return true;
        }
        //Edge case Append
        if (index === this.length) {
            this.append(value);
            return true;
        }
        //Skiping above cases- First find node just before position ie: (index - 1)
        const prevNode = this._getNodeAt(index - 1);
        const newNode = new ListNode(value);
        // Now Point `newNode.next` to whatever `prevNode.next` was pointing
        newNode.next = prevNode.next;
        // Next Replace `PrevNode.next` as `newNode`
        prevNode.next = newNode;
        // Increment the length and return true
        this.length++;
        return true
    }
    removeHead() {
        //Remove and return the first node(`head`) if exists
        // First check list is empty
        if (!this.head) return null;
        // Save reference to current head so we can return its value
        const removed = this.head;
        //Advance `this.head` to second node (`this.head.next`)
        this.head = this.head.next;
        // if list becames empty (`head` is now null), clear `tail` too!
        if (!this.head) this.tail = null;
        this.length--;
        return removed.value;
    }
    removeTail() {
        //O(n) Traverse through linked list and remove tail, assign new tail & return removed tail
        // Handle empty list or 1-element list
        if (!this.head) return null;
        // if there is only head, remove head only
        if (this.length === 1) return this.removeHead();
        // Traverse to the second last node by index as (list length -2)
        const secondToLast = this._getNodeAt(this.length - 2);
        const removed = this.tail
        //Remove next pointing for second last as it is suppossed to be the tail and update tail as sendlast node
        secondToLast.next = null;
        this.tail = secondToLast;

        // Decrease length and return
        this.length--;
        return removed.value;
    }
    removeAt(index) {
        // Remove node at specific index
        // Validate bounds and handle head/tail edge cases
        if (index < 0 || index >= this.length) return null;
        if (index === 0) return this.removeHead();
        if (index === this.length - 1) return this.removeTail();

        // Find the node right Before `index` (`index-1`)
        const prevNode = this._getNodeAt(index - 1);
        const removed = prevNode.next;
        // Bypass `removed` by pointing `prevNode.next` to `removed.next`
        // [prevNode] -> removed -> [removed.next]
        // [prevNode] -> [removed.next]
        prevNode.next = removed.next;
        // Reduce list length and return removed node
        this.length--;
        return removed.value
    }
    delete(value) {
        //delete where value matches with argument O(n)
        //validate list
        if (!this.head) return null;
        // If the value is at `head` , use `removeHead()`
        if (this.head.value === value) return this.removeHead();
        // Walk forward until `current.next` holds the target value (or hits end)
        let current = this.head;
        // Traverse through `current.next` till hits the value or exit loop when ends
        while (current.next && current.next.value !== value) {
            current = current.next
        }
        // If found bypass next node to next node of removed node
        if (current.next) {
            const removed = current.next;
            current.next = removed.next;
            // If we happen to delete tail of the List, then update this.tail
            if (removed === this.tail) {
                this.tail = current;
            }
            //Decrease length
            this.length--;
            return removed;
        }
        return null; // returning null if no match found
    }
    indexOf(value) {
        //O(n) return index of matched value
        let current = this.head;
        let idx = 0;
        while (current) {
            if (current.value === value) return idx;
            idx++;
        }
        return -1;
    }
    reverse() {
        // Reverse a List
        //Time - O(n) , Space O(1)
        //Initialize prev as null and current as head
        let prev = null;
        let current = this.head;
        // Set tail as head
        this.tail = this.head;
        // Walk through the list flipping each nodes next pointing backward
        while (current != null) {
            const nextStep = current.next; //save next node before overriting `current.next` with `prev` 
            current.next = prev; // reverse the pointer to the backward at `prev`
            prev = current; // move `prev` one step forward to `current`
            current = nextStep; // Move `current` one step forward to `nextStep`
        }
        // When `current` becomes null, `prev` is sitting on the old tail (our new head!)
        this.head = prev
        return this;
    }
    findMiddle() {
        // O(n) time, O(1) space - Find the Middle Node using Fast & Slow Pointers
        if (!this.head) return null;
        //Start bot pointers at `head`
        let slow = this.head;
        let fast = this.head;
        //Advance `slow` 1 step and `fast` by 2 steps each iteration
        // Because fast travels 2X speed , when fast reaches at the end, `slow at its 1/2.
        while (fast && fast.next) {
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow.value;
    }
    getFromKthEnd(k) {
        // O(n) time, O(1) space - Get the k-th node from the end (k=1 is tail, k=2 is 2nd from end)

        if (k <= 0 || k > this.length) return null;
        //Start both `leader and `follower` at `head`
        let leader = this.head;
        let follower = this.head;
        // Move `leader` k steps ahead to create a fixed gap of size 'k'
        for (let i = 0; i < k; i++) {
            leader = leader.next;
        }
        // Move both pointers 1 step at a time until `leader` walks off the end ('null').
        // Because `follower` is 'k' steps behind `leader`, `follower` lands on the k-th node from the end!
        while (leader) {
            leader = leader.next;
            follower = follower.next;
        }
        return follower.value;
    }
    hasCycle() {
        // O(n) time, O(1) space - Floyd's Cycle Detection (Tortoise and Hare)
        // Start `slow` (+1 step) and `fast` (+2 steps) at `head`
        let slow = this.head;
        let fast = this.head;
        // If there is no cycle, `fast` will hit 'null' and exit
        // If there is a cycle, `fast` will loop around and eventually land on the exact same node as `slow`!
        while (fast && fast.next) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow === fast) return true;
        }
        return false;
    }
    removeDuplicates() {
        // O(n) time, O(n) space - Remove duplicate values while preserving order
        if (!this.head) return this;
        //Create a set of values already seen starting with head.value
        const seen = new Set([this.head.value]);
        let current = this.head;

        // Inspect current.next in each step of loop
        while (current.next) {
            if (seen.has(current.next.value)) {
                // Duplicate found if it's the tail, update `this.tail` to `current`
                if (current.next === this.tail) {
                    this.tail = current;
                }
                // Bypass the duplicate node (`current.next`)
                current.next = current.next.next;
                this.length--;
            } else {
                //First tile seeing this value - record it in `seen` and step forward
                seen.add(current.next.value);
                current = current.next;
            }
        }
        return this;
    }
    toArray(){
        const result = [];
        let current = this.head;
        while (current){
            result.push(current.value);
            current= current.next
        }
        return result;
    }
}
if(require.main===module){
  const list = new LinkedList();
  [10, 20, 30, 40, 50].forEach((n) => list.append(n));
  console.log("Initial List:         ", list.toArray().join(" -> "));

  list.insertAt(2, 25);
  console.log("After insertAt(2, 25):", list.toArray().join(" -> "));
  console.log("Middle Element:       ", list.findMiddle());
  console.log("2nd from End:         ", list.getFromKthEnd(2));

  list.reverse();
  console.log("After reverse():      ", list.toArray().join(" -> "));

  list.append(25).append(10);
  console.log("With duplicates:      ", list.toArray().join(" -> "));
  list.removeDuplicates();
  console.log("removeDuplicates():   ", list.toArray().join(" -> "));
  console.log("hasCycle():           ", list.hasCycle());
}

module.exports = { ListNode, LinkedList };