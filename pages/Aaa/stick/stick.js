var dateTimePicker = require('./date.js');
var dateTimePicker2 = require('./date2.js');
Page({
  // 第二个单选
  seonChange(e) {
    this.setData({
     seradio: e.detail
    });
  },
  // 单选框
  sonChange(e) {
    this.setData({
      sradio: e.detail
    });
  },
  /* 点击隐藏弹窗 */
  a_hidden() {
    this.setData({
      "show": true
    });
    console.log("点击确定隐藏弹框")
  },
  // 点击叉关闭弹窗
  op:function(){
    this.setData({
      'show':true,
    })
    console.log('点击叉关闭弹窗')
  },
  /* 点击按钮显示弹窗 */
  a_show() {
    this.setData({
      "show":false
    })
    console.log("点击按钮显示弹框")
    
  },
  data:{

    // 消耗积分
    int:100,
    // 时间分类
    index: 0,
    dates: '请选择开始时间',
    edates: '请选择结束时间',
    show: true,
    // 单选框
    sradio: '0',
    seradio: '1'
  },

})