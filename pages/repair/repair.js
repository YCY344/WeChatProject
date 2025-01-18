const { ajax } = require("../../utils/index");  

// pages/repair/repair.js  
Page({  

  /**  
   * 页面的初始数据  
   */  
  data: {  
    name: '',  
    phone: '',  
    building_number: '',  
    dormitory_number: '',  
    datetimeVisible: false,  
    datetime: new Date().getTime(),  
    datetimeText: '',  
    pickerVisible: false,  
    fault_type: '',  
    fault_desc: '',  
    faultList: [  
      {  
        label: '水电',  
        value: '水电'  
      },  
      {  
        label: '电器故障',  
        value: '电器故障'  
      },  
      {  
        label: '照明问题',  
        value: '照明问题'  
      },  
      {  
        label: '其他',  
        value: '其他'  
      }  
    ],  
    buildingList: [  
      {  
        label: '学8栋',  
        value: '学8栋'  
      },  
      {  
        label: '学7栋',  
        value: '学7栋'  
      },  
      {  
        label: '教4栋',  
        value: '教4栋'  
      }, 
      {  
        label: '学6栋',  
        value: '学6栋'  
      }  
    ], // 可选择的宿舍栋数  
    
    dormitoryList: [  
      {  
        label: '101',  
        value: '101'  
      },  
      {  
        label: '102',  
        value: '102'  
      },  
      {  
        label: '103',  
        value: '103'  
      },  
      {  
        label: '104',  
        value: '104'  
      },  
      {  
        label: '105',  
        value: '105'  
      },  
      {  
        label: '201',  
        value: '201'  
      },  
      {  
        label: '202',  
        value: '202'  
      },
      {  
        label: '203',  
        value: '203'  
      },  
      {  
        label: '204',  
        value: '204'  
      },  
      {  
        label: '301',  
        value: '301'  
      },  
      {  
        label: '302',  
        value: '302'  
      },  
      {  
        label: '401',  
        value: '401'  
      },    
    ],  
    fileList: [],  
    buildingPickerVisible: false, // 控制宿舍栋数选择器显示  
    dormitoryPickerVisible: false, // 控制宿舍号选择器显示  
  },  

  async submit() {  
    const { name, phone, building_number, dormitory_number, datetimeText, fault_type, fileList, fault_desc } = this.data;  

    if (name.trim().length === 0 || phone.trim().length === 0 || building_number.trim().length === 0 || dormitory_number.trim().length === 0 || datetimeText.trim().length === 0 || fault_type.trim().length === 0 || fileList.length === 0 || fault_desc.trim().length === 0) {  
      wx.showToast({  
        title: '必填项未填写!',  
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
      phone,  
      building_number,  
      dormitory_number,  
      visit_time: datetimeText,  
      fault_type,  
      file_list: fileList,  
      fault_desc,  
    };  

    const { data } = await ajax('/add_service_order', 'POST', params);  

    if (data === "success") {  
      wx.navigateBack({  
        success: () => {  
          wx.showToast({  
            title: '提交成功!',  
          })  
        }  
      });  
    } else {  
      wx.showToast({  
        title: '提交失败!',  
      })  
    }  
  },  

  handleAdd(e) {  
    const { fileList } = this.data;  
    const { files } = e.detail;  

    if (files && files.length > 0) {  
      files.forEach(item => {  
        wx.uploadFile({  
          url: 'http://localhost:3000/upload_file',  
          filePath: item.url,  
          name: 'file',  
          success: (res) => {  
            const { data } = res;  
            const path = JSON.parse(data)[0].path;  
            const _path = path.split('\\');  
            const url = `http://localhost:3000/${_path[0]}/${_path[1]}`;  
            console.log(url);  
            this.setData({  
              fileList: [...fileList, { ...item, url }]  
            })  
          }  
        })  
      })  
    }  
  },  

  getFaultDesc(e) {  
    this.setData({  
      fault_desc: e.detail.value  
    })  
  },  

  onFaultPicker() {  
    this.setData({  
      pickerVisible: true
    })  
  },  

  onPickerChange(e) {  
    this.setData({  
      fault_type: e.detail.value[0]  
    })  
  },  

  onPickerCancel() {  
    this.setData({  
      pickerVisible: false  
    })  
  },  

  showBuildingPicker() {  
    this.setData({  
      buildingPickerVisible: true  
    })  
  },  

  hideBuildingPicker() {  
    this.setData({  
      buildingPickerVisible: false  
    })  
  },  

  onBuildingPickerChange(e) {  
    this.setData({  
      building_number: e.detail.value[0] 
    });  
    this.hideBuildingPicker();  
  },  

  showDormitoryPicker() {  
    this.setData({  
      dormitoryPickerVisible: true  
    })  
  },  

  hideDormitoryPicker() {  
    this.setData({  
      dormitoryPickerVisible: false
    })  
  },  

  onDormitoryPickerChange(e) {  
    this.setData({  
      dormitory_number: e.detail.value[0] 
    });  
    this.hideDormitoryPicker();  
  },  

  showPicker(e) {  
    this.setData({  
      datetimeVisible: true  
    })  
  },  

  hidePicker() {  
    this.setData({  
      datetimeVisible: false  
    })  
  },  

  onConfirm(e) {  
    const { value } = e?.detail;  

    this.setData({  
      datetimeText: value,  
    });  

    this.hidePicker();  
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