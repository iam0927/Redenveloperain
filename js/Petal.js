; (function () {
  function Petal(options) {
    this.accel = options.accel // 加速度
    this.game = options.game
    this.globalAlpha = 1
    this.speed = Math.random() * 2 + 3
    // 每次出现随机样子的金币
    this.type = Math.round(Math.random() * (3 - 1) + 1)
    if (this.type == 1) {
      this.name = this.game.images.PAcurrency1.PAcurrency1
      this.width = this.game.images.PAcurrency1.width
      this.height = this.game.images.PAcurrency1.height
      // 红包的横坐标随机，不能溢出屏幕
      // 应该是红包宽度的一半到 屏幕减去红包宽度的一半
      // 为了方便计算 按红包宽度来计算
      this.x = (Math.random() * (window.innerWidth - this.width))
      // 让红包从屏幕外边下来
      this.y = 0 - this.height - 10
    } else if (this.type == 2) {
      this.name = this.game.images.PAcurrency2.PAcurrency2
      this.width = this.game.images.PAcurrency2.width
      this.height = this.game.images.PAcurrency2.height
      this.x = (Math.random() * (window.innerWidth - this.width))
      this.y = 0 - this.height - 10
    } else if (this.type == 3) {
      this.name = this.game.images.PAcurrency3.PAcurrency3
      this.width = this.game.images.PAcurrency3.width
      this.height = this.game.images.PAcurrency3.height
      this.x = (Math.random() * (window.innerWidth - this.width))
      this.y = 0 - this.height - 10
    }
  }

  Petal.prototype.update = function () {
    // 让红包动起来
    // this.accel += 0.1
    // this.y += this.accel
    this.y += this.speed
  }

  Petal.prototype.render = function () {
    // 将红包放到页面上
    this.game.ctx.save()
    this.game.ctx.translate(this.x, this.y)
    this.game.ctx.globalAlpha = this.globalAlpha
    if (this.type == 1) {
      this.game.ctx.drawImage(this.name, 0, 0, this.width, this.height)
    } else if (this.type == 2) {
      this.game.ctx.drawImage(this.name, 0, 0, this.width, this.height)
    } else if (this.type == 3) {
      this.game.ctx.drawImage(this.name, 0, 0, this.width, this.height)
    }
    this.game.ctx.restore()
  }

  Petal.prototype.opicty = function () {
    this.globalAlpha -= .1
  }

  window.Petal = Petal
})()