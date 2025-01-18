import { ajax } from '../../utils/index';
Page({

    /**
     * 页面的初始数据
     */
    data: {
      role: 0,
      name: '',
      phone: '',
      account: '',
      password: ''
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

    getAccount(e) {
      this.setData({
        account: e.detail.value
      })
    },

    getPassword(e) {
      this.setData({
        password: e.detail.value
      })
    },

    getRole(e) {
      this.setData({
        role: e.detail.value
      })
    },

    async submit() {
      const { role, name, phone, account, password } = this.data;
      console.log(this.data);
      if (name.trim().length === 0 || phone.trim().length === 0 || account.trim().length === 0 || password.trim().length === 0) {
        wx.showToast({
          title: '存在必填项未填!',
          icon: 'none'
        })
        return;
      }

      const params = {
        role, 
        name, 
        phone, 
        account, 
        password
      }

      const { data: { msg } } = await ajax('/register', 'POST', params);

      if (msg === "registered") {
        wx.showToast({
          title: '该账号已经注册!',
          icon: 'none'
        })
      } else if (msg === 'success') {
        wx.redirectTo({
          url: '../login/login',
          success: () => {
            wx.showToast({
              title: '注册成功',
            })
          }
        })
      } else {
        wx.showToast({
          title: '注册失败!',
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