/**
 * Created by dell on 2017/4/5.
 */


// banner 轮播图

window.onload=function () {
    // var index=1;
    // var inter;
    //
    // loopShow(index);

//fourth部分的show-car图片
//     var showCars=document.querySelectorAll('[class^="show-car"]');
//     for(var i=0;i<6;i++){
//        showCars[i].style.backgroundImage='url("images/index-images/car'+(i+1)+'.jpg")';
//         // showCars[i].setAttribute('background-image','url("images/car'+(i+1)+'.jpg")');
//     }


};

// function loopShow(index) {
//     inter=setInterval(function () {
//
//         if(index>=5){
//             index=1;
//         }else {
//             index++;
//         }
//         changeImage(index,0);
//     },3000);
// }
// function changeImage(i,f) {
//     var divImage=document.querySelector('#divImage');
//     // divImage.setAttribute('background-image','url("images/'+i+'.jpg")');
//     // divImage.setAttribute('animation','banner 1s');
//     divImage.style.backgroundImage='url("images/index-images/'+i+'.jpg")';
//     // divImage.style.animation="banner 1s ";
//
//     var imgs=document.querySelectorAll('[id^="img0"]');
//     for(var j=0;j<imgs.length;j++){
//         imgs[j].className='';         // 把小点的颜色消失
//     }
//    
//     imgs[i-1].className='active';
//     if(f==1){                //点击图片后接着点击的下一张自动播放，暂停掉原来的自动播放
//         window.clearInterval(inter);
//         loopShow(i);
//     }
// }

//banner条上填写租车信息的
function show(i) {
    var content=document.querySelector(".rent-form-content");
    var content2=document.querySelector(".rent-taocan-content");
    var leftNav=document.querySelector(".rent-form-top-nav td:first-child");
    var rightNav=document.querySelector(".rent-form-top-nav td:nth-child(2)");
    if(i==1){
        leftNav.style.backgroundColor='white';
        rightNav.style.backgroundColor='#F0F1F3';
        content.style.display='block';
        content2.style.display='none';
    }else{
        rightNav.style.backgroundColor='white';
        leftNav.style.backgroundColor='#F0F1F3';
        content.style.display='none';
        content2.style.display='block';
    }

}

//banner条上租车信息的套餐
function tcChangeColor(i) {
    var tctexts=document.querySelectorAll(".taocan1 .text");
    var tctextSpans=document.querySelectorAll(".taocan1 .text span");
    var cicletexts=document.querySelectorAll(".taocan1 .circle-text");
    var cicles=document.querySelectorAll(".taocan1 .circle");
    tctexts[i].style.color="white";
    tctextSpans[i].style.color="white";
    cicletexts[i].style.color="#FAAA87";
    cicles[i].style.backgroundColor="white";
}
function tcAgainColor(i) {

    var tctexts=document.querySelectorAll(".taocan1 .text");
    var tctextSpans=document.querySelectorAll(".taocan1 .text span");
    var cicletexts=document.querySelectorAll(".taocan1 .circle-text");
    var cicles=document.querySelectorAll(".taocan1 .circle");
    tctexts[i].style.color="";
    tctextSpans[i].style.color="";
    cicletexts[i].style.color="";
    cicles[i].style.backgroundColor="";
}


//third
function showTextOne(i) {
    var thirdStep=document.querySelectorAll(".third-step1");
    var thirdStepTop=document.querySelectorAll(".third-step1-top");
    var thirdText1=document.querySelectorAll(".third-step1-content");
    var thirdText2=document.querySelectorAll(".third-step1-content-hide");
    thirdStep[i].style.backgroundColor="#4E71E9";
    thirdText1[i].style.display="none";
    thirdText2[i].style.display="block";
    thirdText2[i].style.animation="third 0.2s";
    thirdStepTop[i].style.backgroundColor="#4E71E9";
    thirdStepTop[i].style.boxShadow='none';

}
function showTextAnother(i) {

    var thirdStep=document.querySelectorAll(".third-step1");
    var thirdStepTop=document.querySelectorAll(".third-step1-top");
    var thirdText1=document.querySelectorAll(".third-step1-content");
    var thirdText2=document.querySelectorAll(".third-step1-content-hide");
    thirdStep[i].style.backgroundColor="";
    thirdText1[i].style.display="block";
    thirdText2[i].style.display="none";
    thirdStepTop[i].style.backgroundColor="#3257CB";
    thirdStepTop[i].style.boxShadow="0 0 10px rgba(88, 88, 88, 0.6)";
}


// fourth 展示车图片
function changeCarText(i) {
    var carTexts=document.querySelectorAll('[class^="show-car"] .car-text');
    var carDetailTexts=document.querySelectorAll('[class^="show-car"] .car-text .car-text-detail');

    carTexts[i].style.color='black';
    carTexts[i].style.animation='four 0.3s';
    carTexts[i].style.marginTop='2%';
    carDetailTexts[i].style.display='block';
}
function againCarText(i) {
    var carTexts=document.querySelectorAll('[class^="show-car"] .car-text');
    var carDetailTexts=document.querySelectorAll('[class^="show-car"] .car-text .car-text-detail');

    carTexts[i].style.color='white';
    carTexts[i].style.marginTop='6%';
    carTexts[i].style.animation='four-again 0.4s';
    carDetailTexts[i].style.display='none';
}