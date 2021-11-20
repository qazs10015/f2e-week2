// 縣市資料來自 https://tdx.transportdata.tw/api-service/swagger
// GET /v2/Tourism/ScenicSpot/{City}
// City 欄位中的"列舉詳細資料"
export const cityGroupList = [
  {
    groupName: '北部',
    citys: [
      { zhtw: '基隆市', en: 'Keelung' },
      { zhtw: '臺北市', en: 'Taipei' },
      { zhtw: '新北市', en: 'NewTaipei' },
      { zhtw: '桃園市', en: 'Taoyuan' },
      { zhtw: '新竹市', en: 'Hsinchu' },
      { zhtw: '新竹縣', en: 'HsinchuCounty' },
      { zhtw: '宜蘭縣', en: 'YilanCounty' },

    ]
  },
  {
    groupName: '中部 ',
    citys: [
      { zhtw: '苗栗縣', en: 'MiaoliCounty' },
      { zhtw: '臺中市', en: 'Taichung' },
      { zhtw: '彰化縣', en: 'ChanghuaCounty' },
      { zhtw: '雲林縣', en: 'YunlinCounty' },
      { zhtw: '南投縣', en: 'NantouCounty' },
    ]
  },
  {
    groupName: '南部',
    citys: [
      { zhtw: '嘉義縣', en: 'ChiayiCounty' },
      { zhtw: '嘉義市', en: 'Chiayi' },
      { zhtw: '臺南市', en: 'Tainan' },
      { zhtw: '高雄市', en: 'Kaohsiung' },
      { zhtw: '屏東縣', en: 'PingtungCounty' },

    ]
  },
  {
    groupName: '東部',
    citys: [
      { zhtw: '花蓮縣', en: 'HualienCounty' },
      { zhtw: '臺東縣', en: 'TaitungCounty' },
    ]
  }, {
    groupName: '外島',
    citys: [
      { zhtw: '澎湖縣', en: 'PenghuCounty' },
      { zhtw: '金門縣', en: 'KinmenCounty' },
      { zhtw: '連江縣', en: 'LienchiangCounty' },
    ]
  }

]





