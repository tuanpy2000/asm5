const axios = require('axios');

function getCovidData() {

    return new Promise((resolve, reject) => {
        const responses = axios.get('https://api.covid19api.com/summary');
        resolve(responses)
    })

}

function getCountryWithLargestTotalDeaths(infoCovid) {
    return new Promise((resolve, reject) => {
        const result = infoCovid.data.Countries.reduce((previousValue, currentValue) => {
            return ((previousValue.TotalDeaths > currentValue.TotalDeaths) ? previousValue : currentValue)
        })
        console.log(`Quốc Gia có số lượng tổng cộng người chết nhiều nhất là: ${result.Country} (${result.TotalDeaths} người)`)
        resolve(infoCovid)
    })
}

function getCountryWithLargestNewConfirmed(infoCovid) {
    const result = infoCovid.data.Countries.reduce((previousValue, currentValue) => {
        return ((previousValue.NewConfirmed > currentValue.NewConfirmed) ? previousValue : currentValue)
    })
    console.log(`Quốc Gia có số lượng người mắc mới trong ngày nhiều nhất là: ${result.Country} (${result.NewConfirmed} người)`)

}

console.log('Đang lấy dữ liệu, xin vui lòng chờ...')

getCovidData()
    .then((resolve) => {
        console.log('Đã lấy dữ liệu thành công, đang xuất thống kê:');
        console.log('Dữ liệu Covid hôm nay:')
        console.log(`Nhiễm mới: ${resolve.data.Global.NewConfirmed} - Số người chết mới: ${resolve.data.Global.NewDeaths} - Tổng số người chết: ${resolve.data.Global.TotalDeaths}`)
        return getCountryWithLargestTotalDeaths(resolve)
    })
    .then((resolve) => {
        getCountryWithLargestNewConfirmed(resolve)
    })

.catch(err => {
    console.log(err)
    console.log('Loaded Covid Data Failed!')

})