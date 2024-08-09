const padZero = (num) => (num < 10 ? '0' : '') + num;

const dateTimeToString = (dateTime) => {

    // Ubah string dateTime menjadi objek Date
    const date = new Date(dateTime);
    date.setHours(date.getHours() + 7);

    const day = padZero(date.getUTCDate());
    const month = padZero(date.getUTCMonth() + 1); // Bulan dimulai dari 0
    const year = date.getUTCFullYear().toString().slice(-2);
    const hours = padZero(date.getUTCHours());
    const minutes = padZero(date.getUTCMinutes());
    const seconds = padZero(date.getUTCSeconds());

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

const dateTimeToDateString = (dateTime) => {
    const date = new Date(dateTime);
    date.setHours(date.getHours() + 7);

    const day = padZero(date.getUTCDate());
    const month = padZero(date.getUTCMonth() + 1); // Bulan dimulai dari 0
    const year = date.getUTCFullYear().toString().slice(-2);

    return `${day}/${month}/${year}`;
}

const dateTimeToTimeString = (dateTime) => {
    const date = new Date(dateTime);
    date.setHours(date.getHours() + 7);

    const hours = padZero(date.getUTCHours());
    const minutes = padZero(date.getUTCMinutes());
    const seconds = padZero(date.getUTCSeconds());

    return `${hours}:${minutes}:${seconds}`;
}

const dateToString = (date) => {
    if (date === null) return '';
    if (date === 1) return 'satu';
    if (date === 2) return 'dua';
    if (date === 3) return 'tiga';
    if (date === 4) return 'empat';
    if (date === 5) return 'lima';
    if (date === 6) return 'enam';
    if (date === 7) return 'tujuh';
    if (date === 8) return 'delapan';
    if (date === 9) return 'sembilan';
    if (date === 10) return 'sepuluh';
    if (date === 11) return 'sebelas';
    if (date < 20) return `${dateToString(date - 10)} belas`;
    if (date < 100) return `${dateToString(Math.floor(date / 10))} puluh ${dateToString(date % 10)}`;
}

export default dateTimeToString;
export { dateTimeToDateString, dateTimeToTimeString, dateToString };