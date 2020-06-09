// member/about/index.js
var t = getApp(),
a = t.requirejs("core");
t.requirejs("jquery");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:1,
    tel:'',
    wxchat:'',
    description:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let type = options.type || 1;
    this.setData({
      type:type
    })
    this.get_set();
  },
  copyPhone(){
    wx.setClipboardData({
      data: '0862-8565444',
      success (res) {
        wx.getClipboardData({
          success (res) {
            console.log(res.data) // data
          }
        })
      }
    })
  },
  copyWx(){
    wx.setClipboardData({
      data: 'wo1856548',
      success (res) {
        wx.getClipboardData({
          success (res) {
            console.log(res.data) // data
          }
        })
      }
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
    let type = this.data.type;
    if(type == 1){
      wx.setNavigationBarTitle({
        title: '联系我们',
      })
    }else{
      wx.setNavigationBarTitle({
        title: '关于我们',
      })
    }
  },
  get_set(){
    var t = this;
    a.get("shop/get_set", {}, function(a) {
      if(a.error == 0){
        let shop = a.sets.shop;
        console.log(shop)
        t.setData({
          tel:shop.tel,
          wxchat:shop.wxchat,
          description:shop.description
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