import React, { Component } from 'react';
import './App.css';

const API_KEY = 'AIzaSyD5tFJEbZZet_Ci9sy-p6E1fCr3YuB0OHo';
const TOKEN = '1735f31d84d7fca5075977978a79f36cf54edb3a';

class App extends Component {
  constructor(props) {
    super(props);
    // 地图初始化函数
    window.initMap = () => {
      const myLatlng = { lat: 39.896, lng: 116.397 };
      const { google } = window;

      const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: myLatlng,
      });
      
      map.addListener('click', (e) => {
        const { lat, lng } = e.latLng;
        fetch(`http://api.waqi.info/feed/geo:${lat()};${lng()}/?&token=${TOKEN}`)
          .then(res => res.json())
          .then(({ data: { aqi } }) => {
            this.setState({ weatherInfo: aqi });
          })
          .catch(() => {
            this.setState({ weatherInfo: null });
          })
      });
    }
    
    // 下载地图脚本
    const script = document.createElement('script');
    script.src = `http://maps.google.cn/maps/api/js?key=${API_KEY}&callback=initMap`;
    document.body.appendChild(script);

    this.state = {
      weatherInfo: null,
    }
  }
  render() {
    return (
      <div className="weather-map">
        <div id="map"></div>
        <div className="weather">AQI: {this.state.weatherInfo}</div>
      </div>
    );
  }
}

export default App;
