// pages/informmation/peopledetail/peopledetail.js
import request from '../../login.js'
import like from '../../like.js'
Page({
  formSubmit: function (e) {
    var uid=wx.getStorageSync('uid');
    var that=this
    var e = e.detail.value
    var info_id=that.data.info_id
    if(that.data.tempFilePaths==''){
      var img_url_arr=''
    }else{
      var p=that.data.img_url_arr
      console.log('文件',that.data.img_url_arr)
      var z=p.join('|')
      var img_url_arr=z
      console.log(z)
    }
    var content=e.textarea
    if (e.textarea.length < 5) {
      wx.showToast({
        title: '字数在5~100字哟~~~',
        image: "../images/fail.png",
        duration: 2000
      })
    } else {
      // **************************
      // 举报
      wx.request({
        url:"http://tsf.suipk.cn/home/info/do_report",
        data:{
          uid,
          info_id,
          content,
          img_url_arr
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success:function(res){
          console.log("举报调用成功",res)
          if(res.data.code==0){
            wx.showModal({
              title: '提交成功',
              content: "提交成功，我们会在1-3个工作日内进行审核，如果举报属实，会对该用户做出相应惩罚，审核消息会在第一时间发送至您的消息中心，请注意查收。",
              showCancel: false,
              icon: 'success',
              duration: 2000,
              success: function (res) {
                if (res.confirm) {
                  console.log("用户点击了确定")
                  console.log(res);
                  console.log(res.confirm)
                }
              }
            })
          }
        },fail:function(){
          console.log("调用举报失败",res)
        }
      })
      // **************************
    }
    this.hideModal();
  },
  /**
   * 字数限制
   */
  inputs: function (e) {

    // 获取输入框的内容
    var value = e.detail.value;
    // 获取输入框内容的长度
    var len = parseInt(value.length);
    // //最少字数限制
    // if (len < this.data.min) {
    //   wx.showToast({
    //     title:"建议内容要5-100字哟",
    //     image:"../../images/like.png"
    //   })
    //   // this.setData({
    //   //   texts: "请至少要输入5个字哦"
    //   // })
    // } 
    // else if (len >= this.data.min) {
    //   this.setData({
    //     texts: " "
    //   })
    // }
    //最多字数限制
    if (len > this.data.max) return;
    // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行
    this.setData({
      currentWordNumber: len //当前字数  
    });
  },
  /**
   * 上传图片方法
   */
  upload: function () {
    let that = this;
    wx.chooseImage({
      count: 2, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: res => {
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 1000
        })
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFilePaths = res.tempFilePaths;

        that.setData({
          tempFilePaths: tempFilePaths
        })
        /**
         * 上传完成后把文件上传到服务器
         */
        var count = 0;
          var a =[]
          for (var i = 0, h = tempFilePaths.length; i < h; i++) {
            //上传文件
          wx.uploadFile({
            url: 'http://tsf.suipk.cn/home/Personal/do_uplod_img',
            filePath: tempFilePaths[i],
            name: 'image',
            method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
            success: function (res) {
              // console.log(that.data.tempFilePaths[1])
              console.log("检验图片上传",res)
              count++;
              var qwe=res.data
              var resl=JSON.parse(qwe)
              a.push(resl.data)
              console.log("返回值",resl,a)
              that.setData({
                img_url_arr:a
              })
              console.log('最后a',that.data.a)
              //如果是最后一张,则隐藏等待中  
              if (count == tempFilePaths.length) {
                wx.hideToast();
              }
            },
            fail: function (res) {
              wx.hideToast();
              wx.showModal({
                title: '错误提示',
                content: '上传图片失败',
                showCancel: false,
                success: function (res) { }
              })
            }
          });
        // }//if
        }
      }
    })
  },
  /**
   * 预览图片方法
   */
  listenerButtonPreviewImage: function (e) {
    let index = e.target.dataset.index;
    let that = this;
    console.log(that.data.tempFilePaths[index]);
    console.log(that.data.tempFilePaths);
    wx.previewImage({
      current: that.data.tempFilePaths[index],
      urls: that.data.tempFilePaths,
      //这根本就不走
      success: function (res) {
        //console.log(res);
      },
      //也根本不走
      fail: function () {
        //console.log('fail')
      }
    })
  },
  /**
   * 长按删除图片
   */
  deleteImage: function (e) {
    var that = this;
    var tempFilePaths = that.data.tempFilePaths;
    var index = e.currentTarget.dataset.index;//获取当前长按图片下标
    wx.showModal({
      title: '提示',
      content: '确定要删除此图片吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('点击确定了');
          tempFilePaths.splice(index, 1);
        } else if (res.cancel) {
          console.log('点击取消了');
          return false;
        }
        that.setData({
          tempFilePaths
        });
      }
    })
  },
  /**
  * 弹窗
  */
  showDialogBtn: function () {
    this.setData({
      showModal: true
    })

  },
  /**
  * 隐藏模态对话框
  */
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  /**
  * 对话框取消按钮点击事件
  */
  onCancel: function () {
    this.hideModal();
  },
  // 分享
  share:function(){
    console.log("分享")
  },
  // 点赞
  like:function(){
    var uid=wx.getStorageSync('uid');
    var that=this
    console.log("点赞")
    like({
      data:{
        uid,
        type:2,
        info_id:that.data.info_id,
      }
      }).then(res=>{
      console.log('调用点赞成功',res)
        // ++++++++++++++++++++++++++刷新页面++++++++++++++++++
        // var uid=wx.getStorageSync('uid');
        request({
          url:'/home/info/do_info_content',
          data:{
          uid,
          type:2,
          info_id:that.data.info_id
        }
        }).then(res=>{
        console.log('调用信息详情成功',res)
        this.setData({
          list:res.data.data
        })
        }).catch(err=>{
          console.log('调用失败')
        })
      })
  },
  // 举报
  report:function(){
    console.log("举报")
  },
  // 名片
card:function(){
  console.log("名片")
},
  /**
   * 页面的初始数据
   */
  data: {
    min: 5,//最少字数
    max: 100, //最多字数 (根据自己需求改变)
    tempFilePaths: [],
    // 点赞
    like:20,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that=this
    /**
     * 获取的信息详情的广告图
     */
    request({
      url:'/home/info/do_get_advert',
        data:{
          type:2
        }
        }).then(res=>{
          console.log('调用找人才广告图成功',res.data.data)
        console.log('调用招人才广告图成功',res.data.data.img_url)
        that.setData({
          ads:res.data.data.img_url
        })
        console.log('广告图的信息',that.data.ads)
        }).catch(err=>{
        console.log('调用失败')
      })

    console.log('招人才跳转',options.info_id)
    this.setData({
      info_id:options.info_id
    })
    
    if(options.share){
      var uid=options.uid
    }else{
      var uid=wx.getStorageSync('uid');
    }
    request({
      url:'/home/info/do_info_content',
      data:{
        type:2,
        info_id:options.info_id,
        // info_id:137,
        uid
      }
      }).then(res=>{
      console.log('调用成功',res)
      this.setData({
        list:res.data.data
      })
      }).catch(err=>{
      console.log('调用失败')
    })
  },
call:function(){
  var that=this

  wx.makePhoneCall({
    phoneNumber: that.data.list.tel,
    success: (result)=>{
      
    },
    fail: ()=>{},
    complete: ()=>{}
  });
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
  onShareAppMessage: function (res) {
    var uid=wx.getStorageSync('uid');
    return {
      title: '包程项',
      path: '/pages/informmation/peopledetail/peopledetail?info_id='+this.data.info_id+'&uid='+uid+'&share=1',
      success: function (res) {
        console.log('成功', res)
      }
    }
  }
})