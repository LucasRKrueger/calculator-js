class CalculatorModel {
    constructor(){
        this._displayCalcEl =  document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._currentDate;
    }
    get displayTime(){
        return this._timeEl.innerHTML;
    }
    set displayTime(value){
        this._timeEl.innerHTML = value;
    }
    get displayDate(){
        return this._dateEl.innerHTML;
    }    
    set displayDate(value){
        this._dateEl.innerHTML = value;
    }
    get displayCalc(){
        return this._displayCalcEl.innerHTML;
    }
    set displayCalc(value){
        if(!value.toString().length > 10){        
            this._displayCalcEl.innerHTML = value;        
        }
    }
    get currentDate(){
        return new Date();        
    }
    set currentDate(value){
        this._currentDate = value;
    }
}