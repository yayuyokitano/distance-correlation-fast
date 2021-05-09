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
│   10    │        '1 ms'        │          '0 ms'           │     0.4898562093920331      │       0.48985620939203356        │
│   100   │        '6 ms'        │          '2 ms'           │     0.2244221894135614      │       0.22442218941356748        │
│  1000   │       '47 ms'        │          '15 ms'          │     0.04386004835225739     │       0.04386004835217815        │
│  10000  │      '3365 ms'       │         '128 ms'          │    0.014794254884836001     │       0.014794254885692014       │
│  20000  │      '5748 ms'       │         '191 ms'          │     0.00746265078923838     │       0.007462650788729342       │
│  30000  │      '14221 ms'      │         '154 ms'          │    0.009445588609526505     │       0.009445588604352323       │
│  40000  │      '25188 ms'      │         '245 ms'          │    0.006753041558315111     │      0.0067530415598551444       │
│  50000  │      '82184 ms'      │         '295 ms'          │    0.007388288289726608     │       0.007388288298405638       │
│ 100000  │         '--'         │         '648 ms'          │             -1              │       0.004515544359417369       │
│ 200000  │         '--'         │         '1474 ms'         │             -1              │      0.0022154920842022297       │
│ 500000  │         '--'         │         '4326 ms'         │             -1              │       0.00148175876298925        │
│ 1000000 │         '--'         │        '10504 ms'         │             -1              │      0.0018096514306481354       │
│ 2000000 │         '--'         │        '26608 ms'         │             -1              │      0.0010204620547444201       │
│ 3000000 │         '--'         │        '47139 ms'         │             -1              │      0.0008061945878161586       │
│ 4000000 │         '--'         │        '72399 ms'         │             -1              │      0.0007994542065281887       │
│ 5000000 │         '--'         │        '101520 ms'        │             -1              │      0.0007128976429778718       │
└─────────┴──────────────────────┴───────────────────────────┴─────────────────────────────┴──────────────────────────────────┘
Not a super well executed benchmark (to the point that throttling happened several times), but should give a good idea of how massive the difference is.
*/
