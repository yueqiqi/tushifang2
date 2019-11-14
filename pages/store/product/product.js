import request from '../../login'
Page({
  now:function(){
    console.log(this.data.ec)
    console.log(this.data.es)
    wx.navigateTo({
      url: '/pages/store/affirm/affirm',
    })
  },
  // 价格变化
  onChange: function (e) {
    // 获取输入框的值
    console.log(e.detail)
    var num = e.detail
    var lp = this.data.lp
    this.setData({
      price: lp * num
    })

  },
  // minus:function(e){
  //   // 获取输入框的值
  //   console.log(e.detail)
  //   var num = e.detail
  //   var p = this.data.price
  //   this.setData({
  //     price: p * num
  //   })
  // },
  
  // // 型号
  // size(e) {
  //   // let index = e.currentTarget.dataset.index
  //   // var bool = this.data.size[index].checked
  //   // var f = this.data.size[index].disabled
  //   // this.setData({
  //   //   ['size[' + index + '].checked']: !bool,
  //   //   // ['color[11].disabled']:true
  //   // })
  //   // // if(){
  //   // //   console.log(123)
  //   // // }
  //   // console.log(index, bool, ['size[' + index + '].checked'], f)
  //   for (var i in this.data.size) {
  
  //     if (e.currentTarget.dataset.index == i) {
  //       this.data.size[i].checked = true
  //     }
  //     else {
  //       this.data.size[i].checked = false
  //     }
  //   }
  //   this.setData(this.data)
  //   var np = this.data.size[e.currentTarget.dataset.index]
  //   this.setData({
  //     es:np
  //   })
  // },
  // looks:function(){
  //   console.log('查看')
  //   console.log('查看的时间',this.data.zxc)
  // },
  // 颜色
  choose(e) {
console.log(e)
    var that=this
    var id=e.currentTarget.dataset.id
    // 自带循环下标
    let index = e.currentTarget.dataset.idx
    // 标题
    let title = e.currentTarget.dataset.title
    // 外层循环下标
    let index2 = e.currentTarget.dataset.im
    // 外层大数组
    var q=that.data.model
    // 自定义data数组用于保存数据外层id
    var lableid=that.data.lableid
    // 自定义data数组用于保存数据id ， lable ，title
    var arrs=that.data.arrs
    if(lableid.indexOf(q[index2].id)>-1){
      console.log('已经存在')
      for(var ppp in arrs){
        if(arrs[ppp].lable==q[index2].id){
          arrs[ppp].id=id
          arrs[ppp].title=title
        }
      }
    }else{
      arrs.push({
        id:id,lable:q[index2].id,title:title
      })
    }
    lableid.push(q[index2].id)
/**
 * 规格型号的改变
 */

for(var ip in arrs){
  
}












    console.log('标题',q[index2].id,id)
    console.log('全局',that.data.arrs)
    for(var z in q){
      for(var ps in q[z].val){
        if(id==q[z].val[ps].id){
          q[z].val[ps].checked = true   
            }else{
              if(z==index2){
                q[z].val[ps].checked = false
              }
            }
          }
        }
    that.setData({
      model:q,arrs,chv:1
    })
    /**
     * 获取对应规格的图片
     */
    var sku=that.data.sku
      console.log(arrs)
      // var ui=[]
      var arr2
      var str
      if(arrs.length>1){
         arr2=arrs.map(o => o.id)
        arr2.sort(function(a, b){return a - b})
        for(var sk in sku){
          str = sku[sk].path.split(',')
          //数组排序
          str.sort(function(a, b){return a - b});
          if(arr2.join('-')==str.join('-')){
            console.log(sku[sk])
            that.setData({
              img:sku[sk].img_url,
              price:sku[sk].money,
              lp:sku[sk].money,
              stock:sku[sk].stock
            })
          }
        }
        }
  },
  /**
   * 查看图片
   */
prev:function(){
  var that=this
var imgs=that.data.img
console.log('查看的图片1',imgs)
var img=[imgs]
// img=
console.log('查看的图片2',img)
  wx.previewImage({
    // current:img[0].imgs,
    urls:img,
    success: (result)=>{
      
    },
    fail: ()=>{},
    complete: ()=>{}
  });
},
  //点击我显示底部弹出框
  // pay: function () {
  //   this.showModal();
  // },
// pay:function(){
//   this.showModal()
// },
  //显示对话框
  pay: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  //隐藏对话框
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },
  
  /**
   * 页面的初始数据
   */
  data: {
    //
    a_norms:'规格',
    //型号
    a_models:'型号',
    chv:1,
    stock:0,
    ids:[],
    lableid:[],
    arrs:[],
    // 用于保存用户选择的尺寸
    es:"",
    // 用于保存用户选择的颜色
    ec:"",
    // 图片
    img:"",
    // 价格
    price:0,
    // 型号
    size: [
      {
        size: "sm",
        disabled: false,
        checked: true
      },
      {
        size: "s",
        disabled: false,
        checked: false
      },
      {
        size: "s",
        disabled: false,
        checked: false
      },
      {
        size: "l",
        disabled: false,
        checked: false
      },
      {
        size: "xl",
        disabled: true,
        checked: false
      },
    ],
    // 颜色
    color: [
      {
        color: "红色",
        checked: true,
        disabled: false,
        img:"../../images/carousel/06.jpg"
      },
      {
        color: "黄色",
        checked: false,
        disabled: false,
        img: "../../images/carousel/05.jpg"
      },
      {
        color: "白色",
        checked: false,
        disabled: false,
        img: "../../images/carousel/02.jpg"
      },
      {
        color: "绿色",
        checked: false,
        disabled: false
      },
      {
        color: "绿色",
        checked: false,
        disabled: false
      },
      {
        color: "紫色",
        checked: false,
        disabled: false
      },
      {
        color: "灰色",
        checked: false,
        disabled: false
      },
      {
        color: "橘色",
        checked: false,
        disabled: false
      },
      {
        color: "彩色",
        checked: false,
        disabled: false
      },
      {
        color: "紫色",
        checked: false,
        disabled: false
      },
      {
        color: "紫色",
        checked: false,
        disabled: false
      },
      {
        color: "紫色",
        checked: false,
        disabled: true
      },
    ],
    imgUrls: [
      {
        link:"../index/index",
        url:"../../images/carousel/02.jpg",
      },
      {
        link: "./product",
        url: "../../images/carousel/03.jpg",
      },
      {
        link: "../index/index",
        url: "../../images/carousel/04.jpg",
      },
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000
  },

  /**
   * 地址选择
   */
  goto:function(){
    wx.navigateTo({
      url: '/pages/self/site/site',
      success: (result)=>{
        
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('接收商城跳转的id ',options.id)
    this.setData({
      ec:this.data.color[0],
      es:this.data.size[0]
    })
    this.setData({
      goods_id:options.id
    })
    /**
     * 获取商品详情页
     */
    request({
      url:'http://tsf.suipk.cn/home/Goods/do_goods_info',
      data:{
        goods_id:options.id
      }
      }).then(res=>{
      console.log('调用商品详情页成功',res)
      this.setData({
        list:res.data.data
      })
      }).catch(err=>{
      console.log('调用失败')
    })    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that=this
    request({
      url:'http://tsf.suipk.cn/home/goods/do_goods_specification',
      data:{
        goods_id:that.data.goods_id
      }
      }).then(res=>{
      console.log('调用商品规格成功',res)
      this.setData({
        model:res.data.data.specification,
        sku:res.data.data.sku
      })
      }).catch(err=>{
      console.log('调用失败')
    })
    

  },

  
})