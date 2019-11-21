// pages/interest/interest.js
import request from '../login.js' 
Page({
  data: {
    // 按钮是否禁用
    disabled:true,
    checkboxArr: [],
  },
  checkbox: function (e) {
    var index = e.currentTarget.dataset.index;//获取当前点击的下标
    var checkboxArr = this.data.checkboxArr;//选项集合
    checkboxArr[index].checked = !checkboxArr[index].checked;//改变当前选中的checked值
    var checkValue = e.detail.value;
    //console.log('获取去下标id',e)
    this.setData({
      checkboxArr: checkboxArr
    });
  },

  checkboxChange: function (e) {
    //console.log(e.detail.value.length)
    //console.log('选择的id',e)
    // 判断用户是否选择兴趣
    if (e.detail.value.length>0){
      this.setData({
        disabled:false
      })
    } 
    var checkValue = e.detail.value;
    this.setData({
      checkValue: checkValue
    });
  },

  confirm: function () {// 提交
    var uid=wx.getStorageSync('uid');
    //console.log(this.data.checkValue)
    var int=this.data.checkValue
    var qo=int.toString()
    request({
      url:'/home/personal/do_addmy_Interest',
      data:{
        uid,
        two_class_id_str:qo,
      }
      }).then(res=>{
        if(res.data.code==0){
          wx.setStorageSync('int',int);
         wx.showToast({
           title: '修改成功',
           icon: 'success',
           duration: 3500,
           mask: false,
           success: (result)=>{
             setTimeout(()=>{
               wx.navigateBack({
                 delta: 1
               });
             },2000)

           },
           fail: ()=>{},
           complete: ()=>{}
         });
        }else{
          wx.showModal({
            title: '修改状态',
            content: '修改失败请重试',
            showCancel: true,
            cancelText: '取消',
            cancelColor: '#000000',
            confirmText: '确定',
            confirmColor: '#3CC51F',
            success: (result) => {
              if(result.confirm){
                
              }
            },
            fail: ()=>{},
            complete: ()=>{}
          });
        }
      }).catch(err=>{
      //console.log('调用失败')
    })
  },

  /**
   * 页面的初始数据
   */
  // data: {

  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var uid=wx.getStorageSync('uid');
    var that=this
    request({
      url:'/home/Info/do_twoclass_list',
      data:{
        one_class_id:'',
      }
      }).then(res=>{
      //console.log('调用我的兴趣成功',res)
        var op =res.data.data
        //console.log(op)
      request({
        url:'/home/personal/do_my_Interest',
          data:{
            uid
          }
          }).then(res=>{
          //console.log('调用已保存兴趣成功',res)
          //console.log('循环',op)
          /**
           * 
           */
          var indexs=[]  
          for(var i in op){
          for(var m in res.data.data){
              if(res.data.data[m].id==op[i].id){
                //console.log('查找的数据',op[i],i)
                indexs.push(i)
                
              }
              // //console.log('保存的数组1.1',indexs)
            }
            // //console.log('保存的数组1',indexs)
          }
          that.setData({
            indexss:indexs
          })
          //console.log('保存的数组2',indexs)
          //console.log('保存的数组3',that.data.indexss)

          var indexsm=that.data.indexss
          for(var j in that.data.checkboxArr){ 
          for(var h in indexsm){
              if(j==indexsm[h]){
                var checked='checkboxArr['+ j +'].checked'
                that.setData({
                  [checked]:true
                })
              }
            }
          }
          /**
           * 
           */
          }).catch(err=>{
          //console.log('调用失败')
        })

      this.setData({
        checkboxArr:res.data.data
      })

   
    //console.log('最后的数组',that.data.checkboxArr)
      }).catch(err=>{
      //console.log('调用失败')
    })
  },
  onReady:function(){

  },
})