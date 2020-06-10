// pages/gu//buy/index.js
var t = getApp(),
a = t.requirejs("core"),
e = t.requirejs("jquery"),
i = t.requirejs("foxui");
Page({

  /**
   * 页面的初始数据
   */
  data: {

    id:0,
    list:{},
    address:'',   //详细地址
    phone:'',
    linenum:1,    //线路数量
    realname:'',  //联系人
    province:'',  //省市区
    city:'',  //省市区
    district:'',  //省市区
    remark:'',  //订单备注
    price:'', //原价
    region:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      id:options.id || 0
    })
  },
  // 加
  reduce(){
    let linenum = this.data.linenum - 1;
    if(linenum<0){
      wx.showToast({
        title: '最少1人',
      })
      return 
    }
    let marketprice = this.data.price;
    let price = (marketprice*linenum).toFixed(2)
    this.setData({
      linenum:linenum,
      [`list.marketprice`] : price
    })
    
  },
  // 加
  plus(){
    let linenum = this.data.linenum + 1;
    let marketprice = this.data.price;
    let price = (marketprice*linenum).toFixed(2)
    this.setData({
      linenum:linenum,
      [`list.marketprice`]: price
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

    this.get_detail();
  },
  
  get_detail(){
    var that = this;
    a.get("line/get_detail", {
      id:this.data.id
    }, function(e) {
      console.log(e);
      if(e.error==0){
        that.setData({
          list:e.line,
          price:e.line.marketprice
        })
      }

    })
  },
  inputAddress(e){
    this.setData({
      address:e.detail.value,
    })
  },
  inputPhone(e){
    this.setData({
      phone:e.detail.value,
    })
  },
  inputRealname(e){
    this.setData({
      realname:e.detail.value,
    })
  },
  inputRemark(e){
    this.setData({
      remark:e.detail.value,
    })
  },
  bindRegionChange: function (e) {
    let region = e.detail.value
    this.setData({
      region: region,
      province:region[0],
      city:region[1],
      district:region[2],
    })
  },
  buyOrder(){
    var e = this;
    let address = this.data.address;
    let realname = this.data.realname;
    let phone = this.data.phone;
    let id = this.data.id;
    let remark = this.data.remark;
    let province = this.data.province;
    let city = this.data.city;
    let district = this.data.district;
    if(!province && !city && !district){
      return void i.toast(e, "请选择出发城市"); 
    }

    if(!id){
      return void i.toast(e, "请选择线路"); 
    }
    if(!address){
      return void i.toast(e, "请输入出发地址"); 
    }
    if(!realname){
      return void i.toast(e, "请输入联系人"); 
    }
    if(!phone){
      return void i.toast(e, "请输入手机号码"); 
    }else{
      if (!/^1(3|4|5|7|8|9)\d{9}$/.test(phone)){
          return void i.toast(e, "请输入正确的手机号"); 
      }
    }
    let data={
      id:id,
      address:address,
      mobile:phone,
      remark:remark,
      province:province,
      city:city,
      district:district,
      realname:realname,
      linenum:this.data.linenum,

    };
    a.post("line/order/create_order",data, function(t) {
      console.log(t);
      if(t.error ==0 ){
        i.toast(e, "支付成功，请等待商家接单！");
        setTimeout(() => {
          wx.navigateTo({
            url: "/pages/order/pay/index?id=" + t.orderid,
          })
        }, 1000);
      }else{
        return void i.toast(e, "订单创建失败"); 
      }
    }, !0, !0)

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