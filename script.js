document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = Array.from(document.getElementsByClassName('btn'));
    let currentInput = '';
    let operator = '';
    let firstOperand = '';
    let secondOperand = '';

    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const value = e.target.innerText;

            if (value === 'CLEAR') {
                currentInput = '';
                operator = '';
                firstOperand = '';
                secondOperand = '';
                display.innerText = '0';
            } else if (['+', '-', '*', '/'].includes(value)) {
                if (firstOperand === '') {
                    firstOperand = currentInput;
                } else {
                    firstOperand = operate(operator, firstOperand, currentInput);
                }
                operator = value;
                currentInput = '';
            } else if (value === 'EQUALS TO') {
                if (firstOperand !== '') {
                    secondOperand = currentInput;
                    display.innerText = operate(operator, firstOperand, secondOperand);
                    currentInput = display.innerText;
                    operator = '';
                    firstOperand = '';
                }
            } else if (value === '%') {
                currentInput = (parseFloat(currentInput) / 100).toString();
                display.innerText = currentInput;
            } else {
                currentInput += value;
                display.innerText = currentInput;
            }
        });
    });

    function operate(operator, firstOperand, secondOperand) {
        firstOperand = parseFloat(firstOperand);
        secondOperand = parseFloat(secondOperand);

        switch (operator) {
            case '+':
                return (firstOperand + secondOperand).toString();
            case '-':
                return (firstOperand - secondOperand).toString();
            case '*':
                return (firstOperand * secondOperand).toString();
            case '/':
                return (firstOperand / secondOperand).toString();
            default:
                return '0';
        }
    }
});






class Typerwriter {
    constructor(el, options){
      this.el = el;
      this.words = [...this.el.dataset.typewriter.split(',')];
      this.speed = options?.speed || 100;
      this.delay = options?.delay || 1500;
      this.repeat = options?.repeat;
      this.initTyping();
    }

    wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

    toggleTyping = () => this.el.classList.toggle('typing');

    async typewrite(word){
      await this.wait(this.delay);
      this.toggleTyping();
      for (const letter of word.split('')) {
        this.el.textContent += letter;
        await this.wait(this.speed)
      }
      this.toggleTyping();
      await this.wait(this.delay);
      this.toggleTyping();
      while (this.el.textContent.length !== 0){
        this.el.textContent = this.el.textContent.slice(0, -1);
        await this.wait(this.speed)
      }
      this.toggleTyping();
    }

    async initTyping() {
      for (const word of this.words){
        await this.typewrite(word);
      }
      if(this.repeat){
        await this.initTyping();
      } else {
        this.el.style.animation = 'none';
      }
    }
  }

  document.querySelectorAll('[data-typewriter]').forEach(el => {
    new Typerwriter(el, {
      repeat: true,
    })
  })