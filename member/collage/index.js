// member/collage/index.js
var t = getApp(), e = t.requirejs("core"), a = (t.requirejs("jquery"), t.requirejs("biz/diyform"), 
t.requirejs("biz/goodspicker"), t.requirejs("foxui"), t.requirejs("biz/group_order"));

Page({

  /**
   * 页面的初始数据
   */
  data: {
    status:'',
    list: [],
    page: 1,
    
    cancel: a.cancelArray
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    t.getCache("isIpx") ? this.setData({
      isIpx: !0,
      iphonexnavbar: "fui-iphonex-navbar"
    }) : this.setData({
        isIpx: !1,
        iphonexnavbar: ""
    }), this.setData({
        options: e
    }), this.get_list();
  },
  selected(e){
    let status = e.currentTarget.dataset.type;
    console.log(status);
    this.setData({
        list: [],
        page: 1,
        status: status
    }), this.get_list();
  },
  copyOrderNo(key){
    console.log(key);
    let index = key.currentTarget.dataset.index;
    let sn = this.data.list[index].orderno;
    wx.setClipboardData({
      data: sn,
      success (res) {
        wx.getClipboardData({
          success (res) {
            console.log(res.data) // data
          }
        })
      }
    })
  },
  get_list: function() {
    var that = this;
    that.setData({
        loading: !0,
    }), e.get("groups/order", {
        page: that.data.page,
        status: that.data.status
    }, function(t) {
        0 == t.error ? (that.setData({
            loading: !1,
            show: !0,
            total: t.total,
            empty: !0,
            triggered:false,
            can_sync_goodscircle: t.can_sync_goodscircle
        }), t.list.length > 0 && that.setData({
            page: that.data.page + 1,
            list: that.data.list.concat(t.list)
        }), t.list.length < t.pagesize && that.setData({
            loaded: !0
        })) : a.toast(t.message, "loading");
    }, this.data.show);
},
finish: function(t) {
  var a = this, i = t.target.dataset.orderid;
  e.confirm("是否确认收货", function() {
      e.get("groups/order/finish", {
          id: i
      }, function(t) {
          0 == t.error ? a.get_list(!0) : e.alert(t.result.message);
      });
  });
},
cancel: function(t) {
  var e = t.target.dataset.orderid;
  console.log(e);
  a.cancel(e, t.detail.value, "/groups/order_detail/index?order_id=" + e);
},
delete_: function(t) {
  var a = this, i = t.target.dataset.orderid;
  e.confirm("是否确认删除", function() {
      e.get("groups/order/delete", {
          id: i
      }, function(t) {
          0 == t.error ? a.get_list() : e.alert(t.result.message);
      });
  });
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
  this.get_list();
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