
/*DOM*/
var btn = document.querySelector('.js_btn');
var histry = document.querySelector('.histry');
var bmiCircle = document.querySelector('.bmi_circle');
var circleRange = document.querySelector('.circle_range');

var bmi = 0;
var range = '';
var rangeColor = '';
var bmiData = JSON.parse(localStorage.getItem('bmiItem')) || [];
//console.log(bmiData);
/* event */
btn.addEventListener('click', addBMI);
histry.addEventListener('click', deleteHistory);
bmiCircle.addEventListener('click', toggleBtn);

function addBMI(e){
    e.preventDefault();

    /*身高體重*/
    var height = document.querySelector('.js_height').value;
    var weight = document.querySelector('.js_weight').value;

    /*BMI*/
    bmi = (weight / Math.pow(height / 100, 2)).toFixed(2);
    //console.log('bmi:' + bmi);

   

    /*程度*/
    if(bmi < 18.5){
        range = '過輕';
        rangeColor = '#31BAF9';
    }
    else if(18.5 <= bmi && bmi <24){
        range = '理想';
        rangeColor = '#86D73F';
    }
    else if(24 <= bmi && bmi < 27){
        range = '過重';
        rangeColor = '#FF982D';
    }
    else if(27 <= bmi && bmi < 30){
        range = '輕度肥胖';
        rangeColor = '#FF6C03';
    }
    else if(30 <= bmi && bmi < 35){
        range = '中度肥胖';
        rangeColor = '#FF6C02';
    }
    else if (bmi >= 35){
        range = '重度肥胖';
        rangeColor = '#FF1200';
    }
    //console.log(range);

    /*日期*/
    var today = new Date();
    var date = ('0' + (today.getMonth() + 1)).slice(-2)+ '-' + ('0' + today.getDate()).slice(-2) + '-' + today.getFullYear();
    //console.log(date);

    var bmiList = {
        range: range,
        bmi: bmi,
        weight: weight,
        height: height,
        date: date,
        borderColor: rangeColor
    };
    //console.log(bmiList);
    var heightCheck = height.replace(/\D/g, '');
    var weightCheck = weight.replace(/\D/g, '');
    //console.log(heightCheck + ',' + weightCheck);
    if(heightCheck == '' || weightCheck == ''){
        alert('請輸入數字!!');
    }
    /*else if(isNaN(height) || isNaN(weight)){
        alert('請輸入數字!!');
    }*/
    else if(heightCheck !== height || weightCheck !== weight){
        alert('輸入不得有空白，其他符號');
    }
    else{
        bmiData.push(bmiList);
        var bmiDataToString = JSON.stringify(bmiData);
        localStorage.setItem('bmiItem', bmiDataToString);
        //console.log(bmiDataToString);
        updateList();
        addBMICircle();
    }
}

function updateList(){
    var str = '';
    var bmiDataLen = bmiData.length;
    //console.log(bmiDataLen);

    if(bmiDataLen == 0){
        str = '<li>尚無紀錄</li>';
    }
    else if (bmiDataLen > 0){
        for(var i = 0; i < bmiDataLen; i ++){
            str +=  '<li style = "border-color: '+ bmiData[i].borderColor +';" class="clearfix"><span class="range">'+ bmiData[i].range +'</span><div class="bmi_histry condition">BMI <span>'+ bmiData[i].bmi +'</span></div><div class="weight_histry condition">weight<span> '+ bmiData[i].weight +'kg</span></div><div class="height_histry condition">height<span> '+ bmiData[i].height +'cm</span></div><div class="date_histry">'+ bmiData[i].date +'</div><a href="#" class="btn_cross"><i data-num = '+ i +' class="fas fa-times"></i></a></li>'; 
        }
    }
    
    histry.innerHTML = str;
}

updateList();

function addBMICircle(){
    var circleStr = '';
    var rangeStr = '';
    var circleColor = '';
    var bmiDataLen = bmiData.length;

    for(var i = 0; i < bmiDataLen; i++){
        circleStr = bmiData[i].bmi +'<span>BMI</span><a href="#" class="icon_loop"></a>';
        rangeStr = bmiData[i].range;
        circleColor = bmiData[i].borderColor;
    }
    bmiCircle.innerHTML = circleStr;
    circleRange.innerHTML = rangeStr;

    /*bmiCircle_style*/
    var iconLoop = document.querySelector('.bmi_circle .icon_loop');
    bmiCircle.style.borderColor = circleColor;
    bmiCircle.style.color = circleColor;
    iconLoop.style.backgroundColor = circleColor;
    circleRange.style.color = circleColor;

    /*toggleCircle*/
    bmiCircle.style.display = 'block';
    circleRange.style.display = 'block';
    btn.style.display = 'none';
}

function deleteHistory(e){
    e.preventDefault();
    var elName = e.target.nodeName;
    var num = e.target.dataset.num;
    if(elName !== 'I'){return;}
    //console.log(e.target.nodeName);
    //console.log(num);
    bmiData.splice(num, 1);
    var bmiDataToString = JSON.stringify(bmiData);
    localStorage.setItem('bmiItem', bmiDataToString);
    updateList();
}

function toggleBtn(e){
    e.preventDefault();
    var elName = e.target.nodeName;
    if(elName !== 'A'){return;}
    btn.style.display = 'inline';
    bmiCircle.style.display = 'none';
    circleRange.style.display = 'none';
}
