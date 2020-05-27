; (function () {
  function End(options) {
    this.game = options.game
    this.width = this.game.images.gameover.width
    this.height = this.game.images.gameover.height
    this.img = this.game.images.gameover.gameover
    this.x = (window.innerWidth - this.width) / 2
    this.y = (window.innerHeight - this.height) / 2
  }

  End.prototype.ajax = function (num) {
    this.game.fn(num).then(res => {
      console.log(res)
      this.game.flag = true
      this.render(res.data.reward)
      this.newYearAct()
    }).catch(err => {
      PinganHealth.toast(err.msg)
    })
  }

  End.prototype.newYearAct = function () {
    var self = this
    this.game.canvas.addEventListener('touchstart', function (e) {
      // 移动端点击会有延迟，使用touch事件
      var clickX = e.changedTouches[0].clientX
      var clickY = e.changedTouches[0].clientY
      var x = this.x + 34
      var x1 = this.x + 251
      var y = this.y + this.height - 37
      var y1 = this.y + this.height
      if (clickX >= x && clickX <= x1) {
        if (clickY >= y && clickY <= y1) {
          var url = urlDomain + '/activity/2020/newYearAct/index.html' + location.search;
          self.locationReplace(url)
        }
      }
    }.bind(this))
  }

  End.prototype.locationReplace = function (url) {
    if (window.history.replaceState) {
      window.history.replaceState(null, document.title, url);
      window.history.go(0);
    } else {
      window.location.replace(url);
    }
  }

  End.prototype.render = function (reward) {
    this.game.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    this.game.ctx.save()
    this.game.ctx.translate(0, 0)
    this.game.ctx.fillStyle = 'rgba(0,0,0,0.5)'
    this.game.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
    this.game.ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    this.game.ctx.font = "bold 26px 黑体";
    this.game.ctx.fillStyle = "#fb4f47";
    this.game.ctx.textAlign = "center";
    this.game.ctx.textBaseline = "middle";
    this.game.ctx.fillText(reward + '个平安币', this.x + 138, this.y + 120);
    this.game.ctx.restore()
  }

  window.End = End
})()
