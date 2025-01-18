//引入了自定义的 ajax 方法用于发送请求，以及 formatTime 方法用于格式化时间
const { ajax, formatTime } = require("../../utils/index");

// 维修状态的对应关系
const statusMap = {
  0: "待维修",
  1: "待处理",
  2: "处理中",
  3: "已完成"
};

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabNow: 0,
    tabList: [
      {
        label: '待维修',
        value: 0,
      },
      {
        label: '待处理',
        value: 1,
      },
      {
        label: '处理中',
        value: 2,
      },
      {
        label: '已完成',
        value: 3
      }
    ],
    list: [],
    isWorker: false,//确认是否是维修工
    showStartModal: false,
    showFinishModal: false,
    desc: '',
    img_url: ''
  },

  viewResult(e) {
    const item = e.currentTarget.dataset.item;
    const { status } = item;
    console.log(item);
    if (status === "已完成") {
      wx.navigateTo({
        url: `../repairResult/repairResult?info=${JSON.stringify(item)}`,
      })
    }
  },

  uploadImg() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      maxDuration: 30,
      camera: 'back',
      success: (res) => {
        console.log(res);
        wx.uploadFile({
          filePath: res.tempFiles[0].tempFilePath,
          name: 'file',
          url: 'http://localhost:3000/upload_file',
          success: (res) => {
            console.log(res);
            const { data } = res;
            const { path } = JSON.parse(data)[0];
            const _path = path.split('\\');
            this.setData({
              img_url: `http://localhost:3000/${_path[0]}/${_path[1]}`
            })
          }
        })
      }
    })
  },

  getDesc(e) {
    this.setData({
      desc: e.detail.value
    })
  },

  //控制模态框的显示和隐藏
  toShowStartModal() {
    this.setData({
      showStartModal: !this.data.showStartModal,
      img_url: '',
      desc: ''
    })
  },
 //控制模态框的显示和隐藏
  toShowFinishModal() {
    this.setData({
      showFinishModal: !this.data.showFinishModal
    })
  },

  async startService(e) {
    const { status, id } = e.currentTarget.dataset;
    const { desc, img_url } = this.data;
    if (desc.length === 0 || img_url.length === 0) {
      wx.showToast({
        title: '存在必填项未填写!',
        icon: 'none'
      })
      return;
    }

    let params = {
      _id: id,
      status,
    }

    if (status === 2) {
      params.start_info = {
        desc,
        img_url
      }
    } else if (status === 3) {
      params.finish_info = {
        desc,
        img_url
      }
    }






    
    const { data } = await ajax('/change_service_status', 'POST', params);
    if (data === "success") {
      wx.showToast({
        title: '操作成功!',
        icon: 'none'
      })
      this.getList(status ? status - 1 : 1);
      this.setData({
        desc: '',
        img_url: '',
        showFinishModal: false,
        showStartModal: false
      })
    } else {
      wx.showToast({
        title: '操作失败!',
        icon: 'none'
      })
    }
  },

  
  onTabsChange(e) {
    this.setData({
      tabNow: e.detail.value
    })
    this.getList(e.detail.value)
  },

  // 获取维修列表数据
  async getList(status = 0) {
    const loginInfo = wx.getStorageSync('loginInfo');
    const { role } = loginInfo;
    let params = {};
    if (role === 0) {
      params = {
        status,
        user_id: loginInfo.user_id,
      };
    } else if (role === 1) {
      params = {
        status,
        worker_user_id: loginInfo.user_id,
      };
    }

    const { data: { result } } = await ajax('/get_service_list', 'POST', params);
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
    const loginInfo = wx.getStorageSync('loginInfo');
    this.getList(loginInfo.role === 0 ? 0 : 1);
    if (loginInfo) {
      const { role } = loginInfo;
      if (role === 1) {

        this.setData({
          tabNow: 1,
          tabList: [{
            label: '待处理',
            value: 1,
          },
          {
            label: '处理中',
            value: 2,
          },
          {
            label: '已完成',
            value: 3
          }],
          isWorker: true
        })
      }
    }
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