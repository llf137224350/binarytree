/**
 * @author llfob
 * @date 2018/3/29
 * @description TODO
 * @version 1.0
 */
function BinaryTree() {
  // node 节点数据结构
  var Node = function (key) {
    this.key = key; // 节点值
    this.left = null; // 左子树
    this.right = null; // 右子树
  }
  // 根节点 遍历的入口
  var root = null;
  // 插入节点 根据根节点进行遍历插入
  var insertNode = function (root, node) {
    if (root.key < node.key) {
      if (root.right === null)
        root.right = node;
      else
        insertNode(root.right, node)
    } else {
      if (root.left === null)
        root.left = node;
      else
        insertNode(root.left, node)
    }
  }
  // 插入方法
  this.insert = function (key) {
    var node = new Node(key);
    if (root === null) { // 最开始创建的根节点
      root = node;
    } else {
      insertNode(root, node)
    }
  }

  // 前序遍历二叉树 复制一颗二叉树 先打当前节点值 在访问左子树 再右子数 中 左 右
  var preOrderTraverseNode = function (node, callback) {
    if (node != null) {
      // 输出当前节点
      callback(node.key);
      // 遍历左子树
      preOrderTraverseNode(node.left, callback);
      // 遍历右子数
      preOrderTraverseNode(node.right, callback);
    }
  }
  this.preOrderTraverse = function (callback) {
    preOrderTraverseNode(root, callback)
  }

  // 中序遍历 先访问左子树 打印当前节点值 访问右子数 左 中 右
  var inOrderTraverseNode = function (node, callback) {
    if (node != null) {
      // 遍历左子树
      inOrderTraverseNode(node.left, callback);
      // 输出当前节点
      callback(node.key);
      // 遍历右子数
      inOrderTraverseNode(node.right, callback);
    }
  }
  this.inOrderTraverse = function (callback) {
    inOrderTraverseNode(root, callback)
  }

  // 后续遍历 先访问当前节点的左子树 在访问右子数 再访问当前节点 左 右 中
  var postOrderTraverseNode = function (node, callback) {
    if (node != null) {
      // 遍历左子树
      postOrderTraverseNode(node.left, callback);
      // 遍历右子数
      postOrderTraverseNode(node.right, callback);
      // 输出当前节点
      callback(node.key);
    }
  }
  this.postOrderTraverse = function (callback) {
    postOrderTraverseNode(root, callback)
  }
  // 最小值 最小值在左子树
  var minNode = function (node) {
    if (node != null) {
      while (node && node.left != null) {
        node = node.left;
      }
      return node.key;
    }
    return null;
  }
  this.min = function () {
    return minNode(root);
  }
  // 最大值 最大值在右子树
  var maxNode = function (node) {
    if (node != null) {
      while (node && node.right != null) {
        node = node.right;
      }
      return node.key;
    }
    return null;
  }
  this.max = function () {
    return maxNode(root);
  }

  // 搜索
  var searchNode = function (node, key) {
    if (node === null)
      return false;
    if (node.key === key) {
      return true
    } else if (node.key > key) { // 从左子树中查
      return searchNode(node.left, key)
    } else if (node.key < key) {// 从右子树中查
      return searchNode(node.right, key)
    } else {
      return false;
    }
  }
  this.search = function (key) {
    return searchNode(root, key)
  }
  // 删除叶子节点
  var findMinNode = function (node) {
    if (node != null) {
      while (node && node.left != null) {
        node = node.left;
      }
      return node;
    }
    return null;
  }
  // 实际删除的为叶子节点，删除中间节点也为叶子节点
  var removeNode = function (node, key) {
    if (node === null) {
      return null;
    }
    if (node.key < key) {
      node.right = removeNode(node.right, key)
    } else if (node.key > key) {
      node.left = removeNode(node.left, key);
    } else {
      if (node.left === null && node.right === null) {// 叶子节点
        node = null;
      } else if (node.left === null) // 没有左孩子
      {
        node = node.right;
      } else if (node.right === null) { // 没有右孩子
        node = node.left;
      } else {
        // 当前节点有左右节点
        var aux = findMinNode(node.right);
        // 讲删除孩子右子树节点最小值赋值给当前节点，并非实际的删除当前节点，然后将右子树的最小值节点删除（叶子节点）
        node.key = aux.key;
        node.right = removeNode(node.right, aux.key)
      }
    }
    return node;
  }
  this.remove = function (key) {
    root = removeNode(root, key)
    console.log(root);
  }
}