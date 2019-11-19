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
    console.log('获取去下标id',e)
    this.setData({
      checkboxArr: checkboxArr
    });
  },

  checkboxChange: function (e) {
    console.log(e.detail.value.length)
    console.log('选择的id',e)
    // 判断用户是否选择兴趣
    if (e.detail.value.length>0){
      this.setData({
        disabled:false
      })
    } 
    // else if (e.detail.value.length == 0){
    //   this.setData({
    //     disabled:true
    //   })
    // }
    var checkValue = e.detail.value;
    this.setData({
      checkValue: checkValue
    });
  },

  confirm: function () {// 提交
    var uid=wx.getStorageSync('uid');
    console.log(this.data.checkValue)
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
      console.log('调用失败')
    })
  },
  // data: {
  //   text: "请选择",
  //   items: [
  //     { name: '1', value: '兴趣' },
  //     { name: '2', value: '兴趣' },
  //     { name: '3', value: '兴趣' },
  //     { name: '4', value: '兴趣' },
  //     { name: '5', value: '兴趣' },
  //     { name: '6', value: '兴趣' },
  //     { name: '7', value: '兴趣' },
  //   ]
  // },
  // //设置checbox最多被选中三个  
  // checkboxChange: function (e) {
  //   var that = this;
  //   var skin = e.detail.value
  //   //新建数组全部设置为没被选中  
  //   var new_itmes = [
  //     { name: '1', value: '兴趣' },
  //     { name: '2', value: '兴趣' },
  //     { name: '3', value: '兴趣' },
  //     { name: '4', value: '兴趣' },
  //     { name: '5', value: '兴趣' },
  //     { name: '6', value: '兴趣' },
  //     { name: '7', value: '兴趣' },
  //   ]
  //   if (skin.length > 3) {
  //     //取出倒数三个值  
  //     var key1 = skin[skin.length - 1];
  //     var key2 = skin[skin.length - 2];
  //     var key3 = skin[skin.length - 3];
  //     //设置最后三个值为选中状态  
  //     new_itmes[key1 - 1]['checked'] = 'true'
  //     new_itmes[key2 - 1]['checked'] = 'true'
  //     new_itmes[key3 - 1]['checked'] = 'true'

  //     //删除被选中的第一个值  
  //     skin.splice(0, 1);
  //   } else {
  //     //被选中少于三个，直接设置被选中  
  //     for (var i = 0; i < skin.length; i++) {
  //       var key = skin[i]
  //       new_itmes[key - 1]['checked'] = 'true'
  //     }
  //   }
  //   //拼接文字显示  
  //   var text = [];
  //   for (var i = 0; i < skin.length; i++) {
  //     var key = skin[i]
  //     text[i] = that.data.items[key - 1]['value']
  //   }
  //   text = text.join("、")
  //   //存入  
  //   that.setData({
  //     skin: skin,
  //     text: text,
  //     items: new_itmes
  //   })
  // }  ,

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
      console.log('调用我的兴趣成功',res)
        var op =res.data.data
        console.log(op)
      request({
        url:'/home/personal/do_my_Interest',
          data:{
            uid
          }
          }).then(res=>{
          console.log('调用已保存兴趣成功',res)
          console.log('循环',op)
          /**
           * 
           */
          var indexs=[]  
          for(var i in op){
          for(var m in res.data.data){
              if(res.data.data[m].id==op[i].id){
                console.log('查找的数据',op[i],i)
                indexs.push(i)
                
              }
              // console.log('保存的数组1.1',indexs)
            }
            // console.log('保存的数组1',indexs)
          }
          that.setData({
            indexss:indexs
          })
          console.log('保存的数组2',indexs)
          console.log('保存的数组3',that.data.indexss)

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
          console.log('调用失败')
        })

      this.setData({
        checkboxArr:res.data.data
      })

   
    console.log('最后的数组',that.data.checkboxArr)
      }).catch(err=>{
      console.log('调用失败')
    })
  },
  onReady:function(){

  },
})