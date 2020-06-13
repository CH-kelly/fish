var t = getApp(), a = t.requirejs("core"), e = t.requirejs("biz/order");

Page({
    data: {
        icons: t.requirejs("icons"),
        status: "",
        list: [],
        page: 1,
        code: !1,
        cancel: e.cancelArray,
        cancelindex: 0,
        can_sync_goodscircle: !1
    },
    onLoad: function(a) {
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
    get_list: function() {
        var e = this;
        e.setData({
            loading: !0,
        }), a.get("line/order", {
            page: e.data.page,
            status: e.data.status,
            merchid: 0
        }, function(t) {
            0 == t.error ? (e.setData({
                loading: !1,
                show: !0,
                total: t.total,
                empty: !0,
                can_sync_goodscircle: t.can_sync_goodscircle
            }), t.list.length > 0 && e.setData({
                page: e.data.page + 1,
                list: e.data.list.concat(t.list)
            }), t.list.length < t.pagesize && e.setData({
                loaded: !0,
                list: t.list
            })) : a.toast(t.message, "loading");
        }, this.data.show);
    },
    selected: function(t) {
        var e = a.data(t).type;
        this.setData({
            list: [],
            page: 1,
            status: e,
            empty: !1
        }), this.get_list();
    },
    onReachBottom: function() {
        this.data.loaded || this.data.list.length == this.data.total || this.get_list();
    },
    code: function(t) {
        var e = this, s = a.data(t).orderid;
        a.post("verify/qrcode", {
            id: s
        }, function(t) {
            0 == t.error ? e.setData({
                code: !0,
                qrcode: t.url
            }) : a.alert(t.message);
        }, !0);
    },
    // copyMobile(e){
    //     let index = e.data(t).index;
    //     let mobile = this.data.list[index].merchmobile
    //     getApp().copyContent(mobile)
    // },
    close: function() {
        this.setData({
            code: !1
        });
    },
    cancel: function(t) {
        var s = a.data(t).orderid;
        let index = t.detail.value;
        let cancel_reason = this.data.cancel[index];
        let that = this;
        that.setData({
            page:0
        })
        a.post("line/order/cancel", {
            id: s,
            cancelreason:cancel_reason
        }, function(t) {
            if(t.error == 0){
                that.get_list();
            }else{
                wx.showToast({
                  title: t.message,
                  icon:'loading'
                })
            }
        }, !0);
        // e.cancel(s, t.detail.value, "/pages/gu/order/index?status=" + this.data.status);
    },
    delete: function(t) {
        var i = a.data(t).orderid;
        var that = this;
        that.setData({
            page:0
        })
        a.post("line/order/delete", {
            id: i
        }, function(t) {
            if(t.error == 0){
                that.get_list();
            }else{
                wx.showToast({
                  title: t.message,
                  icon:'loading'
                })
            }
        }, !0);
        // e.delete(i, s, "/pages/gu/order/index", this);
    },
    finish: function(t) {
        a.data(t).type;
        var s = a.data(t).orderid;
        var that = this;
        that.setData({
            page:0
        })
        a.post("line/order/finish", {
            id: s
        }, function(t) {
            if(t.error == 0){
                that.get_list();
            }else{
                wx.showToast({
                  title: t.message,
                  icon:'loading'
                })
            }
        }, !0);
        // e.finish(s, "/pages/gu/order/index");
    },
    onShareAppMessage: function() {
        return a.onShareAppMessage();
    }
});