// member/collection/index.js
var t = getApp(),
    a = t.requirejs("core");
t.requirejs("jquery");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    article_lists:[],
    goods_lists:[],
    lists:[],
    aPage:1,
    gPage:1,
    current:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.get_goods_lists();
    this.get_article_lists();
  },
  get_article_lists(){  //攻略收藏
    var t = this;
    let page = t.data.aPage;
    let article_lists = t.data.article_lists;
    a.get("changce/article/get_collect_list", {
      page:page
    }, function(a) {
      if(a.error == 0){
        if(page == 1){
          article_lists = a.list;
        }else{
          article_lists.concat(a.list);
        }
        t.setData({
          article_lists:article_lists,
          triggered:false,
        })
      }
    })
  },
  get_goods_lists(){  //商品收藏
    var t = this;
    let page = t.data.aPage;
    let goods_lists = this.data.goods_lists;
    a.get("goods/get_collect_list", {
      page:page
    }, function(a) {
      if(a.error == 0){
        if(page == 1){
          goods_lists = a.list;
        }else{
          goods_lists.concat(a.list);
        }
        t.setData({
          goods_lists:goods_lists,
          triggered:false,
        })
      }
    })
  },
  changeNav(e){
    let current = e.currentTarget.dataset.id;
    console.log(current);
    this.setData({
      current:current
    })
  },
  //攻略取消收藏
  cancelArticle(e){
    let index = e.currentTarget.dataset.index;
    let lists = this.data.article_lists;
    let id = lists[index].id;
    let that = this;
    console.log(index,lists,id);
    a.get("changce/article/collect", {
      id: id
    }, function(t) {
      if(t.error == 0){ 
        lists.splice(index,1);
        that.setData({
          article_lists:lists
        })
      }

    })
  
  },
  //商品取消收藏
  cancelGoods(e){
    let index = e.currentTarget.dataset.index;
    let lists = this.data.goods_lists;
    let id = lists[index].id;
    let that =this;
    console.log(index,lists,id);
    a.get("goods/collect", {
      id:id
    }, function(res) {
        console.log(res)
        if(res.error == 0){   
          lists.splice(index,1);
          that.setData({
            goods_lists:lists
          })
        }
    })

  },
  bindrefresherrefresh(){
    console.log('下拉刷新');
    let current = this.data.current;  //1攻略收藏  2商品收藏
    if(current == 1){
      this.setData({
        aPage:1,
      })
      this.get_article_lists();
    }else{
      this.setData({
        gPage:1,
      })
      this.get_goods_lists();
    }
  },
  loadMore(){
    console.log('上拉加载');
    let current = this.data.current;  //1攻略收藏  2商品收藏
    if(current == 1){
      this.setData({
        aPage:this.data.aPage + 1,
      })
      this.get_article_lists();
    }else{
      this.setData({
        gPage:this.data.gPage + 1,
      })
      this.get_goods_lists();
    }
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