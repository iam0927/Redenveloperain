; (function (Petal, Tips, End) {
  function Game(options) {
    this.timer = null
    this.canvas = document.getElementById(options.id)
    this.ctx = this.canvas.getContext('2d')
    this.flag = false
    this.fn = options.fn
    this.sustained = options.sustained
    this.interval = options.interval
    this.amount = options.amount
    this.fps = 20
    this.images = {}
    this.resource = imageList.images
    this.animationID = 'game'
    this.downTime = new Date()
    this.petalLIst = []
    this.count = 0
    this.num = 0
    this.storage = 0
    this.canvas.width = window.innerWidth 
    this.canvas.height = window.innerHeight 
    // 解决移动端糊的问题
    this.dpr = window.devicePixelRatio || 1
    this.canvas.style.width = window.innerWidth  + 'px';
    this.canvas.style.height = window.innerHeight  + 'px';
    this.canvas.width = (window.innerWidth) * this.dpr;
    this.canvas.height = (window.innerHeight) *this.dpr;
    // 由于画布扩大，canvas的坐标系也跟着扩大，如果按照原先的坐标系绘图内容会缩小
    // 所以需要将绘制比例放大
    this.ctx.scale(this.dpr, this.dpr);
    this.spliceArr = []
    this.init()

  }

  Game.prototype.init = function () {
    // 加载资源
    this.loadImages(function () {
      // 这里预先加载其他资源 比如 开始游戏和结束游戏的图片
      // 加载 游戏 开始弹窗
      this.tips = new Tips({
        game: this
      })
      this.end = new End({
        game: this
      })
      this.run()
    }.bind(this))
  }

  Game.prototype.loadImages = function (callback) {
    // 将所有img循环加载到images对象中
    var count = 0
    this.resource.forEach((item) => {
      var img = new Image()
      img.src = item.src
      img.onload = () => {
        var obj = {}
        obj[item.name] = img
        obj.width = item.width
        obj.height = item.height
        this.images[item.name] = obj
        count++ // 资源加载进度
        if (count == this.resource.length) {
          $('.loading').remove()
          callback()
        }
      }
    })
  }

  Game.prototype.run = function () {
    // 前三秒执行倒计时提示，然后开始游戏
    this.forward()
    var timer = setInterval(() => {
      if (this.tips.count < 4) {
        this.forward()
      } else {
        $('.close-view').css('display', 'block')
        this.start()
        this.gameOver()
        window.clearInterval(timer)
      }
    }, 1000)
  }

  Game.prototype.start = function () {
    // 启动游戏
    var step = () => {
      this.mainLoop()
      this.animationID = window.requestAnimationFrame(step)
    }
    this.animationID = window.requestAnimationFrame(step)
    this.play()
  }

  Game.prototype.mainLoop = function () {
    // 游戏主循环
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    // 加载红包
    if (new Date() - this.downTime >= this.interval) {
      this.num++
      if (this.num <= this.amount) {
        this.petalLIst.push(new Petal({
          accel: Math.random(),
          game: this
        }))
        this.downTime = new Date()
      }
    }
    this.petalLIst.forEach(item => {
      // 渲染红包
      item.update()
      item.render()
    })
    // 渲染被删除后的
    // this.spliceArr.forEach((item, index) => {
    //   if (item.globalAlpha < .1) { // 当透明度小于0会变为不透明，用0.1做判断
    //     this.spliceArr.splice(index, 1)
    //   } else {
    //     item.update()
    //     item.opicty()
    //     item.render()
    //   }
    // })
  }

  Game.prototype.play = function () {
    this.canvas.addEventListener('touchstart', function (e) {
      // 移动端点击会有延迟，使用touch事件
      var clickX = e.changedTouches[0].clientX
      var clickY = e.changedTouches[0].clientY
      // 金币的移动速度不一样，会有重叠
      // 将点击到的index放到一个数组中
      var clickedCoins = []
      this.petalLIst.forEach((item, index) => {
        if (clickX >= item.x && clickX <= item.x + item.width) {
          if (clickY >= item.y && clickY <= item.y + item.height) {
            if (item.globalAlpha == 1) {
              clickedCoins.push(index)
            }
          }
        }
      })
      if (clickedCoins.length) {
        // 获取最上层金币
        var length = clickedCoins[clickedCoins.length - 1]
        // 消除+1
        this.storage++
        // 将被点击的金币放入被删除数组，减少其透明度
        // this.spliceArr.push(this.petalLIst[length])
        // 从金币数组中删除
        this.petalLIst.splice(length, 1)
      }

    }.bind(this))
  }

  Game.prototype.forward = function () {
    // 游戏开始提示
    this.tips.update()
  }

  Game.prototype.gameOver = function () {
    // 10s 后停止
    this.timer = setTimeout(() => {
      window.clearTimeout(this.timer)
      window.cancelAnimationFrame(this.animationID)
      // 游戏结束请求后台
      this.end.ajax(this.storage)
    }, this.sustained)
  }
  
  window.Game = Game
})(Petal, Tips, End)
