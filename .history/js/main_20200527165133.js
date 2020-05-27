/**
 * @author: yeheng
 * @param: id: canvas画布 sustained: 游戏时长 interval: 金币间隔 amount: 金币数量 fn: 接口
 * @event: Game游戏主框架 Tips开始前倒计时 Petal金币 End结束
 * @description: 游戏使用面向对象编写，可高度复用，所有参数均可灵活配置
 */

if (IsPAH) {
  isLoginStatus(true);
  setTimeout(function () {
    if (loginStatus) {
      getThis()
      getInfo()
      var game = new Game({ id: 'canvas', sustained: 13500, interval: 200, amount: 50, fn: getGold })
      $('.close').on('click', function () {
        if (game.flag) { // 如果为true 游戏已经结束
          // To do something
          return
        }
        var num = game.storage || 0
        getGold(num).then(res => {
          // To do something
        }).catch(err => {
          console.log(res)
        })
      })
    } else {
      GetLogin1()
    }
  }, 250)
} else { }

function getGold (num) {
  var obj = { taskKey: num }
  return new Promise((resolve, reject) => {
    getData('url', obj, function (res) {
      if (res.code == 1) {
        resolve(res)
      } else {
        reject(res)
      }
    })
  })
}

function getThis () {
  var obj = {}

  getData('url', obj, function (res) {
    if (res.code == 1) {
      // To do something
    } else {
      console.log(res)
    }
  })
}

function locationReplace (url) {
  setTimeout(() => {
    if (window.history.replaceState) {
      window.history.replaceState(null, document.title, url);
      window.history.go(0);
    } else {
      window.location.replace(url);
    }
  }, 200)
}

// 查询活动
function getInfo () {
  var obj = {}

  getData('url', obj, function (res) {
    if (res.code == 1) {
      // To do something
    }
  })
}


// app内统一登录
function GetLogin1 () {
  // 
}
