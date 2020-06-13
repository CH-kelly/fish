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
    page:1,
    city:[],
    cates:[],
    cateid:'',  //分类id
    current:-1,  //分类id

    CateIndex:-1,
    cityName:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let address = t.globalData.address || '成都';
    let region = ['','',address]
    let keywords = options.keywords || ''
    this.setData({
      address:address,
      cityName:address,
      region:region,
      keywords:keywords,
    })
    console.log(address,region,keywords)

    this.get_lists();
    this.get_city();
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
  get_lists(){
    var that = this;
    a.post("line/get_list",{
      city:this.data.cityName,
      cateid:this.data.cateid,
      keywords:this.data.keywords
    },function(e) {
      if(e.error == 0){
        that.setData({
          list:e.list,
          cates:e.cates
        })
      }
    })
  },
  get_city(){
    var that = this;
    let page = this.data.page;
    a.post("line/get_city", {
      page:page,
      pagesize:20
    }, function(e) {
      console.log(e);
      if(e.error == 0){
        that.setData({
          city:e.list
        })
      }
    })
  },
  // 选择省市区
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    let region = e.detail.value;
    let cityName = region[1];
    this.setData({
      region: region,
      cityName:cityName
    })
    
    this.get_lists();
  },
  changeNav(e){
    let index = e.currentTarget.dataset.index;
    let id = e.currentTarget.dataset.id;
    this.setData({
      current:index,
      cateid:id,
    })
    
    this.get_lists();
  },
  changeCate(e){
    let index = e.currentTarget.dataset.index;
    let cityName = this.data.city[index].city;
    this.setData({
      CateIndex:index,
      cityName:cityName,
    })
    
    this.get_lists();
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