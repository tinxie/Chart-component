// 基本图文组件对象

var H5ComponentBase = function( name,cfg ) {
    var cfg = cfg || {};
    var id = ('h5_c_'+ Math.random()).replace('.' , '_');


    //把当前的组建类型添加到样式中进行标记
    var cls = ' h5_component_'+cfg.type ;
    //创建一个dom对象
    var component  = $('<div class="h5_component'+ cls +' h5_component_name_'+name+'" id="'+ id +'">');
    //如果有cfg.text的话，将它传入component中
    cfg.text && component.text(cfg.text);
    //设置dom元素宽高,不用带单位
    cfg.height && component.height(cfg.height/2);
    cfg.width && component.width(cfg.width/2);
    cfg.css && component.css(cfg.css);
    //设置背景图片
    cfg.bg && component.css('backgroundImage','url('+cfg.bg+')');
    
   

    //设置背景图居中
    if(cfg.center===true){
       component.css({
         marginLeft: (cfg.width/4*-1),
         left:'50%'
       })
    }
   //自定义参数,设置页面加载和离开的事件
  if(typeof cfg.onclick === 'function'){
    component.on('click',cfg.onclick)
  }



   component.on('onLoad',function(){
       setTimeout(function(){
         //不确定组件动画类型所以先为组件加上一个类
        component.addClass(cls + '_load').removeClass(cls+ '_leave');
        //设置图片从上到下动画效果
        cfg.animateIn && component.animate(cfg.animateIn);       
       },cfg.delay||0)
       return false;
      })

   component.on('onLeave',function(){
        setTimeout(function(){
           component.addClass(cls +'_leave').removeClass(cls+'_load');
        cfg.animateOut && component.animate(cfg.animateOut);
           
      },cfg.delay||0)

            return false;
            })

  return component;





}





  





