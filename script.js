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
let dateInput, val;


btn.addEventListener('click', function(e) {
    e.preventDefault();
    const today = new Date();
    const getYear = today.getFullYear();
    const getMonth = today.getMonth();
    const getDay = today.getDate();
    const dayVal = + day.value;
    const monthVal = + month.value - 1;
    const yearVal = + year.value;   
    console.log(getMonth);
    console.log(monthVal);
      
    dateInput = new Date(yearVal, monthVal, dayVal);
                
    for(let i=0; i < inputs.length; i++) {
        let input = Number(inputs[i].value);
        
    if(input === null || input === undefined || input === 0) {
        labels[i].classList.add('coloring');
        error[i].classList.add('visible');
        error[i].innerHTML = 'This field is required';
            
        } else if(isNaN(input)) {
            labels[i].classList.add('coloring');
            error[i].classList.add('visible');
            error[i].innerHTML = 'Number is required';
            
        } else {
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
        dayLabel.classList.add('coloring');
        dayError.classList.add('visible');
        dayError.innerHTML = 'Must be a valid day';
        
    } 
    
    if(monthVal > 11 && monthVal > getMonth) {
        dayLabel.classList.add('coloring');
        dayError.classList.add('visible');
        dayError.innerHTML = 'Must be a valid day';
        
        monthLabel.classList.add('coloring');
        monthError.classList.add('visible');
        monthError.innerHTML = 'Must be a valid month';
        
    } 
    
    if(yearVal > getYear) {
        dayLabel.classList.add('coloring');
        dayError.classList.add('visible');
        dayError.innerHTML = 'Must be a valid day';
        
        monthLabel.classList.add('coloring');
        monthError.classList.add('visible');
        monthError.innerHTML = 'Must be a valid month';
        
        yearLabel.classList.add('coloring');
        yearError.classList.add('visible');
        yearError.innerHTML = 'Must be in the past';
    }
    
    console.log(dayError.classList.contains('visible'))
       
   
    //let yearResult = (yearVal > 0) ? getYear - yearVal : 0;
    let yearResult, monthResult, dayResult;
    if(dateInput) {
        if(getYear < yearVal) {
            yearResult = 0;
        } else if(getYear > yearVal) {
            yearResult = (yearVal > 0) ? getYear - yearVal : 0;
        } else {
            yearResult = 0;
        }
        
        if(monthError.classList.contains('visible') === true) {
            monthResult = 0;
        } else if(getMonth < monthVal) {
            monthResult = (monthVal > 0) ? getMonth + 12 - monthVal : 0;
        } else {
            monthResult = (monthVal > 0) ? getMonth - monthVal : 0;
        }
       
        if (getDay < dayVal) {
            dayResult = (dayVal > 0) ? getDay + 30 - dayVal : 0;
        } else if(dayError.classList.contains('visible') === true) {
            dayResult = 0;
        } else {
            dayResult = (dayVal > 0) ? getDay - dayVal : 0;
        }
    
        if(yearResult > 1 || yearResult == 0) {
            document.querySelector('.y').classList.add('visible');
            document.querySelector('.y').classList.remove('hide');
            yearsNumber.innerHTML = yearResult;
        } 
        if(yearResult == 1) {
            document.querySelector('.y').classList.remove('visible');
            document.querySelector('.y').classList.add('hide');
            yearsNumber.innerHTML = yearResult;
        }
        
        if(monthResult > 1 || monthResult == 0) {
            document.querySelector('.m').classList.add('visible');
            document.querySelector('.m').classList.remove('hide');
            monthsNumber.innerHTML = monthResult;
        } 
        if(monthResult == 1) {
            document.querySelector('.m').classList.remove('visible'); 
            document.querySelector('.m').classList.add('hide');
            monthsNumber.innerHTML = monthResult;
        }
        
        if(dayResult > 1 || dayResult == 0) {
            document.querySelector('.d').classList.add('visible');
            document.querySelector('.d').classList.remove('hide');
            daysNumber.innerHTML = dayResult;
        } 
        if(dayResult == 1) {
            document.querySelector('.d').classList.remove('visible'); 
            document.querySelector('.d').classList.add('hide');
            daysNumber.innerHTML = dayResult;
        }

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
