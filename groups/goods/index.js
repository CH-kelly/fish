var t = getApp(), a = t.requirejs("core"), o = (t.requirejs("jquery"), t.requirejs("foxui"), 
t.requirejs("wxParse/wxParse")), e = 0;

Page({
    data: {
        goods_id: 0,
        advHeight: 1,
        current:1,
        commentEmpty: true,
        other:[],
        data:{},
        teamid:0,   //拼团id
        isTeamGroup:0,  //是否拼团  1是  0单独购买
    },
    clickNav(e){
        var id = e.currentTarget.dataset.id;
        this.setData({
            current:id
        })
    },
    teamLists(){
        let id = this.data.goods_id
        wx.navigateTo({
          url: '../team/index?id='+id,
        })
    },
    buttonOpenGroup(e){ //拼团购买
        console.log(e);
        let id = e.currentTarget.dataset.id;
        wx.navigateTo({
          url: '../join/index?id='+id,
        })
    },
    imageLoad: function(t) {
        var a = t.detail.height, o = t.detail.width, e = Math.floor(750 * a / o);
        a == o ? this.setData({
            advHeight: 750
        }) : this.setData({
            advHeight: e
        });
    },
    onLoad: function(e) {
        var i = this;
        t.getCache("isIpx") ? i.setData({
            isIpx: !0,
            iphonexnavbar: "fui-iphonex-navbar"
        }) : i.setData({
            isIpx: !1,
            iphonexnavbar: ""
        });
        var s = e.id;
        this.setData({
            goods_id: s
        }), a.post("groups.goods", {
            id: s
        }, function(t) {
            i.setData({
                data: t.data
            }), o.wxParse("wxParseData", "html", t.data.content, i, "0");
        });
    },
    fight_groups(){
        let id = this.data.goods_id
        var d = this,  e = this.data.goods_id;
        a.post("groups/goods/fight_groups", {
            id: id,
            ladder_id: '',
            limit:2
        }, function(t) {
            1 != t.error ? (d.setData({
                other: t.other
            }), setInterval(function() {
                var t = d.data.other;
                for (var a in t) {
                    var e = t[a].residualtime, o = 0, i = 0;
                    e > 60 && (i = parseInt(e / 60), e = parseInt(e % 60), 
                    i > 60 && (o = parseInt(i / 60), i = parseInt(i / 60))),
                    e < 0 && (o = 0, i = 0, e = 0, d.data.other[a].status = "hide", d.data.other = []), 
                    o<10 ? d.data.other[a].hours = '0'+o : d.data.other[a].hours = o, 
                    i<10 ? d.data.other[a].minite ='0'+i : d.data.other[a].minite = i, 
                    d.data.other[a].second = e,d.data.other[a].residualtime = d.data.other[a].residualtime - 1;
                }
                d.setData({
                    other: t
                });
            }, 1e3)) : a.alert(t.message);
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
    buy: function(t) {
        var o = this, e = (a.pdata(t).op, o.data.goods_id), i = o.data.optiondata;
        o.data.optiondata ? i.stock > 0 ? wx.navigateTo({
            url: "../confirm/index?id=" + e + "&option_id=" + i.id + " &type="+type+ "&isTeamGroup=" + o.data.isTeamGroup+ "&teamid=" + o.data.teamid,
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
    onReady: function() {},
    onShow: function() {
        this.fight_groups();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            title: this.data.data.title
        };
    },
    check: function() {}
});