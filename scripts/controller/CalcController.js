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
                let textBtn = console.log(btn.className.baseVal.replace("btn-", ""));
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

                break;
            case 'subtracao':

                break;
            case 'divisao':

                break;
            case 'porcento':

                break;
            case 'igual':

                break;
            default:
                this.setError();
                break;            
        }
    }

    addOperation(value){
        this._operation.push(value);
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