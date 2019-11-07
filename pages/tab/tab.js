// pages/tab/tab.js
import tabbarList from "../../utils/router.js"
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    activeIdx: {
      type: Number,
      value: 0
    },
    auth: {
      type: Number,
      value: 0,
      observer: 'onAuthChanged'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // //////////////////////
    rotez:{},
    // 求职招聘
    arr1: [
      {
        name: "我要找工作",
        link: "/pages/Ac/jobs/jobs"
      },
      {
        name: "我要招人",
        link: "/pages/Ac/hiring/hiring"
      },
    ],
    // 工地信息
    arr2: [
      {
        name: "劳务分包",
        link: "/pages/Ac/issue/issue"
      },
      {
        name: "劳务输出",
        link: "/pages/Ac/issue/issue"
      },
      {
        name: "工地找车",
        link: "/pages/Ac/issue/issue"
      },
      {
        name: "我要出渣",
        link: "/pages/Ac/issue/issue"
      },
    ],
    // 渣场信息
    arr3: [
      {
        name: "政府收渣",
        link: "/pages/Ac/issue/issue"
      },
      {
        name: "园林收渣",
        link: "/pages/Ac/issue/issue"
      },
      {
        name: "房建收渣",
        link: "/pages/Ac/issue/issue"
      },
      {
        name: "工地收渣",
        link: "/pages/Ac/issue/issue"
      },
    ],
    // 买卖信息
    arr4: [
      {
        name: "二手租货",
        link: "/pages/Ac/issue/issue"
      },
      {
        name: "渣车出售",
        link: "/pages/Ac/issue/issue"
      },
    ],
    // ani:{},
    // zz: "mm",
    // xx: "cc",
    hidden:true,
    // //////////////////////
    tabbarList: tabbarList,
    _auth: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // ///////////////////////////////////////
    // 禁止穿透滚动
    stopMove:function() {
      return;
    },
    x: function () {
      // 获取页面url
      // var pages = getCurrentPages();
      // var curPages = pages[pages.length - 1].route
      // var prevPage = pages[pages.length - 2]
      // console.log(pages, curPages, prevPage)
      // wx.navigateBack({
      //   success: function () {
      //     beforePage.onLoad(); // 执行前一个页面的onLoad方法
      //   }
      // })
      var animation = wx.createAnimation({
        duration: 400,
        timingFunction: "linear",
        delay: 0
      })
      this.animation = animation
      animation.translateY(600).step()
      this.setData({
        animationData: animation.export(),
      })
      setTimeout(function () {
        animation.translateY(0).step()
        this.setData({
          animationData: animation.export(),
          showModalStatus: false,
          hidden: true
        })
      }.bind(this), 200)
      this.setData({
        
      })},
    // ///////////////////////////////////////
    handleItemTap(e) {
      const {
        idx,
        path
      } = e.currentTarget.dataset

      if (idx === this.data.activeIdx) {
        this.trigger('refresh')
        return
      }
      // ///////////////////////////////////////////////////////////
      // console.log(e.currentTarget.dataset.idx)
      // if (e.currentTarget.dataset.idx==2){
      //   console.log(tabbarList[2].selectedIconPath)
      //   this.setData({
      //     zz:"q"
      //   })
      //   console.log(this.data.zz)
      //   var animation=wx.createAnimation({
      //     duration:400,
      //     timingFunction: 'ease',
      //     delay: 1000
      //   })
      //   animation.rotate(45).step()
      //   this.setData({
      //     ani: animation.export()
      //   })
      // }
      if(idx==2){

        // ++++++++++++++++++++++++++++++++++++++++++++++++++请求弹窗页面++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        var that=this
    wx.request({
      url:"http://tsf.suipk.cn/home/index/do_one_two",
      data:{
        code:"",
        msg:"",
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(res){
        console.log("获取菜单列表",res)
        // for(var q in that.data.info){}
        that.setData({
          info:res.data.data
        })
},fail:function(){
        console.log("调用失败")
      }
    })
        // ++++++++++++++++++++++++++++++++++++++++++++++++++请求弹窗页面++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        var animation = wx.createAnimation({
          duration: 400,
          timingFunction: "linear",
          delay: 0
        })
        animation.translateY(600).step()
        this.setData({
          animationData: animation.export(),
          showModalStatus: true
        })
        var that=this
        var rote = wx.createAnimation({
          duration: 1400,
          timingFunction: "linear",
          transformOrigin: "50% 50%",
          
        })
        rote.rotate(-45).step()
        that.setData({
          rotez: rote.export(),
        })
        // 设置定时器规定几秒后自动清除动画
        setTimeout(function () {
          animation.translateY(0).step()
          this.setData({
            animationData: animation.export()
          })
        }.bind(this), 200)
        this.setData({
          hidden:false,
        })
      }
      // //////////////////////////////////////////////////////////////////////////////////
      wx.switchTab({
        url: `/${path}`,
      })
    },
    onAuthChanged(newVal) {
      wx.setStorageSync('__com-tabbar-auth', newVal)
      this.setData({
        _auth: newVal
      })
    },
    trigger(eventName, value = {}, info) {
      if (!eventName) {
        throw new TypeError('没有自定义事件名')
      }
      this.triggerEvent(eventName, value)
      console.log(`发送 ${eventName} 事件,携带的值为 ${typeof value === 'object' ? JSON.stringify(value) : value} ${info ? '   ---   ' + info : ''}`)
    }
  },
  ready() { },
  /** 权限显示 */
  pageLifetimes: {
    show: function () {
      console.log('show')
      this.setData({
        _auth: wx.getStorageSync('__com-tabbar-auth')
      })
    }
  }
})