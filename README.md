# 六角學院第三屆精神時光屋-第二週
## 前端個人組

[Demo](https://qazs10015.github.io/f2e-week2/#/bikeStation)

開發框架： Angular

 其他套件：[Angualr Material](https://material.angular.io/)、[Angular GoogleMap](https://github.com/angular/components/tree/master/src/google-maps)、[ngx-pagination](https://www.npmjs.com/package/ngx-pagination)、[jssha(加密套件)](https://github.com/Caligatio/jsSHA)、[ngx-device-detector](https://github.com/KoderLabs/ngx-device-detector#readme)

資料來源：[TDX 運輸資料流通服務](https://tdx.transportdata.tw/api-service/swagger)

## 執行專案
```
git clone https://github.com/qazs10015/f2e-week2.git
npm install
npm start
```

## UI組設計師資料

[zoe](https://2021.thef2e.com/users/6296432819610583695?week=2&type=1)、[figma 設計稿](https://www.figma.com/file/zmcW9WenYEJubgYIY4Usqo/Week2---%E8%87%AA%E8%A1%8C%E8%BB%8A%E9%81%93%E5%9C%B0%E5%9C%96%E8%B3%87%E8%A8%8A%E6%95%B4%E5%90%88%E7%B6%B2?node-id=13%3A27)

## 網站簡介
此網站**大部分**依照設計稿設計且支援 RWD，部分 UI 因操作時有可能擋住地圖，所以調整位置

所有的導航功能皆轉址至 GoogleMap，如果是手持裝置也會自動開啟 GoogleMap App(僅試過 IPhone)

(未實作)設計稿中的 **美食/景點** 功能，因為這個功能已在[精神時光屋第一週](https://github.com/qazs10015/f2e-week1)的專案中做過了所以暫無打算做同樣的功能

(未實作)設計稿中自行車道搜尋的排序 **距離最近** 的功能

(未實作)[本專案右上有一個及時天氣資訊，經查詢後也許可以使用氣象局的開放資料，但需要註冊並取得授權碼](https://opendata.cwb.gov.tw/dataset/climate/C-B0024-001)

## GoogleMap 申請流程
> Google API　需要申請付費帳號(Billing Account)才能正常使用，申請成功後會提供300美金額度使用

1. [GoogleMap 計價方式](https://developers.google.com/maps/billing/gmp-billing)
1. [初次使用可以先看簡介影片](https://youtu.be/2_HZObVbe-g)
1. [建立 APIKey](https://developers.google.com/maps/documentation/javascript/get-api-key)

      ![image](https://user-images.githubusercontent.com/30744341/142014788-7946666a-8cac-4a6d-bd8e-2293b04ad337.png)
        
      ![image](https://user-images.githubusercontent.com/30744341/142015006-b5d26232-2e88-46ca-b21b-ae2d998a3ca4.png)
1. [啟用 Google API](https://console.cloud.google.com/apis/library)
    > 本專案使用 Maps JavaScript API、(未實作)Distance Matrix API

      ![image](https://user-images.githubusercontent.com/30744341/142015958-18657167-a882-4e7f-b75b-b76399a20d04.png)
      ![image](https://user-images.githubusercontent.com/30744341/142748796-44c89955-15dd-4a24-a7b4-cd0b22b7742f.png)


## Google Map API 使用方式
  
在專案中使用 GoogleMap 可以參考：

1. [Angular GoogleMap](https://github.com/angular/components/tree/master/src/google-maps)
1. [Angular 如何整合 Google Maps 設定篇](https://medium.com/jason-read-code/angular-%E5%A6%82%E4%BD%95%E6%95%B4%E5%90%88-google-maps-%E8%A8%AD%E5%AE%9A%E7%AF%87-1a83290ef71b)
1. [Google Maps is now an Angular component](https://timdeschryver.dev/blog/google-maps-as-an-angular-component)
1. [(未實作)運用Google Map API(Distance Matrix Service)取得旅程時間及距離](https://icelandcheng.medium.com/%E9%81%8B%E7%94%A8google-map-api-distance-matrix-service-%E5%8F%96%E5%BE%97%E6%97%85%E7%A8%8B%E6%99%82%E9%96%93%E5%8F%8A%E8%B7%9D%E9%9B%A2-4e7c9b929e9e)
2. [Launching Google Maps and performing a specific action](https://developers.google.com/maps/documentation/urls/get-started?hl=zh-tw#forming-the-url)
3. [HTML `<a>` 標籤使用 googleMap 較常見的使用方式](https://gearside.com/easily-link-to-locations-and-directions-using-the-new-google-maps/)



