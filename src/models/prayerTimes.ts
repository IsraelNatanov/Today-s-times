import { Schema, model, models } from 'mongoose';

const prayerTimes = new Schema({
    civilDate: String,
    jewishDate: String,
    dayOfWeek: String,
    parshasHashavua: String,
    alos16_1: String,
    alos72Minutes: String,
    misheyakir10_2: String,
    sunrise20_57Meters: String,
    sunriseSeaLevel: String,
    sofZmanShmaMGA72Minutes: String,
    sofZmanShmaGRA: String,
    sofZmanTfilaMGA72Minutes: String,
    sofZmanTfilaGRA: String,
    chatzosAstronomical: String,
    minchaGedolaGRA: String,
    plagHamincha: String,
    candleLighting18Minutes: String,
    sunsetSeaLevel: String,
    sunset20_57Meters: String,
    tzaisGeonim8_5: String,
    tzais72Minutes: String,
    tzais16_1: String,
});

const PrayerTimesModel = models.Prompt || model('prayertimes', prayerTimes);

export default PrayerTimesModel;