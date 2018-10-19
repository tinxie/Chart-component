// 散点图表组件对象

var H5ComponentBar = function( name,cfg ) {
    // 图表组件依赖图文组件所以引入基本图文组件
    var component = new H5ComponentBase(name,cfg);
    //创建所需要的DIV，line:最外层  name：柱图名称  rate:百分比容器  color： 百分比动画
    //per:百分比


    $.each(cfg.data,function(idex,item){
    var line = $("<div class='line'>");

    var name = $("<div class='name'>");

    var per = $("<div class='per'>");

    var rate = $("<div class='rate'>");

   

         name.text(item[0]);

        var width = item[1]*100+'%';

        //如果有背景颜色，就将颜色设置成背景色
        var bgStyle = '';
        if(item[2]){
             var bgStyle = 'style = "background-color:'+ item[2] +'"';
        }
        
         rate.html("<div class='bg' "+bgStyle+">");


        rate.css('width',width);

        per.text(item[1]);

        line.append(name).append(rate).append(per);

        component.append(line);

    })

    return component;
  
}





  





