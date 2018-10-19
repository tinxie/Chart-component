// h5的内容管理对象
var jdata = [];
//申明一个数组并将addpage和addcomponent中参数传递进去，
//在调试工具中输入jdata可以获取很多个对象，然后在使用谷歌自带方法
//JSON.stringify(jdata),可以获取标准json合适的字符串，然后直接复制到
//data.json中就可以使用json数据存储信息了，可以把之前写在html中的
//数据给删除掉
var H5 = function(){
  this.id= ('h5_'+Math.random()).replace('.','_');
  this.el = $('<div class="h5" id="'+this.id+'">').hide();
  // 解决当前component加载到当前页1/创建page空数组 2/每次addpage时，
  //就将当前page添加到h5实例化对象中保存起来,这样在新增组件时就可以取到
  //当前页面
  this.page = [];
  $('body').append(this.el);
// 新增一个页,定义原型函数
// @prama{string} name 组件名称,会加入到classname中
// @prama{string} text 页内的默认文本
// @return {H5} H5对象,可以重复使用H5对象支持的方法

  this.addPage = function(name,text){

    jdata.push({isPage:true,name:name,text:text});
    var page = $('<div class="h5_page section">');
    if (name != undefined){
      page.addClass('h5_page_' + name);

    }

    if(text != undefined){
      page.text(text);
    }
  //this指向h5实例化对象
    this.el.append(page);
    // 将当前page添加到H5对象中
    this.page.push(page);

    if( typeof this.whenAddPage === 'function'){
      this.whenAddPage();
    }
    return this;
  }

// 新增一个组件,定义原型函数
  this.addComponent = function(name,cfg){
    jdata.push({isPage:false,name:name,cfg:cfg});
     //先初始化cfg对象,当初始化对象时,表示他会有若干参数,
     //必备参数type:'base',使用extend意思是说如果参数中没有type,
     //就默认添加type:base 
       var cfg  = cfg ||{};
           cfg = $.extend({
               type : 'base'
           },cfg);

    var component;  //定义一个变量储存组件
    //初始化构建componentbase对象 如果检测到type,就添加一个H5基本图文组建
    var page = this.page.slice(-1)[0];//取数组最后一个对象，也就是当前创建的page
    switch (cfg.type){
      case 'base':
            component = new  H5ComponentBase(name,cfg);
      break;

      case 'polyline':
            component = new  H5ComponentPolyline(name,cfg);
      break;

      case 'pie':
            component = new H5ConponentPie(name,cfg);
            break;

      case 'bar':
             component = new H5ComponentBar(name,cfg);
      break;
       
 case 'radar':
             component = new H5ConponentRadar(name,cfg);
      break;
      case 'point':
             component =  new H5ComponentPoint(name,cfg);
      break;

      default:

    }
    // 将组件添加到page中
    page.append(component);
     //注意良好习惯返回函数
     return this;
  }


// h5对象初始化呈现.单独使用loader函数控制,所以将this.el隐藏
  this.loader = function( firstPage ){
      
         //启动fullpage就要加一个class类section
         this.el.fullpage({

            onLeave:function(index,nextIndex,direction){
              $(this).find('.h5_component').trigger('onLeave');
            },
            afterLoad:function(anchorLink,index){
              $(this).find('.h5_component').trigger('onLoad');
            }

         });
         //默认初始化时执行一遍onload
         this.page[0].find('.h5_component').trigger('onLoad');
         this.el.show();
         // 立刻切换到某一页
         if(firstPage){
          $.fn.fullpage.moveTo( firstPage );
         }
  }
  //用h5-loading方法将h5-loader方法全部覆盖一遍
  //做法：如果h5-loading为函数，就重写h5-loading代码，否则不变
  this.loader = typeof h5_loading === 'function' ? h5_loading:this.loader;
  //养成习惯返回此函数
  return this;
}
