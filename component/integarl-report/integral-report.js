// component/integral-report.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    ret:{
      type:Boolean,
      // value:''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    popup: true,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    report(ops){//接受传递过来的值
      console.log('接收传递过来的值',ops)
      this.data.popup=ops
    }
  }
})
