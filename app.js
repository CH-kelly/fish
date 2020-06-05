var e = require("utils/core.js");

App({
    onShow: function() {
        var t = this;
        this.onLaunch();
        try {
            "" != this.getCache("userinfo_id") && e.get("member", {}, function(e) {
                t.setCache("userinfo_id", e.id);
            });
        } catch (e) {}
    },
    onLaunch: function() {
        var e = this;
        wx.getSystemInfo({
            success: function(t) {
                "0" == t.model.indexOf("iPhone X") ? e.setCache("isIpx", t.model) : e.setCache("isIpx", "");
            }
        });
        var t = this;
        wx.getSystemInfo({
            success: function(e) {
                wx.setStorageSync("systemInfo", e);
                var a = e.windowWidth, i = e.windowHeight;
                t.globalData.ww = a, t.globalData.hh = i;
            }
        });
    },
    checkAuth: function(t) {
        var a = "/pages/auth/index", i = getCurrentPages(), n = i[i.length - 1], o = {
            params: n.options || null,
            url: n.route
        };
        if (o.params.hasOwnProperty("scene")) {
            var s = {}, r = decodeURIComponent(o.params.scene).split("&").shift().split("=");
            s.id = r[1], o.params = s;
        }
        this.setCache("routeData", o);
        this.getCache("userinfo");
        wx.getSetting({
            success: function(i) {
                i.authSetting["scope.userInfo"] ? (e.get("member", {}, function(e) {
                    e.error && wx.navigateTo({
                        url: a
                    });
                }), t && t()) : wx.navigateTo({
                    url: a
                });
            }
        });
    },
    requirejs: function(e) {
        return require("utils/" + e + ".js");
    },
    getConfig: function() {
        if (null !== this.globalData.api) return {
            api: this.globalData.api,
            approot: this.globalData.approot,
            appid: this.globalData.appid
        };
        var e = wx.getExtConfigSync();
        return this.globalData.api = e.config.api, this.globalData.approot = e.config.approot, 
        this.globalData.appid = e.config.appid, e.config;
    },
    getCache: function(e, t) {
        var a = +new Date() / 1e3, i = "";
        a = parseInt(a);
        try {
            (i = wx.getStorageSync(e + this.globalData.appid)).expire > a || 0 == i.expire ? i = i.value : (i = "", 
            this.removeCache(e));
        } catch (e) {
            i = void 0 === t ? "" : t;
        }
        return i = i || "";
    },
    setCache: function(e, t, a) {
        var i = +new Date() / 1e3, n = !0, o = {
            expire: a ? i + parseInt(a) : 0,
            value: t
        };
        try {
            wx.setStorageSync(e + this.globalData.appid, o);
        } catch (e) {
            n = !1;
        }
        return n;
    },
    removeCache: function(e) {
        var t = !0;
        try {
            wx.removeStorageSync(e + this.globalData.appid);
        } catch (e) {
            t = !1;
        }
        return t;
    },
    close: function() {
        this.globalDataClose.flag = !0, wx.reLaunch({
            url: "/pages/index/index"
        });
    },
    getSet: function() {
        var t = this;
        "" == t.getCache("cacheset") && setTimeout(function() {
            var a = t.getCache("cacheset");
            e.get("cacheset", {
                version: a.version
            }, function(e) {
                e.update && t.setCache("cacheset", e.data);
            });
        }, 10);
    },
    url: function(e) {
        e = e || {};
        var t, a, i = {}, n = this.getCache("usermid");
        for (var o in t = e.mid || "", a = e.merchid || "", n) void 0 !== n[o] && (i[o] = n[o]);
        "" != n ? ("" != n.mid && void 0 !== n.mid || (i.mid = t), "" != n.merchid && void 0 !== n.merchid || (i.merchid = a)) : (i.mid = t, 
        i.merchid = a), this.setCache("usermid", i);
    },
    impower: function(e, t, a) {
        wx.getSetting({
            success: function(i) {
                i.authSetting["scope." + e] || wx.showModal({
                    title: "用户未授权",
                    content: "您点击了拒绝授权，暂时无法" + t + "，点击去设置可重新获取授权喔~",
                    confirmText: "去设置",
                    success: function(e) {
                        e.confirm ? wx.openSetting({
                            success: function(e) {}
                        }) : "route" == a ? wx.switchTab({
                            url: "/pages/index/index"
                        }) : "details" == a || wx.navigateTo({
                            url: "/pages/index/index"
                        });
                    }
                });
            }
        });
    },
    globalDataClose: {
        flag: !1
    },
    checkChinese(text){ //验证输入的是否存在中文名
        if(/[\u4e00-\u9fa5]+/i.test(text)){
            return false
        }else{
            return true
        }
    },
    copyContent(content){   //复制文本内容
        wx.setClipboardData({
            data: content,
            success (res) {
              wx.getClipboardData({
                success (res) {
                  console.log(res.data) // data
                }
              })
            }
          })
    },
    // 格式化倒计时
    getDownTimer(timer) {
        if (timer < 60 && timer > 10) {
          return "00:00:" + timer;
        }
        if (timer < 10) {
          return "00:00:0" + timer;
        }
        let hour1, minute1;
        let hour = String(parseInt(timer / 3600));
  
        if (hour.length < 2) {
          hour1 = "0" + hour;
        } else {
          hour1 = hour;
        }
  
        let minute = String(parseInt((timer - hour * 3600) / 60));
        if (minute.length < 2) {
          minute1 = "0" + minute;
        } else {
          minute1 = minute;
        }
  
        let second = String(timer - hour * 3600 - minute * 60);
        if (second.length < 2) {
          second = "0" + second;
        }
        return hour1 + ":" + minute1 + ":" + second;
    },
    previewImage(current,urls){
        wx.previewImage({
            current: current, // 当前显示图片的http链接
            urls:urls // 需要预览的图片http链接列表
        })
    },
    globalData: {
        // appid: "wx514805c34eda2257",
        appid: "wx5bfe0aa749c1a14b",
    //   api: "https://www.efwww.com/app/ewei_shopv2_api.php?i=1",
    //   approot: "https://www.efwww.com/addons/ewei_shopv2/",
      
      api: "https://lanyuyou.shengbokj.com/app/ewei_shopv2_api.php?i=1",
      approot: "https://lanyuyou.shengbokj.com/addons/ewei_shopv2/",
    userInfo: null,
    isgoods: false,
    city:'',
    lat:'',
    lng:''
    }
});