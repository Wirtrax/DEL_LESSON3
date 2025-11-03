//Задание 1
function fucn(firstLevelArgs) {
  // наверное func, но по заданию fucn
  const numbers = [Number(firstLevelArgs)];
  if (isNaN(numbers[0])) {
    throw new Error("Введены некорректные данные");
  }

  const operators = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b,
  };

  let operator = operators["+"];

  function chain(nextLevelArgs) {
    if (operators.hasOwnProperty(nextLevelArgs)) {
      operator = operators[nextLevelArgs];
      const result = numbers.reduce(operator);
      numbers.length = 0;
      numbers.push(result);
      return result;
    }
    if (nextLevelArgs != undefined && nextLevelArgs != null) {
      const nextNumber = Number(nextLevelArgs);
      numbers.push(nextNumber);
    }
    return chain;
  }
  chain.valueOf = () => numbers.reduce(operator);
  chain.toString = () => numbers.reduce(operator);
  return chain;
}

// alert(fucn(4)(3)(3)); // а так работает, потому что alert вызывает toString автоматически
// console.log(fucn(4)(3)(1).valueOf()); // так работает, чтобы получить число явно вызываем valueOf
console.log(+fucn(4)(3)(2)); // так тоже работает, потому что плюс вызывает valueOf автоматически
console.log(fucn(4)(3)(3)); // так не работает, потому что возвращается как бы объект(функции) с полями в которых есть нужные нам значения,
// //но чтобы их получить нам нужен valueOf() явно вызвать, я так и не понял как сделать это по умолчанию (нашел какой-то сопособ с Symbol.toPrimitive, но побоялся его использовать, проверил, все равно не работает)
console.log(fucn(10)(2)()("-")); // так работает, пропускает null/undefined автоматически возвращает значение по появлению оператора

//Задание 2
let string = "one.two.three.foru";
function makeDeepObject(str) {
  const objectNames = str.split(".");
  const regex = /[^a-zA-Z$_]/;
  let globalObject = {};
  let currentObject = globalObject;
  for (let i = 0; i < objectNames.length; i++) {
    objectNames[i] = objectNames[i].trim();
    if (objectNames[i] === "") continue;
    if (objectNames[i][0] >= "0" && objectNames[i][0] <= "9") {
      throw new Error("Имя свойства не может начинаться с цифры");
    } else if (regex.test(objectNames[i][0]) || /[:]/.test(objectNames[i])) {
      throw new Error("Имя начинается с недопустимого символа или содержит недопустимый символ");
    }
    let name = objectNames[i];
    currentObject[name] = {};
    currentObject = currentObject[name];
  }
  return globalObject;
}

console.log(makeDeepObject(string));
