//index.js
//获取应用实例
// const app = getApp()

const weatherMap = {
  'sunny':'sunny',
  'cloudy':'cloudy',
  'overcast':'over cast',
  'lightrain':'light rain',
  'heavyrain':'heavy rain',
  'snow':'snow'
}

const weatherColorMap = {
  'sunny': '#cbeefd',
  'cloudy': '#deeef6',
  'overcast': '#cbced2',
  'lightrain': '#bdd5e1',
  'heavyrain': '#c5ccd0',
  'snow': '#aae1fc'
}


Page({
  data: {
    nowTemp: '-12',
    nowWeather:'cloudy',
    nowWeatherBG:'',
    forecast:[]
  },
  onPullDownRefresh() { 
    this.getNow(() => {
      wx.stopPullDownRefresh();
    });
  },
  onLoad() {
    this.getNow(() => {
      wx.stopPullDownRefresh();
    })
  },
  getNow(callBack) {
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/now',
      data: {
        city: 'wenzhou'
      },
      success: res => {
        let result = res.data.result;
        let weather = result.now.weather;
        
        console.log(result);

        this.setData({
          nowTemp: result.now.temp,
          nowWeather: weatherMap[weather],
          nowWeatherBG: '/images/' + weather + '-bg.png',
          forecast:result.forecast
        })

        let forecast = [];
        let nowHour = new Date().getHours();
        let fc = result.forecast;
        for (let i = 0; i < fc.length;i += 1) {
          forecast.push (
            {
              time: (i * 3 + nowHour) % 24 + ":00",
              iconPath:"/images/" + fc[i].weather + "-icon.png",
              temp: fc[i].temp + "°" 
            }
          )
        }
        forecast[0].time = "now";
        this.setData({
          forecast:forecast
        })

        wx.setNavigationBarColor({
          frontColor: '#000000',
          backgroundColor: weatherColorMap[weather]
        })
      },
      complete() {
        callBack && callBack();
      }
    })
  }
}) 
