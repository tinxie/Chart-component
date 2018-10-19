// 雷达图表组件对象

var H5ConponentRadar = function( name,cfg ) {
    // 图表组件依赖图文组件所以引入基本图文组件

    var component = new H5ComponentBase(name,cfg);
    
    var w = cfg.width;
    var h = cfg.height;
    //加入一个画布,用于网格线背景
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    component.append(cns);

    var r = w/2;
    var step = cfg.data.length;
   // //内圆
   //  ctx.beginPath();
   //  ctx.arc(r,r,5,0,2*Math.PI);
   //  ctx.stroke();

   // //外圆
   //  ctx.beginPath();
   //  ctx.arc(r,r,r-5,0,2*Math.PI);
   //  ctx.stroke();

    //计算一个圆周上的坐标(计算多边形的顶点坐标)
    //已知：圆心坐标（A,B）、半径 r；角度deg
    //rad = (2*Math.PI/360)*(360/step)*i
    //x = a + Math.sin(rad)*r;
    //y = b +Math.cos(rad)*r;


    //绘制网格线背景（分面绘制，分为十分）
    var isBlue = false;   //用来将网状颜色进行切换
    for(var s=10;s>0;s--){
      
    ctx.beginPath();
    for(var i=0;i<step;i++){
      var rad = (2*Math.PI/360)*(360/step)*i
      var x = r+Math.sin(rad)*r*(s/10);
      var y = r+Math.cos(rad)*r*(s/10);
 
      // 五个点
      // ctx.beginPath();
      // ctx.arc(x,y,5,0,2*Math.PI);
      // ctx.stroke();

     //连上圆心的线
      // ctx.moveTo(r,r);
      // ctx.lineTo(x,y);
      // ctx.stroke();

      //绘制五个顶点之间的连线
      ctx.lineTo(x,y);
    }
    ctx.closePath();
    //下面括号里面是运算，不是判断
    ctx.fillStyle = (isBlue = !isBlue)? '#99c0ff' : '#f1f9ff';
    ctx.fill();    

    }



    //绘制伞骨图 
    for(var i=0;i<cfg.data.length;i++){
      var rad = (2*Math.PI/360)*(360/step)*i;
      var x = r +Math.sin(rad)*r;
      var y = r+Math.cos(rad)*r;
      ctx.moveTo(r,r);
      ctx.lineTo(x,y);
      //输出项目文字
      var text = $('<div class="text">');
      text.text(cfg.data[i][0]);
      text.css('transition','all .5s '+i*.3+'s');
      //调整文字位置
      //如果在右边
       if(x>w/2){
         text.css('left',x/2+5);
       }else{
         text.css('right',(w-x)/2+5)
       }

       if(y>h/2){
        text.css('top',y/2+5);
       }else{
        text.css('bottom',(h-y)/2+5);
       }

       //样式
       if(cfg.data[i][2]){
        text.css('color',cfg.data[i][2]);
       }

       text.css('opacity',0);

      component.append(text);

    }
    ctx.strokeStyle = '#ccc';
    ctx.stroke();


//数据层开发
//加入一个画布（数据层）
var cns = document.createElement('canvas');
var ctx = cns.getContext('2d');
cns.width = ctx.width = w;
cns.height = ctx.height = h;
ctx.strokeStyle = '#f00';
component.append(cns);

    
    var draw = function(per){

        if(per>=1){
          component.find('.text').css('opacity',1);
        }

         if(per<=1){
          component.find('.text').css('opacity',0);
        }


         ctx.clearRect(0,0,w,h);
         //输出数据的折线
          for(var i=0;i<cfg.data.length;i++){
            var rad = (2*Math.PI/360)*(360/step)*i;
            var rate = cfg.data[i][1]*per;
            var x = r +Math.sin(rad)*r*rate;
            var y = r+Math.cos(rad)*r*rate;
            ctx.lineTo(x,y);
          }
          ctx.closePath();
          ctx.stroke();


          //输出数据的点
          ctx.fillStyle = '#ff7676';
          for(var i=0;i<step;i++){
            var rad = (2*Math.PI/360)*(360/step)*i;
            var rate = cfg.data[i][1]*per;
            var x = r +Math.sin(rad)*r*rate;
            var y = r+Math.cos(rad)*r*rate;

            ctx. beginPath();
            ctx.arc(x,y,5,0,2*Math.PI);
            ctx.fill();
            ctx.closePath();
          }

     }

    // draw(.5);
  

     //折线图生长动画
     // 思路：将绘制折线部分封装曾一个函数，将百分比传参进去,百分比pre是0-1之间的一个数值，
     //如果为1，折线的点会升到目标Y值,方法就是在图表组件的元素Y轴中加入pre参数，最终结果是1
     component.on('onLoad',function(){
        //折线图生长动画
        var s = 0;
        for(i=0;i<100;i++){
           setTimeout(function(){
            s+=0.01;
              draw(s);
           },i*10+500)

        }
     });


     // 退场动画
     component.on('onLeave',function(){
        //折线图退场动画
        var s = 1;
        for(i=0;i<100;i++){
            setTimeout(function(){
                s-=.01;
                draw(s);
            },i*10);
        }
     })

     

    return component;
  
}







  





