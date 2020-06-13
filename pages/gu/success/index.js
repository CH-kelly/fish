// pages/gu//success/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'提交成功！请耐心等待审核',
    butTitle:'查看评价',
    isShowButton:0,
    type:0,
    url:'',
  },

  /**
   * 生命周期函数--监听页面加载
   * type: 1点评成功  2收货成功   3提交成功  4支付成功   5接单成功  6确认服务成功   7正在开发  
   */
  onLoad: function (options) {
    let type = options.type || 0;
    this.setData({
      type:type
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
    let title = '';
    let type = this.data.type
    let title1 = '';
    let butTitle = '';
    let url = '';
    let isShowButton = 0;
    if(type == 1){
      title = '点评成功';
      title1 = "点评成功！"
      butTitle = "查看评价"
    }else if(type == 2){
      title = '收货成功'
      title1 = "收货成功，给导游评价一下吧"
      butTitle = "立即评价"
    }else if(type == 3){
      title = '提交成功'
      title1 = "提交成功！请耐心等待审核"
      butTitle = "回到个人中心";
      url="/pages/member/index/index"
    }else if(type == 4){  //线路支付成功,查看订单就走到导游订单
      title = '支付成功'
      title1 = "支付成功！请等待商家接单"
      butTitle = "查看订单";
      url="/pages/gu/order/index"
    }else if(type == 5){
      title = '接单成功'
      title1 = "接单成功，请尽快联系客户安排行程"
      butTitle = "查看订单"
    }else if(type == 6){
      title = '提交成功'
      title1 = "提交成功，本次导游服务已完成！"
      butTitle = ""
      isShowButton = 1;
    }else if(type == 7){
      title = '接单成功'
      title1 = "接单成功，请尽快联系客户安排行程"
      butTitle = "查看订单"
    }else if(type == 8){  //商品支付成功
      title = '支付成功'
      title1 = "支付成功!"
      butTitle = "查看订单";
      url="/pages/order/index"
    }else if(type == 9){  //正在开发
      title = '正在开发....'
      title1 = "正在开发...."
      butTitle = "";
    }else{
      title = "提交成功"
    }
    this.setData({
      title:title1,
      isShowButton:isShowButton,
      butTitle:butTitle,
      url:url
    })
    wx.setNavigationBarTitle({
      title: title
    });
  },
  clickButTitle(){
    wx.switchTab({
      url: this.data.url,
    })
  },
  gotoIndex(){
    wx.switchTab({
      url: '/pages/index/index',
    })
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