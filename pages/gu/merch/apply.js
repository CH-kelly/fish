var t = getApp(),
    a = t.requirejs("core"),
    e = t.requirejs("jquery"),
    i = t.requirejs("foxui");
Page({
    data: {
        category:[],
        cateName:'',
        cateId:0,
        index:0,
        region: ['请选择', '', ''],
        error1:0,
        error2:0,
        error3:0,
        error4:0,
        error5:0,
        error6:0,
        error7:0,
        error8:0,
        error10:0,
        province:'',    //省
        city:'',       //区
        district:'',
        merchname:'',
        unama:"",
        upass:"",
        realname:"",
        mobile:"",
        salecate:'',
        address:'',
        // license:'http://lanyuyou.shengbokj.com/attachment/images/1/2020/06/BHR0QSmM9iRS0r7hQq5GnHuq7S7sgx.png',
        license:'',     //导游资格证
        desc:'',
        errmsg:"",
        descNumber:0,
        agreen:0,   //是否同意商家入驻规则
        // logo:'http://lanyuyou.shengbokj.com/attachment/images/1/2020/06/dLrQ8Rr5z05WRbol0f2eH8200okRfr.jpg',
        logo:'',     //导游个人
        banner:[],  //轮播图

        applytitle:'',
        applycontent:'',
        myuser:{}
    },
    onShow: function() {
    },
    onReady(){
        this.getData()
    },
    copyLoginUrl(){
        let url = this.data.myuser.loginurl;
        t.copyContent(url)
    },
    copyUname(){
        let uname = this.data.myuser.uname || this.data.reg.uname;
        t.copyContent(uname)
    },
    bindPickerChange: function(e) {     //商户分类
        console.log(e)
        let index = e.detail.value
        let cateName = this.data.category[index].catename;
        let cateId = this.data.category[index].id;
        this.setData({
            index: index,
            cateName:cateName,
            cateId:cateId
        })
    },
    inputmerchname(e){
        this.setData({
            merchname:e.detail.value
        })
    },
    inputunama(e){
        this.setData({
            unama:e.detail.value
        })
    },
    inputupass(e){
        this.setData({
            upass:e.detail.value
        })
    },
    inputChangerealname(e){
        this.setData({
            realname:e.detail.value
        })
    },
    inputChangemobile(e){
        this.setData({
            mobile:e.detail.value
        })
    },
    inputChangesalecate(e){
        this.setData({
            salecate:e.detail.value
        })
    },
    inputChangeaddress(e){
        this.setData({
            address:e.detail.value
        })
    },
    inputChangedesc(e){
        let desc = e.detail.value;
        let descNumber = desc.length;
        this.setData({
            desc:desc,
            descNumber:descNumber
        })
    },
    readRule(){
        let that = this;
        wx.showModal({
            title: that.data.applytitle,
            content:  that.data.applycontent,
            success (res) {
                if (res.confirm) {
                    that.setData({
                        agreen:1
                    })
                } else if (res.cancel) {
                }
            }
            })
    },
    hookRule(){
        this.setData({
            agreen: this.data.agreen == 1? 0 : 1
        })
    },
    bindRegionChange: function (e) {    //地址选择
        console.log('picker发送选择改变，携带值为', e.detail.value)
        let region = e.detail.value;
        this.setData({
          region: region,
          province:region[0],
          city:region[1],
          district:region[2],
        })
    },
    getData: function() {
        var t = this;
        a.get("changce/merch/apply", {type:1}, function(e) {
            if(e.error == 0){
                let id = e.reg.cateid  || 0;
                if(e.category && id){
                    let cate =  e.category;
                    let category =cate.find(item=>{
                        return item.id == id;
                    }) 
                    if(category){
                        t.setData({
                            cateName:category.catename|| '',
                            cateId:category.id,
                        })
                    }
                }
                if(e.reg.merchname){

                    let desc = e.reg.desc || 0;
                    console.log(desc);
                    t.setData({
                        category:e.category,
                        applytitle:e.apply_set.applytitle,
                        applycontent:e.set.applycontent,
                        myuser:e.myuser,
                        descNumber:desc.length  || 0,
                        
                        desc:e.reg.desc || '',
                        district:e.reg.district || '',
                        city:e.reg.city || '',
                        province:e.reg.province || '',
                        merchname:e.reg.merchname || '',
                        mobile:e.reg.mobile || '',
                        realname:e.reg.realname || '',
                        salecate:e.reg.salecate || '',
                        unama:e.reg.uname || '',
                        address:e.reg.address || '',
                        license:e.reg.license || '',
                        logo:e.reg.logo || '',
                        banner:e.reg.banner || [],
                        region:[e.reg.province || '全部',e.reg.city || '',e.reg.district || '']

                    })
                
                }
            }
            1 == e.canapply ? (e.show = !0, t.setData(e)) : a.alert(e.message)
            
        }, !1, !0)
    },
    typeChange: function(t) {
        var a = t.detail.value,
            e = this.data.type_array[a].type;
        this.setData({
            applytype: e,
            applyIndex: a
        })
    },
    bankChange: function(t) {
        var a = t.detail.value;
        this.setData({
            bankIndex: a
        })
    },
    inputChange: function(t) {
        var a = this.data.reg,
            i = t.currentTarget.dataset.type,
            s = e.trim(t.detail.value);
        a[i] = s, this.setData({
            reg: a
        })
    },
    uploadImage(){  //上传logo图片
        var that = this;
        a.upload((res)=>{
           that.setData({
               logo:res.url
           })
        })
    },
    uploadImage1(){  //上传营业执照
        var that = this;
        a.upload((res)=>{
           that.setData({
                license:res.url
           })
        })
    },
    uploadBanner(){
        var that = this;
        let banner = [];
        a.uploadMultigraph((res)=>{
            banner.push(res)
            that.setData({
                banner:banner
            })
        })
    },
    submit: function() {
        var e = this,
            s = this.data;
        if (s.canapply && !s.isSubmit) {
            if (!s.cateName){
                e.setData({error1:1}); 
                return void i.toast(e, "请选择商户分类"); //商户分类
            } 
            if (!e.data.merchname){
                e.setData({error1:0,error2:1});  //商户名称
                return void i.toast(e, "请输入昵称"); 
            } 
            console.log(e.data.unama,!e.data.unama);
            if (!e.data.unama){
                e.setData({error1:0,error2:0,error3:1}); 
                return void i.toast(e, "请输入后台登录账户"); 
            }else{
                if(t.checkChinese(e.data.unama) == false){
                    return void i.toast(e, "账户不能有中文字符"); 
                }
            }
            if (!e.data.upass){
                 e.setData({error1:0,error2:0,error3:0,error4:1});
                return void i.toast(e, "请输入后台登录密码"); 
            } else{
                
                if(t.checkChinese(e.data.upass) == false){
                    return void i.toast(e, "登录密码不能有中文字符"); 
                }
            }
            if (!e.data.realname){
                 e.setData({error1:0,error2:0,error3:0,error4:0,error5:1}); 
                return void i.toast(e, "请输入姓名"); 
            } 

            if (!e.data.mobile){
                 e.setData({error1:0,error2:0,error3:0,error4:0,error5:0,error6:1}); 
                return void i.toast(e, "请输入手机号"); 
            }else{
                if (!/^1(3|4|5|7|8|9)\d{9}$/.test(e.data.mobile)){
                    return void i.toast(e, "请输入正确的手机号"); 
                }
            }
            if (!e.data.province || !e.data.city) {
                 e.setData({error1:0,error2:0,error3:0,error4:0,error5:0,error6:0,error7:1}); 
                return void i.toast(e, "请选择服务城市"); 
            }
            if (!e.data.logo){
                e.setData({error1:0,error2:0,error3:0,error4:0,error5:0,error6:0,error7:0,error8:1}); 
               return void i.toast(e, "请上传本人照片"); 
           }
           if (!e.data.license){
                e.setData({error1:0,error2:0,error3:0,error4:0,error5:0,error6:0,error7:0,error8:0,error9:1,}); 
                return void i.toast(e, "请上传导游资格图片"); 
            }
            
           if (!e.data.banner){
                e.setData({error1:0,error2:0,error3:0,error4:0,error5:0,error6:0,error7:0,error8:0,error9:0,error10:0,error12:1}); 
                return void i.toast(e, "请上传详情轮播图"); 
            }
            if (!e.data.desc){
                 e.setData({error1:0,error2:0,error3:0,error4:0,error5:0,error6:0,error7:0,error8:0,error9:0,error10:0,error11:1}); 
                 e.setData({
                    errmsg:'请输入个人简介'
                 })
                return void i.toast(e, "请输入个人简介"); 
            }else{
                if(e.data.descNumber < 40 ){
                    e.setData({
                        errmsg:'个人简介需要大于40个字符'
                    })
                    return void i.toast(e, "个人简介需要大于40个字符"); 
                }
            }
            if (!e.data.agreen){
                 e.setData({error1:0,error2:0,error3:0,error4:0,error5:0,error6:0,error7:0,error8:0,error9:0,error10:1,error11:0,error12:0}); 
                return void i.toast(e, "请同意导游入驻规则"); 
            }

            console.log(e.data.reg);
            a.confirm("确认要提交申请吗？", function() {
                let data = {
                    type:1,
                    uname:e.data.unama,
                    upass:s.upass,
                    cateid:s.cateId,
                    realname:s.realname,
                    mobile:s.mobile,
                    merchname:s.merchname,
                    logo:s.logo,
                    license:s.license,
                    salecate:s.salecate,
                    desc:s.desc,
                    province:s.province,
                    city:s.city,
                    district:s.district,
                    address:s.address,
                    banner:e.data.banner
                }
                console.log(data);
                e.setData({
                    isSubmit: !0,
                    error1:0,error2:0,error3:0,error4:0,error5:0,error6:0,error7:0,error8:0,error9:0,error10:0,error11:0,error12:0,
                }), a.post("changce/merch/apply",data, function(t) {
                    console.log(t);
                    if (1 != t.status) return i.toast(e, t.result.message), void e.setData({
                        isSubmit: !1
                    });
                    i.toast(e, "申请成功，请等待审核！"), setTimeout(function() {
                        // wx.navigateBack()
                        wx.navigateTo({
                          url: '/pages/gu/success/index?type=3',
                        })
                    }, 2e3)
                }, !0, !0)
            })
        }
    },
    confirmjoin: function(t) {
        var e = this,
            s = this.data;
        s.isSubmit || (e.setData({
            isSubmit: !0
        }), a.post("changce/merch/confirmjoin", s.reg, function(t) {
            if (1 != t.status) return i.toast(e, t.result.message), void e.setData({
                isSubmit: !1
            });
            i.toast(e, "入驻成功！"), setTimeout(function() {
                wx.navigateBack()
            }, 2e3)
        }, !0, !0))
    }
});