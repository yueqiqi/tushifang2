Page({

  fn2(num){
    num+=2
    return num
  },

fn(){
  var s=1
  var m=this.fn2(s)
  console.log(m)
},


   // 把一个数组按照一定长度分割成若干数组
  group(array, subGroupLength) {
        let index = 0;
        let newArray =[];
        while(index <array.length) {
        newArray.push(array.slice(index, index += subGroupLength));
    }
 return newArray},
//  分割数组
  splice:function(){
    // let groupedArray = this.group(this.data.sp, 2);
    // console.log('分割后的数组',groupedArray);
   var sz= this.data.sp.slice(0,2)
    console.log('截取后的数组',sz)
  },
  data:{
    sp:[
      {
        id:1,
        name:'bob'
      },
      {
        id: 2,
        name: 'job'
      },
      {
        id: 3,
        name: 'tom'
      },
 

    ]
  }
})