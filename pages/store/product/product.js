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
    var p = this.data.price
    this.setData({
      price: 199 * num

    })
    return
    console.log()
  },
  // 型号
  size(e) {

    
    // let index = e.currentTarget.dataset.index
    // var bool = this.data.size[index].checked
    // var f = this.data.size[index].disabled
    // this.setData({
    //   ['size[' + index + '].checked']: !bool,
    //   // ['color[11].disabled']:true
    // })
    // // if(){
    // //   console.log(123)
    // // }
    // console.log(index, bool, ['size[' + index + '].checked'], f)
    for (var i in this.data.size) {
  
      if (e.currentTarget.dataset.index == i) {
        this.data.size[i].checked = true
      }
      else {
        this.data.size[i].checked = false
      }
    }
    this.setData(this.data)
    var np = this.data.size[e.currentTarget.dataset.index]
    this.setData({
      es:np
    })
  },
  // 颜色
  choose(e) {
    var that=this
    console.log(e)
    var id=e.currentTarget.dataset.id
    let index = e.currentTarget.dataset.idx
    let index2 = e.currentTarget.dataset.im
    console.log('大数组的下标',index2)
    var q=that.data.model
    console.log('循环的数组',q)
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
      model:q
    })
    // var bool = this.data.color[index].checked
    // var f = this.data.color[index].disabled
    // this.setData({
    //   ['color[' + index + '].checked']: !bool,
    //   // ['color[11].disabled']:true
    // })
    // // if(){
    // //   console.log(123)
    // // }
    // console.log(index, bool, ['color[' + index + '].checked'], f)
    // for (var m in this.data.color) {
    //   if (e.currentTarget.dataset.index == m) {
    //     this.data.color[m].checked = true
    //   }
    //   else {
    //     this.data.color[m].checked = false
    //   }
    // }
    // this.setData(this.data)
      // console.log(this.data.color[m])
    // console.log(e.currentTarget.dataset.index)
    // var img = this.data.color[e.currentTarget.dataset.index].img
    // var np = this.data.color[e.currentTarget.dataset.index]
    // console.log(img)
    // this.setData({
    //   img:img,
    //   ec:np
    // })
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
    // 用于保存用户选择的尺寸
    es:"",
    // 用于保存用户选择的颜色
    ec:"",
    // 图片
    img:"../../images/carousel/06.jpg",
    // 价格
    price: 199,
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
      // goods_id:options.id
      goods_id:9
    })
    /**
     * 获取商品详情页
     */
    request({
      url:'http://tsf.suipk.cn/home/Goods/do_goods_info',
      data:{
        // goods_id:options.id
        goods_id:9
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
        // goods_id:that.data.goods_id
        goods_id:9
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})