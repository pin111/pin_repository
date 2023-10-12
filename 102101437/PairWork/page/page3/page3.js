// pages/page3/page3.js
const Game = require('../../classes/game.js')
Page({
  game1:null,
  /**
   * 页面的初始数据
   */
  data: {
    messages:[1,2,3,4,5],
    states:[true,true,true,true,true],
    score:0,
    player_num:0,
    rates:["0","1","2","3"],
    chip:[],
    magnification:1,
    flag:0,
    round_num:1,
    game_num:1,
    flag1:false,
    showModal:false,
    dices:[],
    scores:[],
    ranks:[],
    showModal1:false,
    playernum:0,
    gamenum:0
  },
  
  rockDice() {
    //console.log(this.game1.getPlayers()[0].getScore());
    //console.log(this.data.num);
    if (this.data.flag === 0 && !this.data.flag1){
      this.game1.getPlayers()[this.data.player_num].dicesRoll()
      this.setData({
        messages: this.game1.getPlayers()[this.data.player_num].getDices(),
        score: this.game1.getPlayers()[this.data.player_num].getScore(),
        scores:this.game1.getScores(),
        dices:this.game1.getPlayersDices(),
        flag:(this.data.flag+1)%2
      });
      if(this.data.round_num === 3)
      {
        this.setData({
          flag:(this.data.flag+1)%2  
        })
        if (this.data.player_num === this.data.playernum-1){
          const maxValue = Math.max(...this.game1.getScores());
          const maxIndex = this.game1.getScores().indexOf(maxValue);
          this.game1.updatePlayerChip(this.game1.getScores(),maxIndex)
          this.setData({
            chip:this.game1.getChips(),
            round_num:1,
            game_num:(this.data.game_num+1)%(this.data.gamenum+1),
            ranks:this.game1.getRanks()
          });
          this.game1.updateState();
          if (!this.game1.getState())
            this.gameover();
          this.btn();
          //this.game1.updateGame();  
        }
        this.next();
      }
    }
    //console.log(this.data.dices);
  },
  
  finishlock(){
    if (this.data.flag === 1 && !this.data.flag1){
      this.setData({
        flag:(this.data.flag+1)%2
      });
      if (this.data.player_num == this.data.playernum-1)
        this.setData({
          flag1:true
        });
      if (this.data.flag1){
        this.setData({
          player_num:0
        });
      }
      else{
        this.next();
      }
    }
  },

  updateData(){
    this.setData({
      messages:this.game1.getPlayers()[this.data.player_num].getDices(),
      states:this.game1.getPlayers()[this.data.player_num].getDices_state(),
      dices:this.game1.getPlayersDices(),
      score:this.game1.getPlayers()[this.data.player_num].getScore(),
      scores:this.game1.getScores(),
    });
  },
  next(){
    //this.data.num = (this.data.num+1)%2;
    this.setData({
      player_num:(this.data.player_num+1)%(this.data.playernum)
    });
    this.updateData()
  },
  turnnewgame(){
    wx.redirectTo({
      url: '/pages/page4/page4',
    })
  },
  turn(){
    wx.redirectTo({
      url: '/pages/page2/page2',
    })
  },
  gameover(){
    this.setData({
      showModal:false,
      showModal1:true
    });
  },
  magnification(e){
    //console.log(e.target.dataset.nid);
    if (this.data.flag1){
      this.game1.updateMagnification(e.target.dataset.nid);
      this.setData({
        magnification:this.game1.getMagnification(),
        player_num:(this.data.player_num+1)%(this.data.playernum)
      });
      if (this.data.player_num === 0){
        this.setData({
          flag1:false
        });
        this.setData({
          round_num:this.data.round_num+1
        })
        this.updateData();
      }
    }
    //this.next()
  },
  /** 
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // Create a new instance of the Player class
    //console.log(options)
    const data = JSON.parse(options.data);
    //console.log(data);
    this.game1 = new Game(parseInt(data.playerNum),parseInt(data.playerChip),parseInt(data.gameNum));
    //this.game1 = new Game(2,1000);
    //console.log(this.game1.getPlayers()[0].getScore())
    this.setData({
      playernum:parseInt(data.playerNum),
      gamenum:parseInt(data.gameNum),
      messages:this.game1.getPlayers()[0].getDices(),
      states:this.game1.getPlayers()[0].getDices_state(),
      score:this.game1.getPlayers()[0].getScore(),
      dices:this.game1.getPlayersDices(),
      scores:this.game1.getScores(),
      chip:this.game1.getChips(),
      ranks:this.game1.getRanks()
    });
    //console.log(this.data.states);
    
  },
  clickMe(e){
    //console.log(e);
    if (this.data.flag === 1){
      this.game1.getPlayers()[this.data.player_num].updateDicesState(e.target.dataset.nid);
      this.setData({states:this.game1.getPlayers()[this.data.player_num].getDices_state()})
      //console.log(this.data.states)
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  btn:function () {
    this.setData({
      showModal:true
    })
  },
 
  // 禁止屏幕滚动
  preventTouchMove:function () {
  },
 
  // 弹出层里面的弹窗
  ok:function () {
    this.setData({
      showModal:false
    });
    this.game1.updateGame();  
    this.setData({
      player_num:0
    });
    this.updateData();
    //console.log("111");
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
