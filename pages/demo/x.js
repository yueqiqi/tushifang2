// pages/demo/x.js
Page({
upshow:function(){
  var that=this
  that.setData({
    hidden:true
  })
},
  data: {
    // 
    hidden:false,
    // 
    activeIdx: 2,
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  
})