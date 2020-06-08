// pages/guide/index.js
var t = getApp(),
    a = t.requirejs("core"),
    e = t.requirejs("jquery");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cates: [],
    cateid: 0,
    current:-1,
    page: 1,
    loading: !1,
    loaded: !1,
    list: [],
    keyword: "",
    disopt: [],
    range: 0,
    isrecommand:1,
    approot: t.globalData.approot,
    lat:t.globalData.lat,
    lng: t.globalData.lng
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  getList: function() {
      var t = this;
      let isrecommand = this.data.isrecommand;
      a.loading(), this.setData({
          loading: !0
      }), a.get("changce/merch/get_list", {
          type:1,
          isrecommand:isrecommand,
          page: this.data.page,
          cateid: this.data.cateid,
          keyword: this.data.keyword,
          lat: this.data.lat,
          lng: this.data.lng,
          range: this.data.range
      }, function(e) {
          var i = {
              loading: !1,
              total: e.total,
              pagesize: e.pagesize,
              cates: e.cates,
              disopt: e.disopt,
              triggered:false,
          };
          console.log(t.data.page,t.data.page == 1)
          if(t.data.page == 1){
              i.list = e.list;
              t.setData(i);
              a.hideLoading();
          }else{
              
              e.list.length > 0 && (i.page = t.data.page + 1, i.list = t.data.list.concat(e.list), e.list.length < e.pagesize && (i.loaded = !0), t.setSpeed(e.list)),t.setData(i),a.hideLoading();

          }
           
      })
  },
  gotoDetail(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/gu/line/index?id='+id,
    })
  },
  clickTitle(e){
    let id = e.currentTarget.dataset.id;
    let isrecommand = (id == "-1" )? 1 : 0
    console.log(id,isrecommand)
    this.setData({
        cateid:(id == "-1" )? 0 : id,
        page:1,
        current:id,
        isrecommand:isrecommand
    })
    this.getList();
},
// 下拉刷新
bindrefresherrefresh(){
    console.log('下拉');
    var that = this;
    that.setData({
        page:1
    })
    that.getList()
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
    that.getList()
},
  gotoMore(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/gu/detail/index?id='+id,
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
    this.getList();
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