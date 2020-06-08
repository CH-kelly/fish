// pages/guide/line.js
var t = getApp(),
    a = t.requirejs("core"),
    e = t.requirejs("jquery");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:'',
    region: ['', '', ''],
    customItem: '全部',
    list:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    let address = t.globalData.address || '成都';
    let region = ['','',address]
    this.setData({
      address:address,
      region:region,
    })
    console.log(address,region)

    this.get_lists();
  },
  get_lists(){
    var that = this;
    a.get("line/get_list", {
     
    }, function(e) {
      console.log(e);
      if(e.error == 0){
        that.setData({
          list:e.list
        })
      }
    })
  },
  // 选择省市区
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  //线路详情
  gotoDetail(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/gu/line/index?id='+id,
    })
  },
  // 导游详情
  gotoGuDetail(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/gu/detail/index?id='+id,
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