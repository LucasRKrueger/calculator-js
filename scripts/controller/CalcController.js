class CalcControler{
    constructor(){
        this._operation = [];
        this._locale = 'pt-BR';
        this.calcModel = new CalculatorModel;
        this.initialize();
        this.initButtonsEvents();
    }

    initialize(){
        this.setDisplayDateTime();
        setInterval(() => {
            this.setDisplayDateTime();
        },1000);
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

    execBtn(btnValue){
        switch(btnValue){
            case 'ac':
                this.clearAll();
                break;
            case 'ce':
                this.clearEntry();
            case 'soma':
                this.addOperation('+');
                break;
            case 'subtracao':
                this.addOperation('-');
                break;
            case 'divisao':
                this.addOperation('/');
                break;
            case 'multiplicacao':
                this.addOperation('*');
                break;
            case 'porcento':
                this.addOperation('%');
                break;
            case 'igual':
                this.addOperation('=');
                break;
            case 'ponto':
                this.addOperation('.');
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
                
            default:
                this.setError();
                break;            
        }
    }

    addOperation(value){

        if(isNaN(this.getLastOperation())){

            if(this.isOperator(value)){
                this.setLastOperation(value);                

            } else if(isNaN(value)){                
                console.log('')
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
                this.setLastOperation(parseInt(newValue));

                this.setLastNumberToDisplay();
            }
        }
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

    calc(){
        let last = this._operation.pop();
        let result = eval(this._operation.join(""));

        this._operation = [result, last];
        this.setLastNumberToDisplay();
    }
    
    setLastNumberToDisplay(){
       let lastNumber;
       
       for(let i = this._operation.length-1; i >= 0; i--){
           if (!this.isOperator(this._operation[i])){
                lastNumber = this._operation[i];
                break;
           }
       }
       this.calcModel.displayCalc = lastNumber;
    }

    isOperator(btnValue){
        return (['+', '-', '*', '/', '%'].includes(btnValue));
    }

    clearAll(){
        this._operation = [];
    }

    clearEntry(){
        
    }

    setError(){
        console.log('Erro no switch dos valores');
    }
}