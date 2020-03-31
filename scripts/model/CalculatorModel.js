class CalculatorModel {

    get displayTime(){
        return this._timeEl.innerHTML;
    }
    get displayDate(){
        return this._dateEl.innerHTML;
    }
    set displayTime(value){
        this._timeEl.innerHTML = value;
    }
    set displayDate(value){
        this._dateEl.innerHTML = value;
    }
    get displayCalc(){
        return this._displayCalcEl.innerHTML;
    }
    set displayCalc(value){
        this.displayCalcEl.innerHTML = value;
    }
    get currentDate(){
        return new Date();        
    }
    set currentDate(value){
        this._currentDate = value;
    }
}