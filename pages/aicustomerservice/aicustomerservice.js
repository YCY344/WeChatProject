// pages/aicustomerservice/aicustomerservice.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollTop: 0, // 用于 scroll-view 的滚动位置  
    messages:[],
    content:"",
    access_token:"",
    status:0//0表示可以发送内容，1表示不可以发送
  },

  //获取用户输入内容
handleInput(e){
  let content = e.detail.value;
  console.log(content);
  this.setData({
    content
  })

},
//用户点击
sumbit(){
  let content=this.data.content
  let messages = this.data.messages
  if (!content) {
    wx.showToast({
      title: '请输入内容',
      icon:'none'
    })
    return;
  }
  messages.push({
      role:"user",
      image:"../../assets/nailong.webp",
      content
  })

  wx.setStorageSync('messages', messages)

  this.setData({
    messages,
    content:"",
    scrollTop: messages.length * 100 // 更新 scrollTop，假定每条消息的高度约为 100px 
  })
  this.sendRequest(messages)
},



//发送网络请求,从百度获取内容
sendRequest(messages) {  
  let access_token = this.data.access_token;  
  wx.showLoading({  
    title: '',  
  });  
  this.setData({  
    status: 1  
  });  

  //规范json
  const requestData = {  
    messages: messages.map(msg => ({  
      role: msg.role,  
      content: msg.content  
    }))  
  };  

  wx.request({  
    url: `https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions?access_token=${access_token}`,  
    method: 'POST',  
    header: {  
      "Content-Type": "application/json"  
    },  
    data: requestData,  
    success: (res) => {  
      console.log('API Response:', res.data);  
      if (res.data && res.data.result) {  
        // 获取AI助手的完整回复内容  
        const fullResponse = res.data.result;  
        this.displayAssistantMessage(fullResponse, messages);  
      } else {  
        wx.showToast({  
          title: '没有返回数据',  
          icon: 'none'  
        });  
      }  
    },  
    fail: (err) => {  
      wx.hideLoading();  
      wx.showToast({  
        title: '错误，请重试',  
        icon: 'error'  
      });  
      console.log('Request Error:', err);  
    },  
    complete: () => {  
      wx.hideLoading();  
      this.setData({  
        status: 0  
      });  
    }  
  });  
},  

// 创建一个新函数来逐字显示助手消息  
displayAssistantMessage(fullResponse, messages) {  
  let index = 0;  
  let that = this;  

  messages.push({  
    role: "assistant",  
    image: "../../assets/kefu.jpeg",  
    content: ""  
  });  
  
  // 更新状态以便在UI中显示助手消息  
  this.setData({  
    messages  
  });  

  const time = setInterval(() => {  
    // 在assistant消息中逐字添加内容  
    messages[messages.length - 1].content = fullResponse.substring(0, ++index);  
    // console.log('Current Assistant Message:', messages[messages.length - 1].content);  

    // 更新页面状态  
    that.setData({  
      messages,  
      scrollTop: messages.length * 100 // 更新滚动位置  
    });  

    // 当所有内容都显示完后，停止定时器  
    if (index === fullResponse.length) {  
      wx.setStorageSync('messages', messages)  
      clearInterval(time);  
    }  
  }, 100); // 每隔100毫秒更新一次（可以根据需要调整速度）  
},


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //从缓存获取历史记录
    let messages =  wx.setStorageSync('messages')
    if (messages) {//有缓存
      messages
    }
    //判断他小于30天，到时候不用再获取
    if (wx.getStorageSync('tokenData')) {
      let tokenData = wx.getStorageSync('tokenData')
      if (tokenData.expires_in<29.5*24*60*60) {
        this.getToken()
      }else{
        this.setData({
          access_token:tokenData.access_token
        })
      }
    }else{
      this.getToken()
    }

  },


  getToken(){
    let grant_type = "client_credentials"
    let client_id = "ACrR3XgzxqVPcQJMkpxY62gc"
    let client_secret = "sRLdwVXdy695oWXQzIK9AJ1TgQj0Q6ZH"
    wx.request({
      url: `https://aip.baidubce.com/oauth/2.0/token?grant_type=${grant_type}&client_id=${client_id}&client_secret=${client_secret}`,
      method:'POST',
      header:{
        'Content-Type': 'application/json'
      },
      success:(res=>{
        let tokenData={
          access_token:res.data.access_token,
          expires_in:res.data.expires_in
        }
        this.setData({
          access_token:res.data.access_token,
        })
        //存储用户的信息，被存储在本地的键
        wx.setStorageSync('tokenData', tokenData)
      }),
      fail:(err=>{
        console.log('fail',err);
      })
    })
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