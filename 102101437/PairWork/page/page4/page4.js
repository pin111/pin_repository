// pages/page4/page4.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    playerNum: '', // 玩家人数
    playerChip: '', // 玩家初始筹码
    gameNum:'',
    validInputs: false // 输入框是否都有合法输入
  },

  inputPlayerNum(e) {
    this.setData({
      playerNum: e.detail.value
    });
    this.checkInputs();
  },

  inputGameNum(e) {
    this.setData({
      gameNum: e.detail.value
    });
    this.checkInputs();
  },

  inputPlayerChip(e) {
    this.setData({
      playerChip: e.detail.value
    });
    this.checkInputs();
  },

  checkInputs() {
    const { playerNum, playerChip, gameNum } = this.data;
    const validInputs = playerNum !== '' && playerChip !== '' && gameNum !== '' && playerNum > '1' && playerChip > 0 && gameNum > 0;
    this.setData({
      validInputs: validInputs
    });
  },

  pageTurns() {
    if (this.data.validInputs) {
      //console.log(this.data)
      const data = {playerNum : this.data.playerNum, playerChip : this.data.playerChip, gameNum : this.data.gameNum};
      const url = '/pages/page3/page3?data=' + JSON.stringify(data); 
      wx.redirectTo({
        url: url
      });
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