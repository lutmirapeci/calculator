// script.js

const calculate = (expression) => {
  const expressionParts = expression.split(" ");
  let values = [];

  for (const expressionPart of expressionParts) {
    if (!isNaN(parseFloat(expressionPart))) {
      values.push(parseFloat(expressionPart));
    } else {
      if (values.length < 2) {
        throw new Error("Insufficient values for operation: " + expressionPart);
      }

      const operand2 = values.pop();
      const operand1 = values.pop();
      switch (expressionPart) {
        case "+":
          values.push(operand1 + operand2);
          break;
        case "-":
          values.push(operand1 - operand2);
          break;
        case "*":
          values.push(operand1 * operand2);
          break;
        case "/":
          if (operand2 === 0) {
            throw new Error("Division by zero is not allowed.");
          }
          values.push(operand1 / operand2);
          break;
        default:
          throw new Error("Invalid operator: " + expressionPart);
      }
    }
  }

  if (values.length > 1) {
    console.warn("Warning: Some operands were left unused. Final values array: " + values);
    throw new Error("Some operands were left unused. Result may not be correct.");
  }

  return values[0];
};

document.getElementById("calculateBtn").addEventListener("click", () => {
  const expression = document.getElementById("expression").value;
  const resultParagraph = document.getElementById("result");

  try {
    const result = calculate(expression);
    resultParagraph.textContent = `Result: ${result}`;
  } catch (error) {
    resultParagraph.textContent = `Error: ${error.message}`;
  } finally {
    document.getElementById("expression").value = "";
  }
});
