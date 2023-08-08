function NodeMaker(item) {
  let obj = {};
  obj["data"] = item;
  obj["left"] = null;
  obj["right"] = null;
  return obj;
}

function TreeMaker(unfilteredArr, start, unfilteredEnd) {
  // sort and remove duplicates
  // could add a sortingdata riiight here. with TreeMaker accepting it as parameter
  const filteredArr = [];
  unfilteredArr.forEach((element) => {
    if (!filteredArr.includes(element)) {
      filteredArr.push(parseInt(element));
    }
  });
  filteredArr.sort((a, b) => {
    return a - b;
  });
  console.log(filteredArr);
  function constructor(array, start, end) {
    // base case:
    if (start > end) {
      return null;
    }
    // recursive case:
    const mid = parseInt((start + end) / 2);
    const root = NodeMaker(array[mid]);
    root.left = constructor(array, start, mid - 1);
    root.right = constructor(array, mid + 1, end);
    return root;
  }
  const tree = constructor(filteredArr, start, filteredArr.length - 1);
  // add methods...
  function inserter(object) {
    return {
      insert: (item) => {
        if (!parseInt(item)) return;
        let cursor = object;
        while (cursor.data != item) {
          if (item < cursor.data) {
            if (cursor.left == null) {
              cursor.left = NodeMaker(item);
              return;
            } else {
              cursor = cursor.left;
            }
          } else if (item > cursor.data) {
            if (cursor.right == null) {
              cursor.right = NodeMaker(item);
              return;
            } else {
              cursor = cursor.right;
            }
          }
        }
        return;
      },
    };
  }

  function finder(object) {
    return {
      find: (value) => {
        // for node, if node.value = value, return that node, else, if lower, compare with left, if higher, compare with right
        let cursor = object;
        while (cursor != null) {
          if (value == cursor.data) {
            return cursor;
          } else if (value < cursor.data) {
            cursor = cursor.left;
          } else {
            cursor = cursor.right;
          }
        }
      },
    };
  }

  function remover(object) {
    return {
      remove(value) {
        let cursor = object;
        let parent = cursor;
        while (cursor != null) {
          if (value < cursor.data) {
            parent = cursor;
            cursor = cursor.left;
          } else if (value > cursor.data) {
            parent = cursor;
            cursor = cursor.right;
          } else {
            break;
          }
        }
        //now start the function...?
        if (cursor.left == null) {
          if (cursor == parent.left) {
            parent.left = cursor.right;
          }
          if (cursor == parent.right) {
            parent.right = cursor.right;
          }
          delete cursor;
        } else if (cursor.right == null) {
          if (cursor == parent.left) {
            parent.left = cursor.left;
          }
          if (cursor == parent.right) {
            parent.right = cursor.left;
          }
          delete cursor;
        }
        // 2 children
        else {
          //find successor, copy data from successor to cursor, make successor's parent point to null/right branch(can't have left branch)
          let successor = cursor.right;
          let succParent = cursor;
          while (successor.left != null) {
            succParent = successor;
            successor = successor.left;
          }
          cursor.data = successor.data;
          //delete successor
          if (succParent.right == successor) {
            succParent.right = successor.right;
            delete successor;
          } else if (succParent.left == successor) {
            succParent.left = successor.right;
            delete successor;
          }
        }
      },
    };
  }
  function breadther(object) {
    return {
      breadth(Fn) {
        // traverse the tree and put contents in array.
        //if function is provided, pass array into function.
        const queue = [];
        const values = [];
        // if queue not empty
        // shift front
        // enqueue its children
        queue.unshift(object);
        for (let i = 0; i < queue.length; i++) {
          if (queue[i].left != null) {
            queue.push(queue[i].left);
          }
          if (queue[i].right != null) {
            queue.push(queue[i].right);
          }
        }
        // create array
        for (let element of queue) {
          if (!Fn) {
            values.push(element.data);
          } else {
            Fn(element);
          }
          if (!Fn) {
            return values;
          }
        }
      },
    };
  }
  function inOrderAdder(object) {
    return {
      inOrder(root, Fn, stack = []) {
        //visit left subtree
        function recurse(root, stack = []) {
          if (root == null) {
            return;
          }
          recurse(root.left, stack);
          console.log(root.data);
          stack.push(root);
          recurse(root.right, stack);
          //visit right subtree
          return stack;
        }
        const nodes = recurse(root, (stack = []));
        if (Fn) {
          nodes.forEach((element) => {
            Fn(element);
          });
        } else {
          const values = [];
          nodes.forEach((element) => {
            values.push(element.data);
          });
          return values;
        }
        return nodes;
      },
    };
  }
  function preOrderAdder(object) {
    return {
      preOrder(root, Fn, stack = []) {
        //visit left subtree
        function recurse(root, stack = []) {
          if (root == null) {
            return;
          }
          console.log(root.data);
          stack.push(root);
          recurse(root.left, stack);
          recurse(root.right, stack);
          //visit right subtree
          return stack;
        }
        const nodes = recurse(root, (stack = []));
        if (Fn) {
          nodes.forEach((element) => {
            Fn(element);
          });
        } else {
          const values = [];
          nodes.forEach((element) => {
            values.push(element.data);
          });
          return values;
        }
        return nodes;
      },
    };
  }
  function postOrderAdder(object) {
    return {
      postOrder(root, Fn, stack = []) {
        //visit left subtree
        function recurse(root, stack = []) {
          if (root == null) {
            return;
          }
          recurse(root.left, stack);
          recurse(root.right, stack);
          console.log(root.data);
          stack.push(root);
          //visit right subtree
          return stack;
        }
        const nodes = recurse(root, (stack = []));
        if (Fn) {
          nodes.forEach((element) => {
            Fn(element);
          });
        } else {
          const values = [];
          nodes.forEach((element) => {
            values.push(element.data);
          });
          return values;
        }
        return nodes;
      },
    };
  }
  function depther(object) {
    return {
      depth(value) {
        let cursor = object;
        let count = 0;
        while (cursor != null) {
          if (value == cursor.data) {
            return count;
          } else if (value < cursor.data) {
            count += 1;
            cursor = cursor.left;
          } else {
            cursor = cursor.right;
            count += 1;
          }
        }
      },
    };
  }
  function heighter(object) {
    return {
      height(node) {
        // return -1 to offset false positive?
        if (node == null) return -1;
        return 1 + Math.max(this.height(node.left), this.height(node.right));
      },
    };
  }
  function isBalancedMethodAdder(object) {
    return {
      isBalanced(node) {
        if (node == null) return 0;
        const arr = [this.isBalanced(node.left), this.isBalanced(node.right)];
        if (arr[0] !== false && arr[1] !== false) {
          if (Math.abs(arr[0] - arr[1]) > 1) {
            return false;
          }
          return arr[0] + arr[1] + 1;
        } else return false;
      },
    };
  }
  function reBalanceMethodAdder(object) {
    return {
      reBalance() {
        let array = [];
        function addToArray(node) {
          if (node == null) return;
          array.push(node.data);
          addToArray(node.left);
          addToArray(node.right);
        }
        addToArray(object);
        return TreeMaker(array, 0);
      },
    };
  }
  return Object.assign(
    tree,
    inserter(tree),
    finder(tree),
    remover(tree),
    breadther(tree),
    inOrderAdder(tree),
    preOrderAdder(tree),
    postOrderAdder(tree),
    depther(tree),
    heighter(tree),
    isBalancedMethodAdder(tree),
    reBalanceMethodAdder(tree)
  );
}

const myArr = [25, 15, 10, 4, 12, 22, 18, 24, 50, 35, 31, 44, 70, 66, 90, 91];
const tree = TreeMaker(myArr, 0, myArr.length - 1);
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

tree.breadth(function (node) {
  node.data = node.data * 1;
  console.log(node);
});
prettyPrint(tree);
const newNodes = tree.postOrder(tree, (node) => {
  node.data = node.data * 1;
  return node;
});
console.log(newNodes);
console.log(tree.depth(90));

console.log("test: " + tree.height(tree));

tree.breadth(function (node) {
  console.log(node, tree.height(node));
});

tree.insert(100);
tree.insert(99);
const newTree = tree.reBalance();
console.log(newTree.isBalanced(newTree));
prettyPrint(newTree);
