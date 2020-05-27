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
  var obj = {
    bizSourceCate: bizSourceCate,
    bizSourceType: bizSourceType,
    bizSourceId: bizSourceId,
    activityId: bizSourceId,
    joinChannle: 3,
    platform: 3,
    channel: channel
  }

  getData('/activityMapi/activityInfo', obj, function (res) {
    if (res.code == 1) {
      var flag = new Date().getTime() - new Date(res.data.currentTime).getTime() < 86400000
      if (!flag) {
        var url = urlDomain + '/activity/2020/newYearAct/index.html' + location.search;
        locationReplace(url)
      }
    }
  })
}


// app内统一登录
function GetLogin1 () {
  isLogin(false, false, function (result) {
    if (result.code != 1) {
      PinganHealth.toast(result.msg)
    }
  })
}

function getData (url, params, callback) {
  $('#sync-mini').css('display', 'block');
  $.ajax({
    url: hostName + url + '.json?appVersionName=1.3.0&deviceId=5a4c935cbb6ff6ca&deviceType=SM-G9300&timestamp=' + new Date().getTime() + '&platform=' + platform + '&app_key=PAHealth&osversion=100&version=1.3.0&resolution=1440x2560&screenSize=22&netType=1',
    dataType: 'json',
    type: 'POST',
    data: params,
    success: function (result) {
      callback && callback(result);
      $('#sync-mini').css('display', 'none');
    },
    error: function (result) {
      PinganHealth.toast(result.msg);
      $('#sync-mini').css('display', 'none');
    }
  });
}

// Cookie.remove('PAH_SO');
// GetLogin()
// function GetLogin() {
//   isLogin(false, true, function (result) {
//     if (result.code == 1) {
//       // getGold()
//       getThis()
//       var game = new Game({ id: 'canvas', sustained: 13500, interval: 200, amount: 50, fn: getGold })
//     } else {
//       PinganHealth.toast(result.msg)
//     }
//   });
// }
