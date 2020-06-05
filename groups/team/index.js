
var t = getApp(), a = t.requirejs("core"), o = (t.requirejs("jquery"), t.requirejs("foxui"), 
t.requirejs("wxParse/wxParse")), e = 0;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods_id:0,
    other:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      goods_id:options.id || 0
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
    this.fight_groups();
  },
  fight_groups(){
    let id = this.data.goods_id
    let that = this;
    a.post("groups.goods.fight_groups", {
        id: id,
        ladder_id: ''
    }, function(t) {
        console.log(t);
        if(t.error == 0){
          that.setData({
              other:t.other  
          })
      }
    });
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