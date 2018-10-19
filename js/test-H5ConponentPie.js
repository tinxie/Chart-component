// 饼图表组件对象

var H5ConponentPie = function( name,cfg ) {
    // 图表组件依赖图文组件所以引入基本图文组件
    
    var component = new H5ComponentBase(name,cfg);
    //绘制背景层

    var w = cfg.width;
    var h = cfg.height;
    var r = w/2; //声明必须提前不然会出问题
    //加入一个画布,用于网格线背景
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    $(cns).css('z-index',1);
    component.append(cns);
    
   
    //加入一个底图层I
   ctx.moveTo(r,r);
    ctx.fillStyle = "#ccc";
    ctx.strokeStyle = "#eee";
    ctx.lineWidth = 1;
    ctx.arc(r,r,r,0,2*Math.PI);
    ctx.fill();
    ctx.stroke();
    

    //绘制一个数据层
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    $(cns).css('z-index',2);
    component.append(cns);

    var colors = ['red','black','blue','orange','pink'];  //备用颜色
    var sAngel = 1.5*Math.PI;  //设置开始的角度在12点位置
    var eAngel = 0; //结束角度
    var aAngel = Math.PI*2; //100%的圆结束的角度 2pi = 360度

    var step = cfg.data.length;
    for(var i=0;i<step;i++){
      var item  =  cfg.data[i];
      // 处理饼图颜色
      var color = item[2]||(item[2] = colors.pop());
      

      eAngel = sAngel+aAngel*item[1];
  

     // 根据颜色数组推送颜色
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineWidth = .1;

    ctx.moveTo(r,r);
    ctx.arc(r,r,r,sAngel,eAngel);
    ctx.fill();
    ctx.stroke();

    sAngel = eAngel;

    // 加入所有形目文本及百分比
    var text = $('<div class="text">');
    text.text(cfg.data[i][0]);
    var per = $('<div class="per">');
    per.text(cfg.data[i][1]*100+'%');
    text.append(per);

    var x = r+Math.sin(.5*Math.PI-sAngel)*r;
    var y = r+Math.cos(.5*Math.PI-sAngel)*r;

    // text.css('left',x/2);
    // text.css('top',y/2);
     // 如果偏右则往左移
    if(x>w/2){
      text.css('left',x/2);
    }else{
      text.css('right',(w-x)/2);
    }
     // 如果偏下则往上移
    if(y>h/2){
      text.css('top',y/2);
    }else{
      text.css('bottom',(h-y)/2);
    }

    if(cfg.data[i][2]){
      text.css('color',cfg.data[i][2]);
    }
    text.css('opacity',0);
    component.append(text);
 }

 




 //蒙版层
  var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    $(cns).css('z-index',3);
    component.append(cns);

    ctx.fillStyle = "#eee";
    ctx.strokeStyle = '#eee';
    ctx.lineWidth =1;

  



    //生长动画
    var draw = function(per){

      ctx.clearRect(0,0,w,h);
     ctx.beginPath();
     ctx.moveTo(r,r);

     if(per<=0){
      ctx.arc(r,r,r,0,2*Math.PI);
      component.find('.text').css('opacity',0)
     }else{
        ctx.arc(r,r,r,sAngel,sAngel+2*Math.PI*per,true);
     }
   
    ctx.fill();
    ctx.stroke();
   if(per>=1){
    component.find('.text').css('opacity',1)
     }
   }

draw(0);
  

     //饼图图生长动画
    component.on('onLoad',function(){
        //饼线图生长动画
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







  





