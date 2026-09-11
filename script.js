// Simple calculator logic
(function () {
  const display = document.getElementById('display');
  const buttons = document.querySelectorAll('.buttons .btn');
  let expr = '';

  function updateDisplay(value) {
    display.value = value || '0';
  }

  function sanitizeAndEval(input) {
    // allow digits, whitespace, parentheses, and operators + - * / . 
    if (!/^[0-9+\-*/().\s]+$/.test(input)) {
      throw new Error('Invalid characters');
    }
    // Basic safety: disallow leading zeros like 000... but not required; use JS evaluation
    // Evaluate using Function to avoid using eval directly
    // eslint-disable-next-line no-new-func
    return Function('"use strict"; return (' + input + ')')();
  }

  function isOperator(ch) {
    return ['+', '-', '*', '/'].includes(ch);
  }

  function appendValue(val) {
    const last = expr.slice(-1);

    // replace visible operators (×,÷) — but we store * and / already from buttons
    if (isOperator(val)) {
      // don't allow two operators in a row (replace last operator)
      if (expr === '' && val !== '-') {
        // prevent starting with operator except minus
        return;
      }
      if (isOperator(last)) {
        expr = expr.slice(0, -1) + val;
      } else {
        expr += val;
      }
    } else if (val === '.') {
      // prevent multiple decimals in the current number
      const match = expr.match(/([0-9.]+)$/);
      if (match && match[0].includes('.')) return;
      expr += '.';
    } else {
      expr += val;
    }
    updateDisplay(expr);
  }

  function clearAll() {
    expr = '';
    updateDisplay('0');
  }

  function backspace() {
    expr = expr.slice(0, -1);
    updateDisplay(expr || '0');
  }

  function evaluateExpr() {
    if (!expr) 
      return;
    try {
      const result = sanitizeAndEval(expr);
      expr = String(result);
      updateDisplay(expr);
    } catch (e) {
      updateDisplay('Error');
      expr = '';
    }
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.action;
      const val = btn.dataset.value;

      if (action === 'clear') {
        clearAll();
      } else if (action === 'back') {
        backspace();
      } else if (action === 'equals') {
        evaluateExpr();
      } else if (val !== undefined) {
        // convert displayed operator symbols to real operators
        const plainVal = val.replace('×', '*').replace('÷', '/');
        appendValue(plainVal);
      }
    });
  });

  // Keyboard support
  window.addEventListener('keydown', (e) => {
    const key = e.key;
    if ((/^[0-9]$/).test(key)) {
      appendValue(key);
      e.preventDefault();
      return;
    }
    if (key === 'Enter' || key === '=') {
      evaluateExpr();
      e.preventDefault();
      return;
    }
    if (key === 'Backspace') {
      backspace();
      e.preventDefault();
      return;
    }
    if (key === 'Escape') {
      clearAll();
      e.preventDefault();
      return;
    }
    if (['+', '-', '*', '/', '(', ')', '.'].includes(key)) {
      appendValue(key);
      e.preventDefault();
      return;
    }
  });

  // initialize
  clearAll();
})();