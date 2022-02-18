import got from 'got' ;
import {digitsArToEn, digitsFaToAr} from "@persian-tools/persian-tools";
import { brands } from './models/brands';
import { Cars } from './models/cars';

const globTime= 3000;

async function getCars(carBrand = brands[Math.floor(Math.random() * (brands.length))].name) {
    try {
        const response = await got(`http://api.divar.ir/v8/web-search/mashhad/car/${carBrand}`);
        const json = JSON.parse(response.body);
        const cars: Cars[]=[];
        // @ts-ignore
        json.widget_list.forEach(item => {
            if(item.data.description.includes('تومان')) {
            item.data.description = item.data.description.split('\n')
            item.data.description[1]=item.data.description[1].replace('تومان','')
            item.data.description[1]=item.data.description[1].replace(/,/g,'')
            item.data.description[1]=digitsFaToAr(item.data.description[1])
            item.data.description[1]=digitsArToEn(item.data.description[1])
            item.data.description[0]=item.data.description[0].replace('کیلومتر','')
            item.data.description[0]=item.data.description[0].replace(/,/g,'')
            item.data.description[0]=digitsFaToAr(item.data.description[0])
            item.data.description[0]=digitsArToEn(item.data.description[0])
            item.data.description[0]=item.data.description[0].replace(' ','KM')
                cars.push({
                    title: item.data.title,
                    image: item.data.image,
                    price: +item.data.description[1],
                    kilometer: item.data.description[0],
                    normalText: item.data.normal_text,
                    index: item.data.index,
                    city: item.data.city,
                    district: item.data.district,
                    category: item.data.category
                });
            }
        })
        return cars;
    } catch (error) {
        console.log(error);
    }
}
const getEverySpecificTime =  function (time = globTime, carBrand = brands[Math.floor(Math.random() * (brands.length))].name) {
    let cars: Cars[]=[];
    setInterval(async () => {
        cars = await getCars(carBrand).then();
    }, time)
    return cars;
}

const consoleEverySpecificTime = function (time = globTime, carBrand = brands[Math.floor(Math.random() * (brands.length))].name) {
    setInterval(() => {
        getCars(carBrand).then((item) => {
            console.log(item);
        });
    }, time)
}

const getBrands = function () {
    return brands;
}

const getNames = function () {
    const names: string[] = [];
    brands.forEach(item => {
        names.push(item.name)
    })
    return names;
};
    getCars().then((item)=>console.log(item))


export {getCars, getEverySpecificTime, consoleEverySpecificTime, getBrands, getNames}