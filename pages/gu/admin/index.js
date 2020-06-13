// pages/gu//admin/index.js
var t = getApp(),
    a = t.requirejs("core");
t.requirejs("jquery");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current:1,
    list: [],
    page:0,
    merch: {},
    merchid:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      merchid: options.id
    });
  },
  clickNav(e){
    let id = e.currentTarget.dataset.id
    this.setData({
      current:id
    })
  },
  // 立即接单
  receiv(){
    wx.navigateTo({
      url: '/pages/gu/success/index?type=5',
    })
  },
  // 立即接单
  serviceComplete(){
    wx.navigateTo({
      url: '/pages/gu/success/index?type=6',
    })
  },
  // 下线
  offline(){

  },
  // 上线
  online(){

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
    this.get_lists();
    this.get_info();
  },
  get_lists(){
    var t = this;
    a.get("changce/merch/line_order_list", {
        merchid: t.data.merchid,
        page:t.data.page,
        ishandle:t.data.ishandle
    }, function(a) {
      if(a.error == 0){
        console.log(a);
        t.setData({
          list: a.list
        })
      }
    })
  },
  get_info(){
    var t = this;
    a.get("changce/merch/get_detail", {
        id: t.data.merchid,
        type:1
    }, function(a) {
      if(a.error == 0){
        t.setData({
          merch: a.merch
        })
      }
    })
  },
  // 拒绝此单
  refuse(e){
    var t = this;
    let id = e.currentTarget.dataset.id;
    a.get("changce/merch/line_order_reject", {
        merchid: t.data.merchid,
        id:id
    }, function(a) {
      if(a.error == 0){
        t.get_lists();
      }
    })
  },
    // 立即接单
  receiving(){
    var t = this;
    a.get("changce/merch/get_detail", {
        id: t.data.merchid,
        type:1
    }, function(a) {
      if(a.error == 0){
        t.setData({
          merch: a.merch
        })
      }
    })
  },
      // 确认服务完成
  confirm(){
    var t = this;
    a.get("changce/merch/get_detail", {
        id: t.data.merchid,
        type:1
    }, function(a) {
      if(a.error == 0){
        t.setData({
          merch: a.merch
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