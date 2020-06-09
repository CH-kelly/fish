// member/collage/index.js
var t = getApp(), a = t.requirejs("core"), e = t.requirejs("biz/order");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status:'',
    list: [],
    page: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var e = this;
    t.checkAuth(), wx.getSetting({
        success: function(s) {
            s.authSetting["scope.userInfo"] && (e.setData({
                options: a,
                status: a.status || "",
                imgUrl: t.globalData.approot
            }), t.url(a), e.get_list());
        }
    });
  },
  selected(e){
    let status = e.currentTarget.dataset.type;
    this.setData({
        list: [],
        page: 1,
        status: status
    }), this.get_list();
  },
  
  bindrefresherrefresh(){
    console.log('下拉刷新');
    this.setData({
        list: [],
        page: 1
    }), this.get_list();
  },
  loadMore(){
    console.log('上拉加载');
    let page = this.data.page + 1;
    this.setData({
      page: page
  }), this.get_list();
  },
  get_list: function() {
    var e = this;
    e.setData({
        loading: !0,
    }), a.get("groups/order", {
        page: e.data.page,
        status: e.data.status
    }, function(t) {
        0 == t.error ? (e.setData({
            loading: !1,
            show: !0,
            total: t.total,
            empty: !0,
            triggered:false,
            can_sync_goodscircle: t.can_sync_goodscircle
        }), t.list.length > 0 && e.setData({
            page: e.data.page + 1,
            list: e.data.list.concat(t.list)
        }), t.list.length < t.pagesize && e.setData({
            loaded: !0
        })) : a.toast(t.message, "loading");
    }, this.data.show);
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