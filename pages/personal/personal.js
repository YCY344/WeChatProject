// pages/personal/personal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wxLogin: false,
    userInfo: {}
  },

  toGetInfo() {
    const { wxLogin } = this.data;
    if (!wxLogin) {
      wx.navigateTo({
        url: '../getInfo/getInfo',
      })
    }
  },

  quitLogin() {
    wx.removeStorageSync('loginInfo');
    wx.removeStorageSync('userInfo');
    wx.removeStorageSync('wxLogin');
    wx.removeStorageSync('openid');
    wx.redirectTo({
      url: '../login/login',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    const wxLogin = wx.getStorageSync('wxLogin');
    const userInfo = wx.getStorageSync('userInfo');
    this.setData({
      wxLogin,
      userInfo
    })
  },
  handleClick() {  
    // 使用 wx.navigateTo 跳转到页面  
    wx.navigateTo({  
        url: '/pages/aicustomerservice/aicustomerservice' // 不要加 .wxml 后缀  
    });  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})