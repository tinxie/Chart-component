// 折线图表组件对象

var H5ComponentPolyline = function( name,cfg ) {
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

   //水平网格线  100份-->10份
   var step = 10;

   ctx.beginPath();
   ctx.lineWidth = 1;   
   ctx.strokeStyle = "#000";

   window.ctx = ctx;

   for(var i=0;i<step+1;i++){
     var y = (h/step)*i;
     ctx.moveTo(0,y);
     ctx.lineTo(w,y);
   }
  ctx.stroke();
   //垂直网格线根据项目个数设置
 
   for(var i=0;i<cfg.data.length+1;i++){
     var x = (w/cfg.data.length)*i;
     ctx.moveTo(x,0);
     ctx.lineTo(x,h);


     //项目名称
     step = cfg.data.length;
     var text_w = w/step>>0;

     if(cfg.data[i]){
        var text = $('<div class="text">');
        x = (w/step)*(i+1);
        text.text(cfg.data[i][0]);
        text.css('width',text_w/2).css('left',x/2-text_w/4);
        component.append(text);
     }
   }

   ctx.stroke();


        //绘制折现数据--数据层
   //思路：网格线和动画层是分开的，所以动画层为单独的一层，重新创建一个canvas
   var cas = document.createElement('canvas');
   var ctx = cas.getContext('2d');
   cas.width  = ctx.width = w;
   cas.height = ctx.height = h;
   component.append(cas);
   

    var draw = function(pre){
    ctx.clearRect(0,0,w,h);
    //防止画面重复，需要清空画布,这里清除一个矩形画布
    //参数为左上角坐标和宽高
    

    //画圆点:所有圆点的x轴可以率先确定，就是分布在X轴节点每个节点一个
    //Y 轴则是通过数组数据计算获得
    var x = 0;
    var y = 0;
    //注意不要漏掉这句话beginpath
    ctx.beginPath();
    ctx.strokeStyle = "#ff8878";
    ctx.lineWidth = 3;

     var row_w = (w/(cfg.data.length));
    for(var g in cfg.data){

       var item = cfg.data[g];
       // 如果不加一个长度就会导致圆点紧贴着第一条线开始
       x = (row_w*g)+(w/(cfg.data.length));
       //如果不使用1-，出来的数据图是倒着的，所以要1-
       y = h-h*item[1]*pre;
       ctx.moveTo(x,y);
       //画圆，原点坐标，半径，画圆圆开始位置，画圆结束位置
       ctx.arc(x,y,7,0,2*Math.PI);
 }
       //连线
       //定位到第一个圆点的位置
       ctx.moveTo(row_w+1,h-h*cfg.data[0][1]*pre);
       for( i in cfg.data){
        var item = cfg.data[i];
        var x = (row_w*i)+row_w;
        var y = h-h*(item[1])*pre;
        ctx.lineTo(x,y);
       }
       ctx.stroke();
       ctx.lineWidth = 1;
       ctx.strokeStyle = "rgba(255,255,255,0)";

       //绘制阴影

       ctx.lineTo(x,h);
       console.log(x,h);
       ctx.lineTo(row_w,h);

       console.log(row_w,h);
       ctx.fillStyle='rgba(255,136,120,0.2)';
       ctx.fill();



       //加文字
       for( i in cfg.data){
        var item = cfg.data[i];
        var x = (row_w*i)+row_w;
        var y = h-h*(item[1])*pre;
        
        ctx.fillStyle = item[2] ? item[2] : 'black';
        
        //需要三个参数，数据，坐标
        ctx.fillText(((item[1]*100)>>0)+'%',x-10,y-10);
       }
       
   

    ctx.stroke();

    }

     
     // draw(1);

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


     //退场动画
     component.on('onLeave',function(){
        //折线图退场动画
        var s = 0;
        for(i=0;i<100;i++){
            setTimeout(function(){
                s-=.01;
                draw(s);
            },i*10);
        }
     })

     

    return component;
  
}







  





