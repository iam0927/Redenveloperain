; (function () {
  function Tips(options) {
    this.game = options.game
    this.width = this.game.images.timeout1.width
    this.height = this.game.images.timeout1.height
    this.timer = null
    this.animationID = 'intro'
    this.count = 1
    this.x = (window.innerWidth  - this.width) / 2
    this.y = (window.innerHeight - this.height) / 2
    this.img1 = this.game.images.timeout1.timeout1
    this.img2 = this.game.images.timeout2.timeout2
    this.img3 = this.game.images.timeout3.timeout3
  }

  Tips.prototype.update = function () {
    this.render()
    this.count++
  }

  Tips.prototype.render = function () {
    this.game.ctx.clearRect(0, 0, window.innerWidth , window.innerHeight)
    this.game.ctx.save()
    this.game.ctx.translate(0, 0)
    this.game.ctx.fillStyle = 'rgba(0,0,0,0.5)'
    this.game.ctx.fillRect(0, 0, window.innerWidth , window.innerHeight)
    if (this.count == 1) {
      this.game.ctx.drawImage(this.img3, this.x, this.y, this.width, this.height)
    } else if (this.count == 2) {
      this.game.ctx.drawImage(this.img2, this.x, this.y, this.width, this.height)
    } else if (this.count == 3) {
      this.game.ctx.drawImage(this.img1, this.x, this.y, this.width, this.height)
    }
    this.game.ctx.restore()
  }

  window.Tips = Tips
})()