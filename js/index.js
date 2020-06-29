window.onload = function () {
    var odiv = document.getElementById("tupianUl");
    var aimg = document.getElementsByClassName("tupianImg");
    var num=1,aurlnum=4,aimgnum=0;
    odiv.timer = setInterval(function () {
        aimg[aimgnum].src = aurl[aurlnum];
        aurlnum++;aimgnum--;
        aurlnum%=5;if(aimgnum<0)aimgnum=6;
        for(var i=0;i<odiv.children.length;i++){
            startMove(odiv.children[i],action[(i+num)%7]);
        }
        num++;
        num%=7;
    },2000);
    for(var i=0;i<odiv.children.length;i++){
        odiv.children[i].onmouseover = function () {
            clearInterval(odiv.timer);
            odiv.style.cursor = "pointer";
        }
        odiv.children[i].onmouseout = function () {
            odiv.style.cursor = "default";
            odiv.timer = setInterval(function () {
                aimg[aimgnum].src = aurl[aurlnum];
                aurlnum++;aimgnum--;
                aurlnum%=5;if(aimgnum<0)aimgnum=6;
                for(var i=0;i<odiv.children.length;i++){
                    startMove(odiv.children[i],action[(i+num)%7]);
                }
                num++;
                num%=7;
            },2000);
        }
    }

}
var aurl=["images/锡艺.png","images/泽雅屏纸.jpg","images/织造.png","images/纸伞.jpg","images/竹编.png"];
var action = [
                {top:"50",width:"228",height:"210",left:"-228",zIndex:"497",opacity:"0"},
                {top:"35", width: "260", height: "245", left:"0","zIndex": "400",opacity:"60"},
                {top:"15", width: "292", height: "281", left:"106","zIndex": "450",opacity:"80"},
                {top:"0", width: "326", height: "312", left:"212","zIndex": "500",opacity:"100"},
                {top:"15", width: "292", height: "281", left:"352","zIndex": "450",opacity:"80"},
                {top:"35", width: "260", height: "245", left:"490","zIndex": "400",opacity:"60"},
                {top:"50",width:"228",height:"210",left:"750",zIndex:"497",opacity:"0"}];


//1.获得obj的name的元素属性
function getStyle(obj,name)
{
    if(obj.currentStyle)return obj.currentStyle[name];
    else return getComputedStyle(obj,false)[name];
}
function startMove(obj,json,fnEnd)//对象，属性，目标值,链式函数
{
    clearInterval(obj.timer);//自定义的timer属性
    obj.timer=setInterval(function(){
        var bStop=true;//假设所有的值都已经到了
        for(var attr in json)
        {
            var cur=0;
            if(attr=='opacity')
            {
                cur=Math.round(parseFloat(getStyle(obj,attr))*100);

            }//返回的是0-1透明度,round()四舍五入
            // else if(attr=='zIndex'){
            //      cur=parseInt(getStyle(obj,attr));
            //         console.log(cur);
            //     }
            else
            {
                cur=parseInt(getStyle(obj,attr));
            }//当前属性值
            var speed=(json[attr]-cur)/6;
            speed=speed>0?Math.ceil(speed):Math.floor(speed);
            if(cur!=json[attr])bStop=false;
            if(attr=='opacity')
            {
                obj.style.filter='alpha(opacity:'+(cur+speed)+')';
                obj.style.opacity=(cur+speed)/100;
            }
            else if(attr=='zIndex'){
                obj.style[attr]=cur+speed;
            }
            else
            {
                obj.style[attr]=cur+speed+'px';
                // console.log(cur+speed);
            }
        }
        if(bStop)
        {
            clearInterval(obj.timer);
            if(fnEnd)fnEnd();//运动结束，开始下一个链式运动

        }
    },30);
}