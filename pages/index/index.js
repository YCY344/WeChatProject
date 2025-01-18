import { ajax } from '../../utils/index';
import themeChangeBehavior from 'tdesign-miniprogram/mixins/theme-change';
Page({

    /**
     * 页面的初始数据
     */
    behaviors: [themeChangeBehavior],
    data: {
      logo: {
        icon: 'https://img1.baidu.com/it/u=4214351527,3540983615&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
        title: '广东外语外贸大学南国商学院',
      },
      cur: {},
      position: [
      { value: 'bottom', text: '底部弹出' },
      ],
      marquee2: {
        speed: 60,
        loop: -1,
        delay: 0,
      },
      marqueeContent:"",
      current: 0,
      autoplay: true,
      duration: 500,
      interval: 5000,
      swiperList: ['../../../assets/banner1.jpg', '../../../assets/banner2.jpg','../../../assets/banner3.jpeg'],
    },

    fetchAnnouncements() {  
      const that = this;  
      wx.request({  
          url: 'http://localhost:3000/get_notice',  
          method: 'GET',  
          success(res) {  
            console.log(res);
              if (res.data.content && res.data.content.length > 0) {  
                  // 假设公告内容在返回的对象中的字段为 'content'  
                  that.setData({  
                      marqueeContent: res.data.content  
                  });  
              } else {  
                  that.setData({ marqueeContent: '没有公告' });  
              }  
          },  
          fail(err) {  
              console.error('请求公告失败:', err);  
              that.setData({ marqueeContent: '公告加载失败' });  
          }  
      });  
  },  


    toDetail(e) {
      const url = e.currentTarget.dataset.url;
      const wxLogin = wx.getStorageSync('wxLogin');
      if (wxLogin) {
        wx.navigateTo({
          url,
        })
      } else {
        wx.showToast({
          title: '请前往个人中心授权!',
          icon: 'none'
        })
      }
    },

    async getOpenId() {
      const { code } = await wx.login();
      if (code) {
        const params = {
          code
        };

        const { data: { openid } } = await ajax('/get_openid', 'POST', params);

        if (openid) {
          wx.setStorageSync('openid', openid)
        }
      }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      const openid = wx.getStorageSync('openid');
      if (!openid) {
        this.getOpenId();
      }
      this.fetchAnnouncements(); 
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
      const loginInfo = wx.getStorageSync('loginInfo');
      if (loginInfo) {
        const { role } = loginInfo;

        if (role === 2) {
          wx.redirectTo({
            url: '../workIndex/workIndex',
          })
        }
      }
    },

    handleClick() {  
      // 使用 wx.navigateTo 跳转到页面  
      wx.navigateTo({  
          url: '/pages/aicustomerservice/aicustomerservice' // 不要加 .wxml 后缀  
      });  
    },

    handlePopup(e) {
      const { item } = e.currentTarget.dataset;

      this.setData(
        {
          cur: item,
        },
        () => {
          this.setData({ visible: true });
        },
      );
    },
    onVisibleChange(e) {
      this.setData({
        visible: e.detail.visible,
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