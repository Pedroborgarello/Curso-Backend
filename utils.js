
function verificarHora() {
    let hoy = new Date();
    let hour = hoy.getHours() + ':' + hoy.getMinutes();
    let date = hoy.getDate() + '/' + (hoy.getMonth() + 1) + '/' + hoy.getFullYear() + ' ' + hour;
    return date;
}

module.exports = { verificarHora };