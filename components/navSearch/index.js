// components/navSearch/index.js
var i = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    address:'',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getlocation(){
      var that = this;
      wx.getLocation({
        type: 'wgs84',
        success (res) {
          const latitude = res.latitude
          const longitude = res.longitude
          const url = "https://apis.map.qq.com/ws/geocoder/v1/?location="+latitude+","+longitude+"&key=O2GBZ-ELSKW-VOHRL-O3J4X-AKR6K-CZFBP&get_poi=1"
          wx.request({
            url: url,
            success(res){
              if(res.statusCode == 200){
                let address = res.data.result.address_component.city;
                i.globalData.city = address;
                i.globalData.lat = latitude,i.globalData.lng = longitude
                that.setData({
                  address:address,
                })
              }
            }
          })
        }
       })
    }
  },
  attached:function(){
    let city = i.globalData.city;
    console.log(city)
    if(city == ''){
      this.getlocation();
    }else{
      this.setData({
        address:city,
      })
    }
  }
})
