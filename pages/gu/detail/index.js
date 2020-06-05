var t = getApp(),
    a = t.requirejs("core");
t.requirejs("jquery");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current:1,
    merchid: 0,
    merch: {},
    cateid: 0,
    page: 1,
    isnew: 0,
    isrecommand: 0,
    loading: !1,
    loaded: !1,
    list: [],
    type:0, // 0：商户详情    1：导游  
    approot: t.globalData.approot,
    banner:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (t) {

    this.setData({
      merchid: t.id,
      type:t.type || 1    //1导游  0商户
  }), this.getMerch(), this.getList()
  },
  copyPhone(){
    let mobile = this.data.merch.mobile;
    console.log(mobile)
    t.copyContent(mobile)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getMerch: function() {
    var t = this;
    a.get("changce/merch/get_detail", {
        id: t.data.merchid,
        type:t.data.type
    }, function(a) {
      if(a.error == 0){
        t.setData({
          merch: a.merch,
          banner:a.merch.banner
        })
      }
    })
},
getList: function() {
    var t = this;
    a.loading(), this.setData({
        loading: !0
    }), a.get("changce/merch/goods_list", {
        page: this.data.page,
        cateid: this.data.cateid,
        id: t.data.merchid,
        isnew: this.data.isnew,
        isrecommand: this.data.isrecommand
    }, function(e) {
        var i = {
            loading: !1,
            total: e.total,
            pagesize: e.pagesize,
            list:e.list,
        };
         t.setData(i), a.hideLoading()
    })
},
  change(e){
    console.log(e);
    this.setData({
      current:e.currentTarget.dataset.id
    })
  },
  gotoLine(e){ //线路详情
    let id = e.currentTarget.dataset.id;
    let type = this.data.type;  //0商家  1导游
    let url = '';
    if(type == 1){
      url = '/pages/gu/line/index?id='+id
    }else{
      url = '/pages/goods/detail/index?id='+id;
    }
    wx.navigateTo({
      url: url,
    })
  },
  previewImage(){
    let current = this.data.merch.license || "https://lanyuyou.shengbokj.com/attachment/images/1/2020/05/q0ZsV9R0ln3397K3b97n073bp7Ks9n.jpg";
    let url = [
      "https://lanyuyou.shengbokj.com/attachment/images/1/2020/05/q0ZsV9R0ln3397K3b97n073bp7Ks9n.jpg",
      "https://lanyuyou.shengbokj.com/attachment/images/1/2020/05/q0ZsV9R0ln3397K3b97n073bp7Ks9n.jpg"
    ]
    t.previewImage(current,url)

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