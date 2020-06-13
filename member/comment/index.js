// member/comment/index.js
var t = getApp(), a = t.requirejs("core"), e = t.requirejs("biz/order");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    status:1,
    lists:[],

  },
  selected: function(t) {
    var e = a.data(t).type;
    this.setData({
      lists:[],
      status:e,
    });
    this.get_lists();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
  },
  get_lists(){
    var that = this;
    a.get("comment/get_list", {
      type:that.data.status
    }, function(t) {
        console.log(t);
        if(t.error == 0){
          that.setData({
            lists:t.list
          })
        }
    });
  },
  preview: function(t) {
      wx.previewImage({
          current: t.currentTarget.dataset.src,
          urls: t.currentTarget.dataset.urls
      });
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