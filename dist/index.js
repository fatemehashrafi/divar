"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNames = exports.getBrands = exports.consoleEverySpecificTime = exports.getEverySpecificTime = exports.getCars = void 0;
const got_1 = __importDefault(require("got"));
const persian_tools_1 = require("@persian-tools/persian-tools");
const brands_1 = require("./models/brands");
const globTime = 3000;
function getCars(carBrand = brands_1.brands[Math.floor(Math.random() * (brands_1.brands.length))].name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield (0, got_1.default)(`http://api.divar.ir/v8/web-search/mashhad/car/${carBrand}`);
            const json = JSON.parse(response.body);
            const cars = [];
            // @ts-ignore
            json.widget_list.forEach(item => {
                if (item.data.description.includes('تومان')) {
                    item.data.description = item.data.description.split('\n');
                    item.data.description[1] = item.data.description[1].replace('تومان', '');
                    item.data.description[1] = item.data.description[1].replace(/,/g, '');
                    item.data.description[1] = (0, persian_tools_1.digitsFaToAr)(item.data.description[1]);
                    item.data.description[1] = (0, persian_tools_1.digitsArToEn)(item.data.description[1]);
                    item.data.description[0] = item.data.description[0].replace('کیلومتر', '');
                    item.data.description[0] = item.data.description[0].replace(/,/g, '');
                    item.data.description[0] = (0, persian_tools_1.digitsFaToAr)(item.data.description[0]);
                    item.data.description[0] = (0, persian_tools_1.digitsArToEn)(item.data.description[0]);
                    item.data.description[0] = item.data.description[0].replace(' ', 'KM');
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
            });
            return cars;
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.getCars = getCars;
const getEverySpecificTime = function (time = globTime, carBrand = brands_1.brands[Math.floor(Math.random() * (brands_1.brands.length))].name) {
    let cars = [];
    setInterval(() => __awaiter(this, void 0, void 0, function* () {
        cars = yield getCars(carBrand).then();
    }), time);
    return cars;
};
exports.getEverySpecificTime = getEverySpecificTime;
const consoleEverySpecificTime = function (time = globTime, carBrand = brands_1.brands[Math.floor(Math.random() * (brands_1.brands.length))].name) {
    setInterval(() => {
        getCars(carBrand).then((item) => {
            console.log(item);
        });
    }, time);
};
exports.consoleEverySpecificTime = consoleEverySpecificTime;
const getBrands = function () {
    return brands_1.brands;
};
exports.getBrands = getBrands;
const getNames = function () {
    const names = [];
    brands_1.brands.forEach(item => {
        names.push(item.name);
    });
    return names;
};
exports.getNames = getNames;
getCars().then((item) => console.log(item));
