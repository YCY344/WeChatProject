import { ajax } from '../../utils/index';

Page({
    data: {
        role: 0,
        account: '',
        password: ''
    },

    getAccount(e) {
        this.setData({
            account: e.detail.value
        });
    },

    getPassword(e) {
        this.setData({
            password: e.detail.value
        });
    },

    getRole(e) {
        this.setData({
            role: e.detail.value
        });
    },

    toRegister() {
        wx.navigateTo({
            url: '../register/register',
        });
    },

    async submit() {
        const { role, account, password } = this.data;
        if (account.trim().length === 0 || password.trim().length === 0) {
            wx.showToast({
                title: '存在必填项未填!',
                icon: 'none'
            });
            return;
        }

        const params = {
            account, 
            password,
            role
        };

        const response = await ajax('/login', 'POST', params);
        const { status, result } = response.data;

        if (status === "accountError") {
            wx.showToast({
                title: '账号或密码错误!',
                icon: 'none'
            });
        } else if (status === 'success') {
            wx.setStorageSync('loginInfo', result);

            if (role === 0) {
                wx.switchTab({
                    url: '../index/index',
                    success: () => {
                        wx.showToast({
                            title: '登录成功!',
                        });
                    }
                });
            } else if (role === 1) {
                wx.redirectTo({
                    url: '../workIndex/workIndex',
                    success: () => {
                        wx.showToast({
                            title: '登录成功!',
                        });
                    }
                });
            }
        } else {
            wx.showToast({
                title: '登录失败!',
                icon: 'none'
            });
        }
    },

    onLoad(options) {},

    onReady() {},

    onShow() {
        const loginInfo = wx.getStorageSync('loginInfo');
        if (loginInfo) {
            const { role } = loginInfo;
            if (role === 0) {
                wx.switchTab({
                    url: '../index/index',
                });
            } else if (role === 1) {
                wx.redirectTo({
                    url: '../workIndex/workIndex',
                });
            }
        }
    },

    onHide() {},

    onUnload() {},

    onPullDownRefresh() {},

    onReachBottom() {},

    onShareAppMessage() {}
});