window.onload = main;
// var loader, url;

function main() {
    // loader = document.getElementById("loader");
    // url = document.getElementById("url");
    getContents();
    setInterval(getContents, 4000);
}

function getContents() {
    const sourceUrl = 'https://vip.bitcoin.co.id/api/btc_idr/ticker';

    // sourceUrl = url;
    const corsUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrlContest = corsUrl + sourceUrl;
    getApi(apiUrlContest, dataRender, 'JSON');
}

/* Fetch whole webpage to data */
// type=text for getting text/html. default is to get json
function getApi(url, update, type = 'text') {
    // var myHeaders = new Headers();
    // var myInit = { method: 'GET',
    //               headers: myHeaders,
    //               mode: 'cors',
    //               cache: 'default' };            

    fetch(url).then(function (response) {
        if (response.ok) {
            return type === 'JSON' ? response.json() : response.text();
        }
        throw new Error('Network response was not ok.');
    }).then(function (data) {
        update.call(null, data);
        //   if(final) offLoader(); // turn off spinner loader after loaded all API
    }).catch(function (error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
    });
}

/* process fatched data */
function dataRender(data) {
    outp = document.getElementById("outp");

    outp.innerText = "High = " + data.ticker.high + "\n" +
        "Low = " + data.ticker.low + "\n" +
        "vol_btc = " + data.ticker.vol_btc + "\n" +
        "vol_idr = " + data.ticker.vol_idr + "\n" +
        "last = " + data.ticker.last + "\n" +
        "buy = " + data.ticker.buy + "\n" +
        "server_time (unix epoch time standard format) = " + data.ticker.server_time;

    highest = parseInt(data.ticker.high);
    lowest = parseInt(data.ticker.low);
    median = ((lowest + highest) / 2);
    document.getElementById('median').innerText = median.toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR'
    });

    idr = parseInt(data.ticker.vol_idr);
    btc = parseInt(data.ticker.vol_btc);

    ratio = idr / btc;
    document.getElementById('idr-btc-ratio').innerText = ratio.toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR'
    });

    buy = (Math.floor(median/100000)-1)*100000;

    document.getElementById('buy').value = buy;
}


function fetchContents(el, evt) {
    evt.preventDefault();
    if (url.value !== "") {
        // loader.style.display = "block";
        getContents(url.value);
    }
}

function copyTextToClipboard() {
    var copyText = document.getElementById("buy");
    copyText.select();
    copyText.setSelectionRange(0, 99999)
    document.execCommand("copy");
}