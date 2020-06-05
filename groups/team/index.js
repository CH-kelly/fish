
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
    this.get_goods();
    this.fight_groups();
  },
  get_goods(){
    var id = this.data.goods_id;
    var i  = this;
    a.post("groups.goods", {
        id: id
    }, function(t) {
        i.setData({
            data: t.data
        })
    });
  },
  fight_groups(){
    let id = this.data.goods_id
    let that = this;
    a.post("groups/goods/fight_groups", {
        id: id,
        ladder_id: '',
        limit:''
    }, function(t) {
        console.log(t);
        if(t.error == 0){
          that.setData({
              other:t.other  
          })
      }
    });
},
singlebuy: function(t) {    //选择规格
    var o = this;
    let isTeamGroup = t.currentTarget.dataset.is;  //是否拼团  1是  0单独购买
    let teamid = t.currentTarget.dataset.teamid;
    let type = t.currentTarget.dataset.type;    //single:单独购买     groups：参团   group:开团
    console.log(isTeamGroup,teamid,type);
    this.setData({
        teamid:teamid,
        type:type,
        isTeamGroup:isTeamGroup
    })
    a.post("groups/goods/goodsCheck", {
        id: o.data.goods_id,
        type: type
    }, function(t) {
        if (1 != t.error) if (0 == o.data.data.more_spec) wx.navigateTo({
            url: "../confirm/index?id=" + o.data.goods_id + "&type="+type+"&isTeamGroup="+isTeamGroup+"&teamid="+teamid
        }); else {
            o.setData({
                layershow: !0,
                options: !0,
                isTeamGroup:isTeamGroup
            }), o.setData({
                optionarr: [],
                selectSpecsarr: []
            });
            var e = o.data.data.id;
            a.get("groups.goods.get_spec", {
                id: e
            }, function(t) {
                o.setData({
                    spec: t.data
                });
            }), o.setData({
                layershow: !0,
                options: !0
            });
        } else a.alert(t.message);
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