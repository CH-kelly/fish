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
    merchid:0,
    send_out:0,
    array:[],
    index:'',
    ordersn:'',
    company:'',
    orderid:'',
  },
  onLoad: function (options) {
    this.setData({
      merchid: options.id
    });
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    let index = e.detail.value
    let company = this.data.array[index]['name']
    this.setData({
      index:index ,
      company:company
    })
  },
  inputOrderSn(e){
    this.setData({
      ordersn: e.detail.value
    })
  },
  cancel(){
    this.setData({
      send_out:0,
    })
  },
  confirm(){
    var that = this,ordersn = this.data.ordersn,company = this.data.company,orderid=this.data.orderid;
    if(!orderid){
      this.showToastMsg('请选择订单');
      return ;
    }
    if(!company){
      this.showToastMsg('请选择快递公司');
      return ;
    }
    if(!ordersn){
      this.showToastMsg('请输入快递单号');
      return ;
    }
    a.post("changce/merch/goods_order_confirm", {
      orderid: orderid,
      expresssn:ordersn,
      expresscom:company,
      sendtype:0,
    }, function(a) {
      console.log(a); 
      that.setData({
          send_out:0,
          page:1,
      })  
      that.get_lists();
    })
  },
  showToastMsg(title){
    wx.showToast({
      title: title,
      icon: 'none',
      duration: 2000
    })
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
  // 去发货
  sendOut(t){
    var that = this;
    let id = t.currentTarget.dataset.id;
    console.log(id);
    a.get("changce/merch/goods_order_send", {
      orderid: id
    }, function(a) {
      console.log(a);
      if(a.error == 0){
        that.setData({
          address:a.address,
          array:a.express_list,
          send_out:1,
          orderid:id
        })
      }
    })
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
    a.get("changce/merch/goods_order_list", {
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
        type:0
    }, function(a) {
      if(a.error == 0){
        t.setData({
          merch: a.merch
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