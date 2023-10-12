// pages/page3/page3.js
const AI = require('../../classes/ai.js');
const {Player} = require('../../classes/player.js');
Page({
  ai:null,
  player:null,
  /**
   * 页面的初始数据
   */
  data: {
    messages:[1,2,3,4,5],
    states:[true,true,true,true,true],
    score:0,
    rates:["0","1","2","3"],
    chip:[],
    magnification:1,
    flag:0,
    round_num:1,
    game_num:1,
    flag1:false,
    showModal:false,
    showModal1:false,
    scores:[],
    ranks:[1,1],
    gamenum:0,
    aiop:false,
    airate:0,
    dice1:null,
    dice2:null
  },
  
  
  
  
  /** 
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // Create a new instance of the Player class
    //console.log(options)
    const data = JSON.parse(options.data);
    //console.log(data);
    this.player = new Player(parseInt(data.playerChip))
    this.ai = new AI(parseInt(data.playerChip))
    //this.player = new Player(1000)
    //this.ai = new AI(1000)
    //this.game1 = new Game(2,1000);
    //console.log(this.game1.getPlayers()[0].getScore())
    this.setData({
      gamenum:parseInt(data.gameNum),
      //gamenum:2,
      messages:this.player.getDices(),
      states:this.player.getDices_state(),
      score:this.player.getScore(),
      scores:[this.player.getScore(),this.ai.getScore()],
      chip:[this.player.getChip(),this.ai.getChip()],
    });
    //console.log(this.data.states);
  },
  clickMe(e){
    this.player.updateDicesState(e.target.dataset.nid);
    this.setData({states:this.player.getDices_state()});
  },
  magnification(e){
      this.setData({
        magnification:this.data.magnification+e.target.dataset.nid,
        showModal:true
      });
      setTimeout(() => this.finishselectrate(), 2000);
      setTimeout(() => this.updateflag(),5000);
  },
  updateflag(){
    this.setData({
      flag:(this.data.flag+1)%4,
      round_num:this.data.round_num+1
    })
  },
  rockDice() {
      this.player.dicesRoll()
      this.setData({
        messages: this.player.getDices(),
        score: this.player.getScore(),
        scores:[this.player.getScore(),this.ai.getScore()],
        flag:(this.data.flag+1)%4
      });
    //console.log(this.data.dices);
      console.log(this.data.round_num)
      if (this.data.round_num === 3){
        this.setData({
          showModal:true,
          flag:-1,
        })
        setTimeout(() => this.gameover(), 5000);
      }
  },
  gameover(){
    this.setData({
      showModal: false,
      showModal1:true,
      scores:[this.player.getScore(),this.ai.getScore()],
    });
    let chip = (this.data.scores[1]-this.data.scores[0])*this.data.magnification;
    console.log(chip)
    this.ai.updateChip(chip);
    this.player.updateChip(-chip);
    this.ai.updatePlayerState();
    this.player.updatePlayerState();
    if (!(this.ai.getState() && this.player.getState())){
      this.setData({
        showModal1:false,
        showModal2:true
      });
    }
    this.setData({
      chip:[this.player.getChip(),this.ai.getChip()],
      dice1:this.player.getDices(),
      dice2:this.ai.getDices()
    })
    if (chip[1] > chip[0]){
      this.ai.upRank(1);
      this.player.upRank(2);
    }
    else if (chip[0] > chip[1]){
      this.player.upRank(1);
      this.ai.upRank(2);
    }
    this.setData({
      ranks:[this.player.getRank(),this.ai.getRank()],
    })
  },
  finishlock(){
    this.setData({
      flag: (this.data.flag+1) % 4,
      showModal: true,
    });
    setTimeout(() => this.aifinish(), 2000);
    //this.rockDice();
    this.ai.dicesRoll();
    this.ai.upDatePlayerScore(this.data.scores[0]);
    this.setData({
      scores:[this.player.getScore(),this.ai.getScore()],
    });
    this.ai.lock();
    setTimeout(() => this.update(), 5000);
  },
  
  finishselectrate(){
    this.setData({
      showModal: false,
      flag: (this.data.flag+1) % 4,
      flag1: false,
      magnification:this.data.magnification+this.ai.selectRate(),
      airate:this.ai.selectRate(),
    });
  },

  update(){
    this.setData({
      messages:this.player.getDices(),
      states:this.player.getDices_state(),
      score:this.player.getScore(),
      flag1:true,
    });
  },
  aifinish(){
    //console.log("1111");
    this.setData({
      showModal: false,
      messages:this.ai.getDices(),
      states:this.ai.getDices_state(),
      score:this.ai.getScore()
    });
  },
  ok:function () {
    this.setData({
      showModal1:false
    });
    this.player.initPlayer();
    this.ai.initPlayer();
    this.setData({
      round_num:1,
      flag:0,
      game_num:(this.data.game_num+1)%(this.data.gamenum),
    });
  },
  over(){
    this.setData({
      showModal1:false,
      showModal2:true
    });
  },
  turnnewgame(){
    wx.redirectTo({
      url: '/pages/page6/page6',
    })
  },
  turn(){
    wx.redirectTo({
      url: '/pages/page2/page2',
    })
  },
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
