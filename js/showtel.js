/**
 * Created by wang on 2017/4/5.
 */
window.onload=function () {
    document.querySelector('#tel').onmouseover=function () {
        document.querySelector('#outtel').style.display='block';
        document.querySelector('#outtel').style.position='absolute';
    };
    document.querySelector('#tel').onmouseout=function () {
        document.querySelector('#outtel').style.display='none';
    };
}
