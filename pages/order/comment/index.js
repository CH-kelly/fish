var t = getApp(), a = t.requirejs("core");

Page({
    data: {
        stars_class: [ "text-default", "text-primary", "text-success", "text-warning", "text-danger" ],
        stars_text: [ "差评", "一般", "挺好", "满意", "非常满意" ],
        normalSrc: "icox icox-star",
        selectedSrc: "icox icox-xing selected",
        key: -1,
        content: "",
        images: [],
        imgs: [],
        type:0,     //类型 1线路评价  2拼团评价
    },
    onLoad: function(a) {
        this.setData({
            options: a,
            type:a.type || 0
        }), t.url(a), this.get_list();
    },
    get_list: function() {
        var t = this;
        var type = this.data.type;
        let url = '';
        if(type == 1){  //线路评价
            url = "line/comment"
        }else if(type == 2){  //拼团
            url = "groups/comment"
        }else{  //商品评价
            url = "order/comment"
        }

        a.get(url, t.data.options, function(e) {
            0 == e.error ? (e.show = !0, t.setData(e)) : (a.toast(e.message, "loading"), wx.navigateBack());
        }, !0);
    },
    select: function(t) {
        var a = t.currentTarget.dataset.key;
        this.setData({
            key: a
        });
    },
    change: function(t) {
        var e = {};
        e[a.data(t).name] = t.detail.value, this.setData(e);
    },
    submit: function() {
        var t = {
            orderid: this.data.options.id,
            comments: []
        };
        if ("" == this.data.content || -1 == this.data.key) return a.alert("有未填写项目!"), !1;
        for (var e = 0, s = this.data.goods.length; e < s; e++) {
            var i = {
                goodsid: this.data.goods[e].goodsid,
                level: this.data.key + 1,
                content: this.data.content,
                images: this.data.images
            };
            t.comments.push(i);
        }
        
        let type = this.data.type;
        let url = '';
        if(type == 1){  //线路评价
            url = "line/comment/submit"
        }else if(type == 2){  //拼团
            url = "groups/comment/submit"
        }else{  //商品评价
            url = "order/comment/submit"
        }
        
        a.post(url, t, function(t) {
            0 != t.error && a.toast(t.message, "loading");
            setTimeout(() => {
                wx.navigateBack()
            }, 1000);
        }, !0);
    },
    upload: function(t) {
        var e = this, s = a.data(t), i = s.type, o = e.data.images, n = e.data.imgs, r = s.index;
        "image" == i ? a.upload(function(t) {
            o.push(t.filename), n.push(t.url), e.setData({
                images: o,
                imgs: n
            });
        }) : "image-remove" == i ? (o.splice(r, 1), n.splice(r, 1), e.setData({
            images: o,
            imgs: n
        })) : "image-preview" == i && wx.previewImage({
            current: n[r],
            urls: n
        });
    }
});