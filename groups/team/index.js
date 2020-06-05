
var t = getApp(), a = t.requirejs("core"), o = (t.requirejs("jquery"), t.requirejs("foxui"), 
t.requirejs("wxParse/wxParse")), e = 0;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods_id:0,
    other:[],
    teamid:0,
    type:'',
    isTeamGroup:''
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
close: function() {
    this.setData({
        layershow: !1,
        options: !1
    });
},
specsTap: function(t) {
    e++;
    var o = this, i = o.data.spec, s = a.pdata(t).spedid, n = a.pdata(t).id, d = a.pdata(t).specindex;
    a.pdata(t).idx;
    i[d].item.forEach(function(t, a) {
        t.id == n ? i[d].item[a].status = "active" : i[d].item[a].status = "";
    }), o.setData({
        spec: i
    });
    var r = o.data.optionarr, p = o.data.selectSpecsarr;
    1 == e ? (r.push(n), p.push(s)) : p.indexOf(s) > -1 ? r.splice(d, 1, n) : (r.push(n), 
    p.push(s)), o.data.optionarr = r, o.data.selectSpecsarr = p, a.post("groups.goods.get_option", {
        spec_id: o.data.optionarr,
        groups_goods_id: o.data.goods_id
    }, function(t) {
        o.setData({
            optiondata: t.data
        });
    });
},
buy: function(t) {  //规格选择-确定按钮
    var o = this, e = (a.pdata(t).op, o.data.goods_id), i = o.data.optiondata;
    o.data.optiondata ? i.stock > 0 ? wx.navigateTo({
        url: "../confirm/index?id=" + e + "&option_id=" + i.id + " &type="+o.data.type+ "&isTeamGroup=" + o.data.isTeamGroup+ "&teamid=" + o.data.teamid,
        success: function() {
            o.setData({
                layershow: !1,
                chosenum: !1,
                options: !1
            });
        }
    }) : wx.showToast({
        title: "库存不足",
        icon: "none",
        duration: 2e3
    }) : wx.showToast({
        title: "请选择规格",
        icon: "none",
        duration: 2e3
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