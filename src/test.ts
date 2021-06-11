import distanceCorrelationFast from './index';
import { distanceCorrelation } from "distance-correlation";

let lengthArray = [10,100,1000,10000,20000,30000,40000,50000];
let onlyNLogN = [100000,200000,500000,1000000,2000000,3000000,4000000,5000000, 10000000];
interface basic {
	[key:string]:{"distance-correlation":string, "distance-correlation-fast":string, "distance-correlation-result":number, "distance-correlation-fast-result":number}
}
let res:basic = {};

for (let len of lengthArray) {
	console.log(`Running dual test of length ${len}`);
	let x = new Array(len);
	let y = new Array(len);
	for (let i = 0; i < len; i++) {
		x[i] = Math.random();
		y[i] = Math.random();
	}
	
	let normalTime = Date.now();
	let normalRes = distanceCorrelation(x, y);
	let normalResTime = `${Date.now() - normalTime} ms`;
	let newTime = Date.now();
	let newRes = distanceCorrelationFast(x, y);
	let newResTime = `${Date.now() - newTime} ms`;

	res[len.toString()] = {
		"distance-correlation": normalResTime,
		"distance-correlation-fast": newResTime,
		"distance-correlation-result": normalRes,
		"distance-correlation-fast-result": newRes
	};
	
}

for (let len of onlyNLogN) {
	console.log(`Running single test of length ${len}`);
	let x = new Array(len);
	let y = new Array(len);
	for (let i = 0; i < len; i++) {
		x[i] = Math.random();
		y[i] = Math.random();
	}
	
	let newTime = Date.now();
	let newRes = distanceCorrelationFast(x, y);
	let newResTime = `${Date.now() - newTime} ms`;

	res[len.toString()] = {
		"distance-correlation": "--",
		"distance-correlation-fast": newResTime,
		"distance-correlation-result": -1,
		"distance-correlation-fast-result": newRes
	};
	
}

console.table(res);

/*
┌──────────┬──────────────────────┬───────────────────────────┬─────────────────────────────┬──────────────────────────────────┐
│ (index)  │ distance-correlation │ distance-correlation-fast │ distance-correlation-result │ distance-correlation-fast-result │
├──────────┼──────────────────────┼───────────────────────────┼─────────────────────────────┼──────────────────────────────────┤
│    10    │        '1 ms'        │          '1 ms'           │     0.5747830105244421      │        0.5747830105244454        │
│   100    │        '6 ms'        │          '2 ms'           │     0.19744451245203617     │       0.19744451245202876        │
│   1000   │       '48 ms'        │          '14 ms'          │     0.05169451778595419     │       0.051694517785985133       │
│  10000   │      '1536 ms'       │         '110 ms'          │    0.013863197314888316     │       0.01386319731627763        │
│  20000   │      '5713 ms'       │         '149 ms'          │    0.008901539969255705     │       0.008901539962876669       │
│  30000   │      '14121 ms'      │         '114 ms'          │    0.012292353476485062     │       0.012292353475511308       │
│  40000   │      '25096 ms'      │         '151 ms'          │    0.011822971901799584     │       0.011822971902881054       │
│  50000   │      '82462 ms'      │         '190 ms'          │    0.006029711340305374     │       0.006029711342246058       │
│  100000  │         '--'         │         '439 ms'          │             -1              │       0.005114315938060392       │
│  200000  │         '--'         │         '960 ms'          │             -1              │       0.002527787500522957       │
│  500000  │         '--'         │         '2771 ms'         │             -1              │      0.0035845709831482924       │
│ 1000000  │         '--'         │         '5950 ms'         │             -1              │      0.0014530022694211207       │
│ 2000000  │         '--'         │        '13342 ms'         │             -1              │      0.0008087837565719341       │
│ 3000000  │         '--'         │        '21525 ms'         │             -1              │      0.0011251886693957884       │
│ 4000000  │         '--'         │        '28751 ms'         │             -1              │      0.0008083368517333731       │
│ 5000000  │         '--'         │        '37530 ms'         │             -1              │      0.0007008802813679654       │
│ 10000000 │         '--'         │        '82341 ms'         │             -1              │      0.0003942226553583085       │
└──────────┴──────────────────────┴───────────────────────────┴─────────────────────────────┴──────────────────────────────────┘
Not a super well executed benchmark (to the point that throttling happened several times), but should give a good idea of how massive the difference is.
*/
