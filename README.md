# Calculator

A simple, clean calculator for the browser, built with plain HTML, CSS and JavaScript. No frameworks, no build step, no dependencies.

## Features

- Addition, subtraction, multiplication and division
- Parentheses for grouping, so you can enter full expressions like `(2 + 3) * 4`
- Decimal numbers, with protection against typing two decimal points in one number
- Clear (`C`) and backspace (`⌫`) buttons
- Full keyboard support
- Operator handling: typing a second operator replaces the first, and an expression can't start with an operator other than minus
- Shows `Error` for invalid or incomplete expressions
- Responsive layout and accessibility touches (ARIA labels on buttons and the display, a visually hidden page heading)

## Demo

There's no build or install step. Open `index.htm` in any modern browser.

## Usage

Click the buttons or use your keyboard:

| Key | Action |
| --- | --- |
| `0`-`9` | Enter digits |
| `+` `-` `*` `/` | Operators |
| `(` `)` | Parentheses |
| `.` | Decimal point |
| `Enter` or `=` | Calculate |
| `Backspace` | Delete the last character |
| `Esc` | Clear everything |

After pressing `=`, the result stays on the display, so you can keep calculating with it.

## Project structure

```
Calculator/
├── index.htm     # Page markup and calculator buttons
├── styles.css    # Layout, theme and button styles
└── script.js     # Calculator logic and keyboard handling
```

## How it works

- Button presses and key presses build up an expression string (for example `(2+3)*4`).
- When you press `=`, the expression is first checked against a whitelist that only allows digits, whitespace, parentheses, `.` and the operators `+ - * /`.
- Only expressions that pass the check are evaluated, using `Function` rather than `eval`. Anything else, or any expression that fails to evaluate, shows `Error`.

## Known limitations

- Standard JavaScript floating-point math applies, so results like `0.1 + 0.2` show `0.30000000000000004`.
- Dividing by zero shows `Infinity` rather than an error message.
- After a result is shown, typing a digit appends to it instead of starting a new calculation. Press `C` or `Esc` to start fresh.
