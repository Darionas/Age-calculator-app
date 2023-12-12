'Use strict';
/*jshint esversion: 8*/

const dayLabel = document.querySelector('.day__label');
const monthLabel = document.querySelector('.month__label');
const yearLabel = document.querySelector('.year__label');
const labels = document.getElementsByTagName('label');
const day = document.querySelector('#day__id');
const month = document.querySelector('#month__id');
const year = document.querySelector('#year__id');
const dayError = document.querySelector('#day__validation-error'); 
const monthError = document.querySelector('#month__validation-error');
const yearError = document.querySelector('#year__validation-error');
const error = document.getElementsByClassName('error');
const yearsNumber = document.querySelector('.result__years-number');
const monthsNumber = document.querySelector('.result__months-number');
const daysNumber = document.querySelector('.result__days-number');
const inputs = document.getElementsByTagName('input');
const btn = document.querySelector('#btn');
let animos = document.getElementsByClassName('animo');
let dateInput, val, yearResult, monthResult, dayResult;


btn.addEventListener('click', function(e) {
    e.preventDefault();
    const today = new Date();
    const getYear = today.getFullYear();
    const getMonth = today.getMonth();
    const getDay = today.getDate();
    const dayVal = + day.value;
    const monthVal = + month.value - 1;
    const yearVal = + year.value;   
      
    dateInput = new Date(yearVal, monthVal, dayVal);
                
    //validation of date input
    for(let i=0; i < inputs.length; i++) {
        let input = Number(inputs[i].value);
        
    if(input === null || input === undefined || input === 0) {
        inputs[i].classList.add('border_color');
        labels[i].classList.add('coloring');
        error[i].classList.add('visible');
        error[i].innerHTML = 'This field is required';
            
        } else if(isNaN(input)) {
            inputs[i].classList.add('border_color');
            labels[i].classList.add('coloring');
            error[i].classList.add('visible');
            error[i].innerHTML = 'Number is required';
            
        } else {
            inputs[i].classList.remove('border_color');
            labels[i].classList.remove('coloring');
            error[i].classList.remove('visible');
        }   
        
    }
    
    
    //--------Validation of number of days in a given month-----------
    //https://stackoverflow.com/questions/1433030/validate-number-of-days-in-a-given-month#answer-1433119
    function daysInMonth(monthVal, yearVal) { // m is 0 indexed: 0-11
        switch (monthVal) {
            case 1 :
                return (yearVal % 4 == 0 && yearVal % 100) || yearVal % 400 == 0 ? 29 : 28;
            case 8 : case 3 : case 5 : case 10 :
                return 30;
            default :
                return 31;
        }
    }
    
    function isValid(dayVal, monthVal, yearVal) {
        return monthVal >= 0 && monthVal < 12 && dayVal > 0 && dayVal <= daysInMonth(monthVal, yearVal);
    }
    
    if(dayVal > 0 && monthVal > 0 && yearVal > 0) {
        val = isValid(dayVal, monthVal, yearVal);
    }
   //-----------------------------------------------------
    
    if(val == false || dateInput > today) {
        day.classList.add('border_color');
        dayLabel.classList.add('coloring');
        dayError.classList.add('visible');
        dayError.innerHTML = 'Must be a valid day';
        
    } 
    
    if(monthVal > 11 && monthVal > getMonth) {
        day.classList.add('border_color');
        dayLabel.classList.add('coloring');
        dayError.classList.add('visible');
        dayError.innerHTML = 'Must be a valid day';
        
        month.classList.add('border_color');
        monthLabel.classList.add('coloring');
        monthError.classList.add('visible');
        monthError.innerHTML = 'Must be a valid month';
        
    } 
    
    if(yearVal > getYear) {
        day.classList.add('border_color');
        dayLabel.classList.add('coloring');
        dayError.classList.add('visible');
        dayError.innerHTML = 'Must be a valid day';
        
        month.classList.add('border_color');
        monthLabel.classList.add('coloring');
        monthError.classList.add('visible');
        monthError.innerHTML = 'Must be a valid month';
        
        year.classList.add('border_color');
        yearLabel.classList.add('coloring');
        yearError.classList.add('visible');
        yearError.innerHTML = 'Must be in the past';
    }
    
      
    //calculate years, months, days
    //https://stackoverflow.com/questions/17732897/difference-between-two-dates-in-years-months-days-in-javascript#answer-49201872
    if(dateInput < today && val == true) {
        const yearInput = dateInput.getFullYear();
        const february = (yearInput % 4 === 0 && yearInput % 100 !== 0) || yearInput % 400 === 0 ? 29 : 28;
        const daysInMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        
        yearResult = getYear - yearInput;
        
        monthResult = getMonth - dateInput.getMonth();
        if(monthResult < 0) {
            yearResult--;
            monthResult += 12;
        }
       
        dayResult = getDay - dateInput.getDate();
        if(dayResult < 0) {
            if(monthResult > 0) {
                monthResult--;
            } else {
                yearResult--;
                monthResult = 11;
            }
            dayResult += daysInMonth[dateInput.getMonth()];
        }
        
        yearsNumber.innerHTML = yearResult;
        monthsNumber.innerHTML = monthResult;
        daysNumber.innerHTML = dayResult;

    } else {
        yearResult = 0;
        yearsNumber.innerHTML = yearResult;
        monthResult = 0;
        monthsNumber.innerHTML = monthResult;
        dayResult = 0;
        daysNumber.innerHTML = dayResult;
    }
    
    //add/remove -s in words year, month, day
    if(yearResult > 1 || yearResult == 0) {
        document.querySelector('.y').classList.add('visible');
        document.querySelector('.y').classList.remove('hide');
    } 
    if(yearResult == 1) {
        document.querySelector('.y').classList.remove('visible');
        document.querySelector('.y').classList.add('hide');
    }
    
    if(monthResult > 1 || monthResult == 0) {
        document.querySelector('.m').classList.add('visible');
        document.querySelector('.m').classList.remove('hide');
    } 
    if(monthResult == 1) {
        document.querySelector('.m').classList.remove('visible'); 
        document.querySelector('.m').classList.add('hide');
    }
    
    if(dayResult > 1 || dayResult == 0) {
        document.querySelector('.d').classList.add('visible');
        document.querySelector('.d').classList.remove('hide');
    } 
    if(dayResult == 1) {
        document.querySelector('.d').classList.remove('visible'); 
        document.querySelector('.d').classList.add('hide');
    }

    
    //animation
    restart('number');

});

//animation
//https://stackoverflow.com/questions/35200605/refire-css-animation-with-javascript-after-a-previous-one-is-complete#answer-35203145
function restart(anim) {    
    for(let animo of animos) { 
        animo.classList.remove(anim);
        setTimeout(function() {
            animo.classList.add(anim);
        }, 0);
    
    }
}
