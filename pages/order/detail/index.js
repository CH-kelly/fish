var a = getApp(), t = a.requirejs("core"), e = a.requirejs("biz/order");

Page({
    data: {
        code: !1,
        consume: !1,
        store: !1,
        cancel: e.cancelArray,
        cancelindex: 0,
        diyshow: {},
        city_express_state: 0,
        textColor:'#01D6C0',
        order:{},
        goods:[],
        type:0,     //1导游订单  0商品订单
        orderid:0,
        line:{},     //线路
    },
    onLoad: function(t) {
        this.setData({
            options: t,
            type:t.type || 0,
            orderid:t.id
        }), a.url(t);
    },
    onShow: function() {
        this.get_list();
        a.getCache("isIpx") ? this.setData({
            isIpx: !0,
            iphonexnavbar: "fui-iphonex-navbar",
            paddingb: "padding-b"
        }) : this.setData({
            isIpx: !1,
            iphonexnavbar: "",
            paddingb: ""
        });
    },
    copyOrderSn(){
        let ordersn = this.data.order.ordersn || this.data.order.orderno
        getApp().copyContent(ordersn)
    },
    copyMobile(){
        let mobile = this.data.merch.mobile
        getApp().copyContent(mobile)
    },
    get_list: function() {
        var a = this;
        var type = this.data.type;
        if(type == 1){
            t.get("line/order/details", {orderid:this.data.orderid}, function(e) {
                if (0 == e.error) {
                    e.show = !0;
                    var address = {
                        province:e.order.province,
                        district:e.order.district,
                        city:e.order.city,
                        address:e.order.address,
                        realname:e.order.realname,
                        mobile:e.order.mobile
                    }
                    a.setData(e),a.setData({
                        line:e.line,
                        merch:e.merch,
                        order:e.order,
                        address:address,
                    });
                }
            });
        }else{
            t.get("order/detail", a.data.options, function(e) {
                if (e.error > 0 && (5e4 != e.error && t.toast(e.message, "loading"), wx.redirectTo({
                    url: "/pages/order/index"
                })), null != e.nogift[0].fullbackgoods) {
                    var i = e.nogift[0].fullbackgoods.fullbackratio, o = e.nogift[0].fullbackgoods.maxallfullbackallratio;
                    i = Math.round(i), o = Math.round(o);
                }
                if (0 == e.error) {
                    e.show = !0;
                    var n = Array.isArray(e.ordervirtual);
                    a.setData(e), a.setData({
                        ordervirtualtype: n,
                        fullbackgoods: e.nogift[0].fullbackgoods,
                        maxallfullbackallratio: o,
                        fullbackratio: i,
                        invoice: e.order.invoicename,
                        membercard_info: e.membercard_info,
                        order:e.order,
                        goods:e.goods,
                        address:e.address,
    
                    });
                }
            });
        }
    },
    more: function() {
        this.setData({
            all: !0
        });
    },
    code: function(a) {
        var e = this, i = t.data(a).orderid;
        t.post("verify/qrcode", {
            id: i
        }, function(a) {
            0 == a.error ? e.setData({
                code: !0,
                qrcode: a.url
            }) : t.alert(a.message);
        }, !0);
    },
    diyshow: function(a) {
        var e = this.data.diyshow, i = t.data(a).id;
        e[i] = !e[i], this.setData({
            diyshow: e
        });
    },
    close: function() {
        this.setData({
            code: !1
        });
    },
    toggle: function(a) {
        var e = t.pdata(a), i = e.id, o = e.type, n = {};
        n[o] = 0 == i || void 0 === i ? 1 : 0, this.setData(n);
    },
    phone: function(a) {
        t.phone(a);
    },
    cancel: function(a) {
        e.cancel(this.data.options.id, a.detail.value, "/pages/order/detail/index?id=" + this.data.options.id);
    },
    delete: function(a) {
        var i = t.data(a).type;
        e.delete(this.data.options.id, i, "/pages/order/index");
    },
    finish: function(a) {
        e.finish(this.data.options.id, "/pages/order/index");
    },
    refundcancel: function(a) {
        var t = this;
        e.refundcancel(this.data.options.id, function() {
            t.get_list();
        });
    },
    onShareAppMessage: function() {
        return t.onShareAppMessage();
    }
});