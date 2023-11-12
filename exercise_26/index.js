// Задача: Рекурсивный обход дерева DOM:
// Напишите функцию, которая рекурсивно обходит дерево DOM,
// начиная с указанного элемента, и выполняет определенное действие с каждым узлом
// (например, выводить информацию о теге в консоль).

// Здесь необходимо обратить внимание на разницу между HTMLCollection и NodeList;
// HTMLCollection представляет собой динамическую структуру данных, а NodeList — статическую структуру данных.
// То есть HTMLCollection обновляется каждый раз, когда , например, меняется
// количество элементов. А NodeList не меняется после формирования, даже если меняется HTML-код страницы.

// someElement.children вернет HTMLCollection
// someElement.childNodes вернет NodeList

window.onload = function() {
  traverseDom (document.body);
}

function  traverseDom(node) {

  let elts = node.children;

  for (let i = 0; i < elts.length; i++) {
    console.log(elts[i])

    if (i ^ 1) {
      elts[i].style.background = 'azure';
    } else {
      elts[i].style.background = 'aquamarine';
    }

    // Проверить, что тип узла - ELEMENT_NODE
    if (elts[i].nodeType === 1) {
      traverseDom(elts[i])
    }
  }
}


// ВТОРОЙ ВАРИАНТ, здесь в консоль будут выводиться еще и текстовые узлы #text - новая строка с пробелами
// function  traverseDom(node) {

//   let elts = node.childNodes;
//   for (let el of elts) {
//     console.log(el)

//     // Проверить, что тип узла - ELEMENT_NODE
//     if (el.nodeType === 1) {
//       el.style.background = 'azure';
//       traverseDom(el)
//     }
//   }
// }

