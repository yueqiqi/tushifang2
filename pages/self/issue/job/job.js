// pages/Ac/jobs/jobs.js
import request from "../../../login"
Page({


  hp(){
    this.setData({
      pm:true,
      sq:false
    })
    wx.navigateBack({
      delta: 1
    });
  },
  chp:function(){
    this.setData({
      mz:false
    })
  },
  //  // ======================================================
  // 工作年限
  // 下拉选项框
  selectTap4(e) {
    this.setData({
      selectShow4: !this.data.selectShow4,
      myjob4:false,
      selectShow3: false,
      selectShow2: false,
      selectShow: false,
    });
    request({
      url:'/home/info/do_work_years_list',
      data:{
        code:"",
        mes:""
      }
      }).then(res=>{
      console.log('调用薪资成功',res)
        this.setData({
          selectData4:res.data.data
      })
      }).catch(err=>{
      console.log('调用失败')
    })
    // console.log(e)
  },
  // 点击下拉列表
  optionTap4(e) {

    let Index = e.currentTarget.dataset.index;//获取点击的下拉列表选项的下标
    console.log(Index)
    // console.log(e)
    this.setData({
      index4: Index,
      selectShow4: !this.data.selectShow4,
    });
    
  },
  // ======================================================
  // ======================================================
  // 求职状态
  // 下拉选项框
  selectTap3(e) {
    this.setData({
      selectShow3: !this.data.selectShow3,
      myjob3:false,
      selectShow4: false,
      selectShow2: false,
      selectShow: false,
    });
    // console.log(e)
  },
  // 点击下拉列表
  optionTap3(e) {
  
    let Index = e.currentTarget.dataset.index;//获取点击的下拉列表选项的下标
    console.log(Index)
    // console.log(e)
    this.setData({
      index3: Index,
      selectShow3: !this.data.selectShow3,
      
      find_work:Index
    });
  },
  // ======================================================
  // ======================================================
  // 薪资待遇
  // 下拉选项框
  selectTap2(e) {
    this.setData({
      selectShow2: !this.data.selectShow2,
      myjob2:false,
      selectShow4: false,
      selectShow3: false,
      selectShow: false,
    });
    request({
      url:'/home/info/do_salary_list',
      data:{
        code:"",
        mes:""
      }
      }).then(res=>{
      console.log('调用薪资成功',res)
        this.setData({
          selectData2:res.data.data
      })
      }).catch(err=>{
      console.log('调用失败')
    })
    // console.log(e)
  },
  // 点击下拉列表
  optionTap2(e) {
    let Index = e.currentTarget.dataset.index;//获取点击的下拉列表选项的下标
    console.log(Index)
    // console.log(e)
    this.setData({
      index2: Index,
      selectShow2: !this.data.selectShow2,
      
    });
  }, 
  // ======================================================
  // =========================================================
  // 双击
  doubleClick: function (e) {
    var curTime = e.timeStamp
    var lastTime = e.currentTarget.dataset.time  // 通过e.currentTarget.dataset.time 访问到绑定到该组件的自定义数据
    console.log(e)
    if (curTime - lastTime > 0) {
    if (curTime - lastTime < 500) {
      this.setData({
        isDisabled: false
      })
    } }
    this.setData({
      lastTapTime: curTime,
      myjob:false
    })
  },
 
  // 下拉选项框
  selectTap(e) {
    var that=this
    console.log("选择",e)
    this.setData({
      selectShow: !this.data.selectShow,
      selectShow4: false,
      selectShow3: false,
      selectShow2: false,
      myjob:false
    });
   /**
    * 获取工种类型
    */
   wx.request({
    url:"http://tsf.suipk.cn/home/Personal/do_id_type",
   data:{
    type:1,
   },
   method: 'POST',
   header: {
     'content-type': 'application/x-www-form-urlencoded'
   },
   success:function(res){
     that.setData({
       selectData:res.data.data
     })
     console.log(that.data.selectData)
    console.log('工种结果'+that.data.selectData)
  },fail:function(){
      console.log("调用工种失败")
     }
  })
  },
  // 点击下拉列表
  optionTap(e) {
    let Index = e.currentTarget.dataset.index;//获取点击的下拉列表选项的下标

    console.log("选择方式",e.currentTarget.dataset.id)
    var type_work_id=e.currentTarget.dataset.id
    this.setData({
      index: Index,
      selectShow: !this.data.selectShow,
      type_work_id
    });
    
    console.log(this.data.isDisabled)
  }, 
  // =========================================================
  formSubmit:function(e){
    var that=this
    console.log(e.detail.value)
    var m = e.detail.value
    console.log("求职状态",m.i3)
    console.log(e.detail.value);
    console.log("工种",m.i1)
    // *************************************************
    // 工种
    var type_work=m.i1
    // 薪资范围
    var salary_range=m.i2
    // 工种id
    // 求职状态
    var find_work=that.data.find_work
    // if(m.i3=='离职随时到岗')
    // 工作年限
    var working_years=m.i4
    // 联系人
    var contacts=m.i5
    // 联系电话
    var tel=m.i6
    // 详情
    var info=m.textarea
    // *************************************************
      if (m.i1 == "" || m.i2 == "" || m.i3 == "" || m.i4 == "" || m.i5 == "" || m.i6=="") {
        this.hidePopup(false);
    } else {
      this.suhide(false);
      var uid=wx.getStorageSync('uid');
    console.log("信息id",that.data.info_id)
    request({
      url:'/home/Personal/do_modify_info',
      data:{
        form:2,
        info_id:that.data.info_id,
        type_work,
        // 薪资范围
        salary_range,
        // 求职状态
        working_condition:1,
        // 工作年限
        working_years,
        // 联系人
        contacts,
        // 联系电话
        tel,
        // 详情
        info,
      }
      }).then(res=>{
      console.log('调用修改成功',res)
      console.log('修改成功',res)
      if(res.data.code==0){
        that.suhide(false);
        that.setData({
          sq:true,
          pm:false,
          model:res.data.msg
        })
      }
      }).catch(err=>{
      console.log('调用失败')
    })
  }
  },
  /* 隐藏成功弹窗 */
  suhide(flag = true) {
    this.setData({
      "sup": flag
    });
  },
  con:function(){
    wx.navigateBack({
      delta: 1
    });
  },
  /* 隐藏失败弹窗 */
  hidePopup(flag = true) {
    this.setData({
      "popup": flag
    });
  },
  /**
   * 页面的初始数据
   */
  data: {
    pm:true,
    /**
     * 个人中心跳转
     */
    myjob:false,
    myjob2:false,
    myjob3:false,
    myjob4:false,
    mz:true,
    /**
     * 
     */
    // 保存工作状态
    find_work:"",
    // 一级列表
    one_class:"",
    // 二级列表
    two_class:"",
    /**
     * 
     */
    // 工作年限
    selectData4: [],//下拉列表的数据
    selectShow4: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    index4: 0,//选择的下拉列表下标
    // 求职状态
    selectData3: ['','离职随时到岗','在职-月内到岗','在职-考虑机会','在职暂不考虑'],//下拉列表的数据
    selectShow3: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    index3: 0,//选择的下拉列表下标
    // 薪资待遇
    selectData2: [],//下拉列表的数据
    selectShow2: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    index2: 0,//选择的下拉列表下标
    // 双击事件
    lastTapTime: 0,
    // 自定义编辑
    isDisabled: true,
    selectShow: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: [],//下拉列表的数据
    index: 0,//选择的下拉列表下标
    //成功 提示框
    sup: true,
    // 错误提示框
    popup: true,
    issu:false,
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
  //  个人中心我的发布跳转
  console.log("我的发布传参",options)
    request({
      url:'/home/Personal/do_modify_details',
      data:{
      info_id:options.pid,
      form:options.form
    }
    }).then(res=>{
    this.setData({
      info_id:options.pid,
      myjob:true,
      jobs:res.data.data.type_work,
      job2:res.data.data.salary_range,
      job3:res.data.data.working_condition,
      job4:res.data.data.working_years,
      myjob2:true,
      myjob3:true,
      myjob4:true,
      contacts:res.data.data.contacts,
      tel:res.data.data.tel,
      text:res.data.data.info,
      issu:true,
    })
    }).catch(err=>{
      console.log('调用失败')
  })
/**
 * 调用工种结果
 */
    wx.request({
      url:"http://tsf.suipk.cn/home/Personal/do_id_type",
    data:{
      type:1,
    },
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    success:function(res){
      that.setData({
        type_work_id:res.data.data[0].id
      })
    },fail:function(){
      }
    })
  },
})