class CalcControler{
    constructor(){
        this._operation = [];
        this._locale = 'pt-BR';
        this._lastOperator = '';
        this._lastNumber = '';
        this.calcModel = new CalculatorModel;
        this.initialize();
        this.initButtonsEvents();
        this.initKeyboard();
    }

    copyToClipboard(){
        let input = document.createElement('input');
        input.value = this.calcModel.displayCalc;

        document.body.appendChild(input);

        input.select();

        document.execCommand("Copy");

        input.remove();
    }

    initialize(){
        this.setDisplayDateTime();
        setInterval(() => {
            this.setDisplayDateTime();
        },1000);
        this.setLastNumberToDisplay();
    }
    
    initKeyboard(){
        document.addEventListener('keyup', e=>{
            this.execBtn(e.key, e.ctrlKey);
        });
    }

    initButtonsEvents(){
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");
        buttons.forEach((btn, index) =>{        
            this.addEventListenerAll(btn, 'click drag', e=>{
                let textBtn = btn.className.baseVal.replace("btn-", "");
                this.execBtn(textBtn);
            });
        
            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e => {
                btn.style.cursor = "pointer";
            });
        })
    }   

    setDisplayDateTime() {        
        this.calcModel.displayDate = this.calcModel.currentDate.toLocaleDateString(this._locale);
        this.calcModel.displayTime = this.calcModel.currentDate.toLocaleTimeString(this._locale);
    }

    addEventListenerAll(element, events, fn){
        events.split(' ').forEach(event => {
            element.addEventListener(event, fn, false);
        })
    }

    execBtn(btnValue, ctrlBtnEvent = false){
        switch(btnValue){
            case 'ac':
            case 'Escape':
                this.clearAll();
                break;
            case 'Backspace':    
            case 'ce':
                this.clearEntry();
            case 'soma':
            case '+':
                this.addOperation('+');
                break;
            case '-':
            case 'subtracao':
                this.addOperation('-');
                break;
            case '/':
            case 'divisao':
                this.addOperation('/');
                break;
            case 'multiplicacao':
            case '*':
                this.addOperation('*');
                break;
            case 'porcento':
                this.addOperation('%');
                break;
            case 'igual':
            case 'Enter':
                this.calc();
                break;
            case 'ponto':
            case '.':
            case ',':
                this.addDot();
                break;

            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(btnValue))
                break;
            
            case 'c':
                if(ctrlBtnEvent){
                    this.copyToClipboard();
                }

        }
    }

    addOperation(value){

        if(isNaN(this.getLastOperation())){

            if(this.isOperator(value)){
                this.setLastOperation(value);                

            } 
            else{
                this.pushOperation(value)
                this.setLastNumberToDisplay();
            }
        } else{
            if(this.isOperator(value)){
                this.pushOperation(value);
            }
            else{
                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperation(newValue);

                this.setLastNumberToDisplay();
            }
        }
    }

    addDot(){
        let lastOperation = this.getLastOperation();
        if(typeof lastOperation === 'string' && lastOperation.split('').indexOf('.') > -1) return;
        if(this.isOperator(lastOperation) || !lastOperation){
            this.pushOperation('0.');
        }else{
            this.setLastOperation(lastOperation.toString() + '.');
        }
        this.setLastNumberToDisplay();
    }
    
    pushOperation(value){
        this._operation.push(value);
        if(this._operation.length > 3){
            this.calc()
        }
    }

    getLastOperation(){
        return this._operation[this._operation.length-1];
    }
    setLastOperation(btnValue){
        this._operation[this._operation.length-1] = btnValue;
    }

    getResult(){
        return eval(this._operation.join(""));
    }

    calc(){
        let last = '';

        this._lastOperator = this.getLastItem();

        if(this._operation.length < 3){
            let firstItem = this._operation[0];
            this._operation = [firstItem, this._lastOperator, this._lastNumber];
        }

        if(this._operation.length > 3){
            last = this._operation.pop();
            this._lastNumber = this.getLastItem();
        }
        else if(this._operation.length == 3){
            this._lastNumber = this.getLastItem(false);
        }

        let result = this.getResult();

        if(last == '%'){
            result /= 100;
            this._operation = [result];
        }
        else{

            this._operation = [result];
            if(last) {
                this._operation.push(last);
            }
        }
        this.setLastNumberToDisplay();
    }
    
    getLastItem(isOperator = true){
        let lastItem;

        for(let i = this._operation.length-1; i >= 0; i--){            
            if (this.isOperator(this._operation[i]) == isOperator){
                lastItem = this._operation[i];
                break;
            }            
        }
        if(!lastItem){
            lastItem = (isOperator) ? this._lastOperator : this._lastNumber;
        }
        return lastItem;
    }

    setLastNumberToDisplay(){
        let lastNumber = this.getLastItem(false);
                               
        if(!lastNumber) lastNumber = 0;        

        this.calcModel.displayCalc = lastNumber;
    }

    isOperator(btnValue){
        return (['+', '-', '*', '/', '%'].includes(btnValue));
    }

    clearAll(){
        this._operation = [];
        this._lastNumber = '';
        this._lastOperator = '';
        this.setLastNumberToDisplay();
    }

    clearEntry(){
        this._operation.pop();
        this.setLastNumberToDisplay();
    }

    setError(){
        console.log('Erro no switch dos valores');
    }
}