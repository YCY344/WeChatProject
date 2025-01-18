const { ajax } = require("../../utils/index");

// pages/advice/advice.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    phone: '',
    content: '',
  },

  getName(e) {
    this.setData({
      name: e.detail.value
    })
  },

  getPhone(e) {
    this.setData({
      phone: e.detail.value
    })
  },

  getContent(e) {
    this.setData({
      content: e.detail.value
    })
  },

  async submit() {
    const { name, phone, content } = this.data;
    if (name.trim().length === 0 || phone.trim().length === 0 || content.trim().length === 0) {
      wx.showToast({
        title: '存在必填项未填!',
        icon: 'none'
      })
      return;
    }
    const loginInfo = wx.getStorageSync('loginInfo');
    const params = {
      user_id: loginInfo.user_id,
      openid: wx.getStorageSync('openid'),
      user_info: wx.getStorageSync('userInfo'),
      name,
      role: loginInfo.role,
      phone,
      content,
    };

    const { data } = await ajax('/add_advice', 'POST', params);

    if (data === "success") {
      wx.navigateBack({
        success: () => {
          wx.showToast({
            title: '提交成功!',
            icon: 'none'
          })
        }
      })
    } else {
      wx.showToast({
        title: '提交失败!',
        icon: 'none'
      })
    }
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