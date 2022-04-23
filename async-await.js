const axios = require('axios');

async function getCovidData() {

    const response = await axios.get('https://api.covid19api.com/summary');
    console.log('Đã lấy dữ liệu thành công, đang xuất thống kê:');
    console.log('Dữ liệu Covid hôm nay:')
    console.log(`Nhiễm mới: ${response.data.Global.NewConfirmed} - Số người chết mới: ${response.data.Global.NewDeaths} - Tổng số người chết: ${response.data.Global.TotalDeaths}`)

}
async function getCountryWithLargestTotalDeaths() {
    const response = await axios.get('https://api.covid19api.com/summary');
    const result = response.data.Countries.reduce((previousValue, currentValue) => {
        return ((previousValue.TotalDeaths > currentValue.TotalDeaths) ? previousValue : currentValue)
    })
    console.log(`Quốc Gia có số lượng tổng cộng người chết nhiều nhất là: ${result.Country} (${result.TotalDeaths} người)`)

}

async function getCountryWithLargestNewConfirmed() {
    const response = await axios.get('https://api.covid19api.com/summary');
    const result = response.data.Countries.reduce((previousValue, currentValue) => {
        return ((previousValue.NewConfirmed > currentValue.NewConfirmed) ? previousValue : currentValue)
    })
    console.log(`Quốc Gia có số lượng người mắc mới trong ngày nhiều nhất là: ${result.Country} (${result.NewConfirmed} người)`)

}
async function main() {
    console.log(' Đang lấy dữ liệu, xin vui lòng chờ...')
    try {
        await getCovidData()
        await getCountryWithLargestTotalDeaths()
        await getCountryWithLargestNewConfirmed()
    } catch (error) {
        console.error(error);
    }
}
main()