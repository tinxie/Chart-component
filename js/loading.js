var h5_loading = function(images,firstPage){

  var id=this.id;

   if(this._images === undefined){        //第一次进入 为神马用_images?this指向h5,没有定义过_images,所以一定会等于undefined
    // 要加载的图片的长度
    this._images = (images||[]).length;

    // 表示最开始的状态加载了0个资源
    this._loaded = 0;

    window[id]=this;  //把当前对象存储在全局对象中，window中，
    // 用来进行某个图片加载完成之后的回调


    for(s in images){
      var item = images[s];
      // js创建一个图片
      var img = new Image;
      // 图片载入完成之后触发一些回调函数
      img.onload = function(){
        //
        window[id].loader();
      }
      // 使用img.src载入图片地址，这种方式可以使它直接载入缓存里面
      img.src=item;
    }
    
    
    $('#rate').text('0%');
    return this;

  }else{
    this._loaded ++;
    console.log(this._loaded);
    // >>0可以快速出去小数点
    $('#rate').text(((this._loaded/this._images * 100)>>0) + '%');

    if(this._loaded<this._images){
      return this;
    }
  }

  window[id] = null;






          //firstpage和之前一样
          this.el.fullpage({

            onLeave:function(index,nextIndex,direction){
              $(this).find('.h5_component').trigger('onLeave');
            },
            afterLoad:function(anchorLink,index){
              $(this).find('.h5_component').trigger('onLoad');
            }

          });
          this.page[0].find('.h5_component').trigger('onLoad');
          this.el.show();
          if(firstPage){
                $.fn.fullpage.moveTo( firstPage );}
              }

