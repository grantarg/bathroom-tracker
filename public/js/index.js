function switchToMens() {
    console.log('M')
    document.getElementById('f-table-main').style.display = 'none';
    document.getElementById('m-table-main').style.display = 'table';
    document.getElementById('m-button').style.backgroundColor = 'rgba(105, 98, 105, 0.294)';
    document.getElementById('f-button').style.backgroundColor = 'rgba(255, 255, 255, 1)';
    document.getElementById('m-button').style.border = '2px solid rgba(0, 0, 0, 0.5)';
    document.getElementById('f-button').style.border = '2px solid rgb(255, 255, 255)';
}

function switchToWomens() {
    console.log('F')
    document.getElementById('m-table-main').style.display = 'none';
    document.getElementById('f-table-main').style.display = 'table';
    document.getElementById('m-button').style.backgroundColor = 'rgba(255, 255, 255, 1)';
    document.getElementById('f-button').style.backgroundColor = 'rgba(105, 98, 105, 0.294)';
    document.getElementById('m-button').style.border = '2px solid rgb(255, 255, 255)';
    document.getElementById('f-button').style.border = '2px solid rgba(0, 0, 0, 0.5)';
}