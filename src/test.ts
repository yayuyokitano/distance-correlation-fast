import distanceCorrelationFast from './index';
import { distanceCorrelation } from "distance-correlation";

let lengthArray = [10,100,1000,10000,20000,30000,40000,50000];
let onlyNLogN = [100000,200000,500000,1000000,2000000,3000000,4000000,5000000];
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
┌─────────┬──────────────────────┬───────────────────────────┬─────────────────────────────┬──────────────────────────────────┐
│ (index) │ distance-correlation │ distance-correlation-fast │ distance-correlation-result │ distance-correlation-fast-result │
├─────────┼──────────────────────┼───────────────────────────┼─────────────────────────────┼──────────────────────────────────┤
│   10    │        '1 ms'        │          '1 ms'           │      0.382825287690042      │        0.3828252876900454        │
│   100   │        '6 ms'        │          '2 ms'           │     0.13829996604117056     │       0.13829996604116315        │
│  1000   │       '50 ms'        │          '15 ms'          │     0.03628753210507448     │       0.036287532105186635       │
│  10000  │      '1549 ms'       │         '114 ms'          │     0.02095419967874481     │       0.020954199678122964       │
│  20000  │      '5818 ms'       │         '175 ms'          │    0.016086395312417248     │       0.016086395312258472       │
│  30000  │      '14288 ms'      │         '134 ms'          │    0.015620504059051582     │       0.015620504059304258       │
│  40000  │      '25449 ms'      │         '179 ms'          │    0.009919314920790408     │       0.009919314924033206       │
│  50000  │      '83536 ms'      │         '205 ms'          │    0.014774905864089687     │       0.014774905865482699       │
│ 100000  │         '--'         │         '508 ms'          │             -1              │       0.004405316342355193       │
│ 200000  │         '--'         │         '1072 ms'         │             -1              │       0.002828554074877791       │
│ 500000  │         '--'         │         '3038 ms'         │             -1              │       0.004200976314319337       │
│ 1000000 │         '--'         │         '6875 ms'         │             -1              │      0.0014860766319187509       │
│ 2000000 │         '--'         │        '14726 ms'         │             -1              │      0.0008937027074066065       │
│ 3000000 │         '--'         │        '23555 ms'         │             -1              │      0.0008617030226743158       │
│ 4000000 │         '--'         │        '32270 ms'         │             -1              │      0.0007113003632073607       │
│ 5000000 │         '--'         │        '43564 ms'         │             -1              │      0.0005252420613586389       │
└─────────┴──────────────────────┴───────────────────────────┴─────────────────────────────┴──────────────────────────────────┘
Not a super well executed benchmark (to the point that throttling happened several times), but should give a good idea of how massive the difference is.
*/
