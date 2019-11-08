// pages/Ac/diver2/diver2.js


// 修改后缀共8处

import request from "../../login.js"
Page({
  // 完成
  formSubmit:function(){
    // 打印输入的内容
var that=this
    if (this.data.tempFilePaths.length == 0 || this.data.tempFilePaths2.length == 0 || this.data.tempFilePaths3.length == 0 || this.data.tempFilePaths4.length == 0 || this.data.tempFilePaths5.length == 0 || this.data.tempFilePaths6.length <2) {
      this.hidePopup(false);
    } else {
      var identity_selection=that.data.identity_selection
      var real_name=that.data.real_name
      var tel=that.data.tel
      var vehicle_id=that.data.vehicle_id
      var car_number=that.data.car_number
      // 驾驶证件照
      var p=that.data.img_url_driving
      var z=p.join('|')
      var img_url_driving=z
      // 行驶证件照
      var p1=that.data.img_url_certificate
      var z1=p1.join('|')
      var img_url_certificate=z1
      // 车辆四周照片
      var p2=that.data.img_url_surroundings
      var z2=p2.join('|')
      var img_url_surroundings=z2
      // 运营证件照
      var p3=that.data.img_url_operating
      var z3=p3.join('|')
      var img_url_operating=z3
      // 从业资格证
      var p4=that.data.img_url_qualification
      var z4=p4.join('|')
      var img_url_qualification=z4
      // 手持身份照
      var p5=that.data.img_url_card
      var z5=p5.join('|')
      var img_url_card=z5
      var uid=wx.getStorageSync('uid');
      request({
        url:'http://tsf.suipk.cn/home/Personal/do_driver',
        data:{
          uid,
          identity_selection,
          real_name,
          tel,
          vehicle_id,
          car_number,
          img_url_driving,
          img_url_certificate,
          img_url_surroundings,
          img_url_operating,
          img_url_qualification,
          img_url_card,
        }
      }).then(res=>{
        console.log('调用我是司机成功',res)
        if(res.data.code==101&&res.data.code==0){
          that.suhide(false);
        }else{
          that.hidePopup(false);
        }
        }).catch(err=>{
          console.log('调用失败')
      })
    }
    
  },
  nn:function(){
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },
  /* 隐藏成功弹窗 */
  suhide(flag = true) {
    var that=this
    that.setData({
      "sup": flag
    });
    that.nn()
   
  },

  backs:function(){
    wx.redirectTo({
      url: '/pages/Ac/index/inex',
      success: (result)=>{
        
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },
  /* 隐藏失败弹窗 */
  hidePopup(flag = true) {
    this.setData({
      "popup": flag
    });
  },
// 上一步
up:function(){
  wx.navigateBack({
    
  })
},

  
  // 身份证
  /**
     * 上传图片方法
     */
  upload6: function () {
    let that = this;
    wx.chooseImage({
      count: 2, // 默认9
      type: 'image',
      // sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      // sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: (res) => {
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 1000
        })
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        console.log("图片路径",res)
        let tempFilePaths = res.tempFilePaths;
        // let image=res.tempFiles.path
        that.setData({
          tempFilePaths6: tempFilePaths
        })
        /**
         * 上传完成后把文件上传到服务器
         */
        // var count = 0;
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
                img_url_card:a
              })
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
          console.log("最后的",a)
        }




            // request({
            // url:'http://tsf.suipk.cn/home/Personal/do_uplod_img',
            // data:{
            //   image,
            // }
            // }).then(res=>{
            // console.log('调用第六个图片信息成功',res)
            // this.setData({
            
            // })
            // }).catch(err=>{
            // console.log('调用失败')
            // })
        // }
      }
    })
  },
  /**
   * 预览图片方法
   */
  listenerButtonPreviewImage6: function (e) {
    let index = e.target.dataset.index;
    let that = this;
    console.log(that.data.tempFilePaths[index]);
    console.log(that.data.tempFilePaths);
    wx.previewImage({
      current: that.data.tempFilePaths[index],
      urls: that.data.tempFilePaths6,
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
  deleteImage6: function (e) {
    var that = this;
    var tempFilePaths6 = that.data.tempFilePaths6;
    var index = e.currentTarget.dataset.index;//获取当前长按图片下标
    wx.showModal({
      title: '提示',
      content: '确定要删除此图片吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('点击确定了');
          tempFilePaths6.splice(index, 1);
        } else if (res.cancel) {
          console.log('点击取消了');
          return false;
        }
        that.setData({
          tempFilePaths6
        });
      }
    })
  },
  // ===========================================================================================
  // 从业资格证
  /**
     * 上传图片方法
     */
  upload5: function () {
    let that = this;
    wx.chooseImage({
      count: 1, // 默认9
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
          tempFilePaths5: tempFilePaths
        })
        /**
         * 上传完成后把文件上传到服务器
         */
        var count = 0;
          var a =[]
          // for (var i = 0, h = tempFilePaths.length; i < h; i++) {
            //上传文件
            wx.uploadFile({
              url: 'http://tsf.suipk.cn/home/Personal/do_uplod_img',
              filePath: tempFilePaths[0],
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
                  img_url_qualification:a
                })
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
            console.log("最后的",a)
          }

      // }
    })
  },
  /**
   * 预览图片方法
   */
  listenerButtonPreviewImage5: function (e) {
    let index = e.target.dataset.index;
    let that = this;
    console.log(that.data.tempFilePaths[index]);
    console.log(that.data.tempFilePaths);
    wx.previewImage({
      current: that.data.tempFilePaths[index],
      urls: that.data.tempFilePaths5,
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
  deleteImage5: function (e) {
    var that = this;
    var tempFilePaths5 = that.data.tempFilePaths5;
    var index = e.currentTarget.dataset.index;//获取当前长按图片下标
    wx.showModal({
      title: '提示',
      content: '确定要删除此图片吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('点击确定了');
          tempFilePaths5.splice(index, 1);
        } else if (res.cancel) {
          console.log('点击取消了');
          return false;
        }
        that.setData({
          tempFilePaths5
        });
      }
    })
  },
  // =================================================================================================
  // 运营证件照
  /**
     * 上传图片方法
     */
  upload4: function () {
    let that = this;
    wx.chooseImage({
      count: 1, // 默认9
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
          tempFilePaths4: tempFilePaths
        })
        /**
         * 上传完成后把文件上传到服务器
         */
        request({
          url:'http://tsf.suipk.cn/home/Personal/do_uplod_img',
          data:{
            image:tempFilePaths
          }
          }).then(res=>{
          console.log('调用成功',res)
          this.setData({
          
          })
          }).catch(err=>{
          console.log('调用失败')
          })
          var count = 0;
          var a =[]
          // for (var i = 0, h = tempFilePaths.length; i < h; i++) {
            //上传文件
            wx.uploadFile({
              url: 'http://tsf.suipk.cn/home/Personal/do_uplod_img',
              filePath: tempFilePaths[0],
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
                  img_url_operating:a
                })
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
            console.log("最后的",a)
          // }

      }
    })
  },
  /**
   * 预览图片方法
   */
  listenerButtonPreviewImage4: function (e) {
    let index = e.target.dataset.index;
    let that = this;
    console.log(that.data.tempFilePaths[index]);
    console.log(that.data.tempFilePaths);
    wx.previewImage({
      current: that.data.tempFilePaths[index],
      urls: that.data.tempFilePaths4,
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
  deleteImage4: function (e) {
    var that = this;
    var tempFilePaths4 = that.data.tempFilePaths4;
    var index = e.currentTarget.dataset.index;//获取当前长按图片下标
    wx.showModal({
      title: '提示',
      content: '确定要删除此图片吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('点击确定了');
          tempFilePaths4.splice(index, 1);
        } else if (res.cancel) {
          console.log('点击取消了');
          return false;
        }
        that.setData({
          tempFilePaths4
        });
      }
    })
  },
  // =====================================================================================
  // 车辆四周照
  /**
     * 上传图片方法
     */
  upload3: function () {
    let that = this;
    wx.chooseImage({
      count: 8, // 默认9
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
          tempFilePaths3: tempFilePaths
        })
        /**
         * 上传完成后把文件上传到服务器
         */
        request({
          url:'http://tsf.suipk.cn/home/Personal/do_uplod_img',
          data:{
            image:tempFilePaths
          }
          }).then(res=>{
          console.log('调用成功',res)
          this.setData({
          
          })
          }).catch(err=>{
          console.log('调用失败')
          })
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
                  img_url_surroundings:a
                })
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
            console.log("最后的",a)
          }
      }
    })
  },
  /**
   * 预览图片方法
   */
  listenerButtonPreviewImage3: function (e) {
    let index = e.target.dataset.index;
    let that = this;
    console.log(that.data.tempFilePaths[index]);
    console.log(that.data.tempFilePaths);
    wx.previewImage({
      current: that.data.tempFilePaths[index],
      urls: that.data.tempFilePaths3,
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
  deleteImage3: function (e) {
    var that = this;
    var tempFilePaths3 = that.data.tempFilePaths3;
    var index = e.currentTarget.dataset.index;//获取当前长按图片下标
    wx.showModal({
      title: '提示',
      content: '确定要删除此图片吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('点击确定了');
          tempFilePaths3.splice(index, 1);
        } else if (res.cancel) {
          console.log('点击取消了');
          return false;
        }
        that.setData({
          tempFilePaths3
        });
      }
    })
  },
  // ===========================================================================================
  // 行驶证
  /**
     * 上传图片方法
     */
  upload2: function () {
    let that = this;
    wx.chooseImage({
      count: 1, // 默认9
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
          tempFilePaths2: tempFilePaths
        })
        /**
         * 上传完成后把文件上传到服务器
         */
        request({
          url:'http://tsf.suipk.cn/home/Personal/do_uplod_img',
          data:{
            image:tempFilePaths
          }
          }).then(res=>{
          console.log('调用成功',res)
          this.setData({
          
          })
          }).catch(err=>{
          console.log('调用失败')
          })
          var count = 0;
          var a =[]
          // for (var i = 0, h = tempFilePaths.length; i < h; i++) {
            //上传文件
            wx.uploadFile({
              url: 'http://tsf.suipk.cn/home/Personal/do_uplod_img',
              filePath: tempFilePaths[0],
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
                  img_url_certificate:a
                })
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
            console.log("最后的",a)
          // }
  

      }
    })
  },
  /**
   * 预览图片方法
   */
  listenerButtonPreviewImage2: function (e) {
    let index = e.target.dataset.index;
    let that = this;
    console.log(that.data.tempFilePaths[index]);
    console.log(that.data.tempFilePaths);
    wx.previewImage({
      current: that.data.tempFilePaths[index],
      urls: that.data.tempFilePaths2,
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
  deleteImage2: function (e) {
    var that = this;
    var tempFilePaths2 = that.data.tempFilePaths2;
    var index = e.currentTarget.dataset.index;//获取当前长按图片下标
    wx.showModal({
      title: '提示',
      content: '确定要删除此图片吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('点击确定了');
          tempFilePaths2.splice(index, 1);
        } else if (res.cancel) {
          console.log('点击取消了');
          return false;
        }
        that.setData({
          tempFilePaths2
        });
      }
    })
  },
  // ==========================================================================================
  // 驾驶证
  /**
     * 上传图片方法
     */
  upload: function () {
    let that = this;
    wx.chooseImage({
      count: 1, // 默认9
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
         request({
            url:'http://tsf.suipk.cn/home/Personal/do_uplod_img',
            data:{
              image:tempFilePaths
            }
            }).then(res=>{
            console.log('调用成功',res)
            this.setData({
            
            })
            }).catch(err=>{
            console.log('调用失败')
            })
            var count = 0;
            var a =[]
            // for (var i = 0, h = tempFilePaths.length; i < h; i++) {
              //上传文件
              wx.uploadFile({
                url: 'http://tsf.suipk.cn/home/Personal/do_uplod_img',
                filePath: tempFilePaths[0],
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
                    img_url_driving:a
                  })
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
              console.log("最后的",a)
            // }
    

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
   * 页面的初始数据
   */
  data: {
    //成功 提示框
    sup: true,
    // 错误提示框
    popup: true,
    tempFilePaths: [],
    tempFilePaths2: [],
    tempFilePaths3: [],
    tempFilePaths4: [],
    tempFilePaths5: [],
    tempFilePaths6: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("接受我是司机1传来的参数",options)
    this.setData({
      identity_selection:options.identity_selection,
      real_name:options.real_name,
      tel:options.tel,
      vehicle_id:options.vehicle_id,
      car_number:options.car_number
    })
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
  onShareAppMessage: function () {

  }
})