// 散点图表组件对象

var H5ComponentPoint = function( name,cfg ) {
    // 图表组件依赖图文组件所以引入基本图文组件
    var component = new H5ComponentBase(name,cfg);
    // 测试
    // component.text('hhehds');
    var base = cfg.data[0][2]; //以data的第一组数据的比例为大小的百分比,这里指0.4
   

    $.each(cfg.data,function(indx,item){
        var point = $('<div class="point point_'+indx+'">');
        var name = $('<div class="name">'+item[0]+'</div>');
        var rate = $('<div class="rate">'+(item[2])*100+'%</div>');
        name.append(rate);
        point.append(name);

       
        // 计算各项比例，首先他们都是圆形所以宽高相同，其次以第一组数据为准来季孙另外两虚大小比例
        //计算比例:
        //第一个数：item[2]/base=0.4/0.4=1=100%
        //第二个数：item[2]/base=0.2/0.4=0.5=50%
        //第三个数：item[2]/base=0.2/0.4=0.5=50%
        var per = (item[2]/base*100)+'%';
        point.width(per).height(per);


        //对颜色进行设置，这里用一个判断而之前不用判断是因为之前的两个参数name和比例都是
        //必须的参数，而颜色可能有也可能没有，是不确定的

        if(item[1]){
          point.css('background-color',item[1]);
           }
         
         //两个参数同时设置,注意判断语句里不能直接写item[3]&&item[4]
         //因为值为0
        if(item[3]!==undefined &&item[4]!==undefined){
          point.css('left',item[3]).css('top',item[4]);
         component.append(point);
        }
       
    });
    return component;
4.4
  
}





  





