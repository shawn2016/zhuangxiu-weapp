var con = require("../../../utils/data.js");
var app = getApp()
// pages/decor/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: [], // 内部导航数据
    list: [], // 幻灯片数据
    galler: [] // 推荐数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 获取幻灯片数据
    wx.request({
      url: con.hospital_getslide,
      method: 'GET',
      data: { wxappid: con.wyy_user_wxappid },
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        console.log(res.data.info);
        that.setData({
          list: res.data.info
        })
        app.getUserInfo();
      }

    });

    // 获取内部导航数据
    wx.request({
      url: con.hospital_gettype,
      method: 'GET',
      data: { wxappid: con.wyy_user_wxappid, count: 4 },
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        console.log(res.data.info);
        that.setData({
          type: res.data.info
        })
      }

    });

    // 获取推荐介绍数据
    wx.request({
      url: con.hospital_getphotogroup,
      method: 'GET',
      data: { wxappid: con.wyy_user_wxappid, count: 4 },
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        // console.log(res.data.info);
        that.setData({
          galler: res.data.info
        })
      }
    });

  },
  bindType: function (e) {
    console.log(e.currentTarget.dataset.id);
    var len = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../article/article?id=' + len,
    });
  },
  bindgaller: function (e) {
    var len = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../gallerItem/gallerItem?id=' + len,
    })
  },
  // 转发
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '装修公司',
      path: '/page/user?id=123',
      success: function (res) {
        console.log("000000",res)
        // 转发成功
      },
      fail: function (res) {
        console.log(res)
        // 转发失败
      }
    }
  }
})