// pages/getInfo/getInfo.js
import { ajax } from '../../utils/index';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0",
    nickName: ""
  },

  getAvatar(e) {
    const { avatarUrl } = e.detail;
    console.log(e);
    this.setData({
      avatarUrl
    })
  },

  getNickName(e) {
    const { detail: { value } } = e;

    this.setData({
      nickName: value
    })
  },

  async submit() {
    const { avatarUrl, nickName } = this.data;

    if (!avatarUrl || !nickName) {
      wx.showToast({
        title: '您还有信息未填写!',
        icon: 'none'
      })

      return;
    }

    const userInfo = {
      avatarUrl,
      nickName
    };
    // 将用户信息同步存储到本地存储中，键名为 'userInfo'
    wx.setStorageSync('userInfo', userInfo);
    // 将微信登录状态同步存储到本地存储中，键名为 'wxLogin'，值为 true 表示已登录
    wx.setStorageSync('wxLogin', true);
    wx.switchTab({
      url: '../personal/personal',
      success: () => {
        wx.showToast({
          title: '授权成功!',
        })
      }
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