const { ajax, formatTime } = require("../../utils/index");

// 维修状态的对应关系
const statusMap = {
  1: "待处理",
  2: "已处理"
};

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabNow: 0,
    tabList: [
      {
        label: '全部',
        value: 0,
      },
      {
        label: '待处理',
        value: 1,
      },
      {
        label: '已处理',
        value: 2,
      }
    ],
    list: []
  },

  onTabsChange(e) {
    this.setData({
      tabNow: e.detail.value
    })
    this.getList(e.detail.value)
  },

  toResult(e) {
    const item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: '../adviceResult/adviceResult?info=' + JSON.stringify(item),
    })
  },

  // 获取维修列表数据
  async getList(status = 0) {
    const loginInfo = wx.getStorageSync('loginInfo')
    const params = {
      status,
      user_id: loginInfo.user_id
    };

    const { data: { result } } = await ajax('/get_advice_list', 'POST', params);
    console.log(result);
    this.setData({
      list: result.map(item => {
        return {
          ...item,
          status: statusMap[item.status],
          create_time: formatTime(new Date(item.create_time))
        }
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getList();
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