// pages/gu//line/index.js
var t = getApp(),
    a = t.requirejs("core"),
    e = t.requirejs("jquery");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    list:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id || 0
    })
  },
  buy(){
    let id = this.data.id;
    wx.navigateTo({
      url: '/pages/gu/buy/index?id='+id,
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
        list:e.line
      })
    }

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