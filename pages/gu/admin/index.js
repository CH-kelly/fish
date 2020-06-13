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
    page:1,
    merch: {},
    merchid:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      merchid: options.id
    });
  },
  copyPhone(e){
    let mobile = e.currentTarget.dataset.mobile
    console.log(mobile)
    t.copyContent(mobile)
  },
  clickNav(e){
    let id = e.currentTarget.dataset.id
    this.setData({
      current:id,
      page:1,
      list:[],
    })
    this.get_lists();
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
  // 下线/上线
  offline(){
      // cahngce/merch/change_on_line
      var t = this;
      a.get("changce/merch/change_on_line", {
          id: t.data.merchid,
      }, function(a) {
        if(a.error == 0){
          t.get_info();
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
    this.get_lists();
    this.get_info();
  },
  get_lists(){
    var t = this;
    let list = t.data.list;
    a.get("changce/merch/line_order_list", {
        merchid: t.data.merchid,
        page:t.data.page,
        status:t.data.current
    }, function(a) {
      if(a.error == 0){
        console.log(a);
        if(t.data.page == 1){
          list = a.list
        }else{
          list.push(...a.list)
        }
        t.setData({
          list: list,
          triggered:false,
        })
      }
    })
  },
  // 下拉刷新
  bindrefresherrefresh(){
    console.log('下拉');
    var that = this;
    that.setData({
        page:1
    })
    that.get_lists()
  },
/**
 * 页面上拉触底事件的处理函数
 */
loadMore: function () {
    let page = this.data.page + 1;
    let that = this;
    that.setData({
        page:page
    })
    that.get_lists()
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
    let type = e.currentTarget.dataset.type;  // 1拒绝接单   2立即接单  3确认服务完成
    let url = '';
    if(type == 1){
      url = "line_order_reject";
    }else if(type == 2){
      url = "line_order_taking";
    }else if(type == 3){
      url = "line_order_confirm";
    }
    a.get("changce/merch/"+url, {
        merchid: t.data.merchid,
        orderid:id
    }, function(a) {
      if(a.error == 0){
        wx.showToast({
          title: '修改完成',
        })
        t.setData({
          page:1,
        })
        if(type == 2){
          wx.navigateTo({
            url: '/pages/gu/success/index?type=5',
          })
        }else if(type == 3){
          wx.navigateTo({
            url: '/pages/gu/success/index?type=6',
          })
        }else{
          t.get_lists();
        }
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