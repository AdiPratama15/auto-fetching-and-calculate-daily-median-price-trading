function average() {
    var highest = parseInt(document.getElementById("highest").value);
    var lowest = parseInt(document.getElementById("lowest").value);

    var median = ((lowest + highest) / 2);
    document.getElementById('median').value = median.toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR'
    });
}

function clear() {
    document.getElementById('lowest').value = null;
    document.getElementById('highest').value = null;
    document.getElementById('median').value = null;
}