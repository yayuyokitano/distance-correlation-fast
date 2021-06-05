function reorderByIndex(x:number[], order:number[]) {

	const n = x.length;
	let y = new Array<number>(n);
	for (let i = 0; i < n; i++) {
		y[i] = x[order[i]];
	}
	return y;

}

function assignByIndexOrder(x:number[], order:number[]) {

	const n = x.length;
	let y = new Array<number>(n);
	for (let i = 0; i < n; i++) {
		y[order[i]] = x[i];
	}
	return y;

}

function computeCumulativeArray(x:number[]) {

	const n = x.length;
	let s = new Array<number>(n);
	s[0] = x[0];
	for (let i = 1; i < n; i++) {
		s[i] = s[i - 1] + x[i];
	}
	return s;

}

function computeRowMean(x:number[], s:number[]) {

	const n = x.length;
	const nless = n - 1;
	let rowMean = new Array<number>(n);
	for (let i = 0; i < n; i++) {
		rowMean[i] = (2*(i + 1) - n)*x[i] + (s[nless] - 2*s[i]);
	}
	return rowMean;

}

function computeMeanDiffProduct(x:number[], y:number[], mx:number, my:number) {

	let sum = 0;
	for (let i = 0; i < x.length; i++) {
		sum += (x[i] - mx) * (y[i] - my);
	}
	return sum;

}

function computeInnerProduct(x:number[], y:number[]) {

	let sum = 0;
	for (let i = 0; i < x.length; i++) {
		sum += x[i] * y[i];
	}
	return sum;

}

function sum(x:number[]) {

	let sum = 0;
	for (let i = 0; i < x.length; i++) {
		sum += x[i];
	}
	return sum;

}

export function distanceCovariance(x:number[], y:number[]) {

	const n = x.length;
	let xIndexed = new Array<[number,number]>(n);
	for (let i = 0; i < n; i++) {
		xIndexed[i] = [x[i], i];
	}

	const xIndexSort = xIndexed.sort((a, b) => a[0] - b[0]);

	const xSort = new Array<number>(n);
	const xIndex = new Array<number>(n);
	for (let i = 0; i < n; i++) {
		xSort[i] = xIndexSort[i][0];
		xIndex[i] = xIndexSort[i][1];
	}
	const ySort = reorderByIndex(y, xIndex);

	const sx = computeCumulativeArray(xSort);
	const a = computeRowMean(xSort, sx);

	const v = new Array<number[]>(3);
	v[0] = new Array<number>(n);
	v[1] = new Array<number>(n);
	v[2] = new Array<number>(n);
	let idx = new Array<number[]>(2);
	idx[0] = new Array<number>(n);
	idx[1] = new Array<number>(n);
	let iv1 = new Array<number>(n);
	let iv2 = new Array<number>(n);
	let iv3 = new Array<number>(n);
	let iv4 = new Array<number>(n);

	for (let i = 0; i < n; i++) {
		v[0][i] = xSort[i];
		v[1][i] = ySort[i];
		v[2][i] = xSort[i] * ySort[i];
		idx[0][i] = i;
		idx[1][i] = -1;
		iv1[i] = 0;
		iv2[i] = 0;
		iv3[i] = 0;
		iv4[i] = 0;
	}

	let i = 0;
	let r = 0;
	let s = 1;

	const nless = n - 1;

	while (i < nless) {

		const gap = 2*(i + 1);
		let k = 0;
		const csumv = [
			[0].concat(computeCumulativeArray(reorderByIndex(v[0], idx[r]))),
			[0].concat(computeCumulativeArray(reorderByIndex(v[1], idx[r]))),
			[0].concat(computeCumulativeArray(reorderByIndex(v[2], idx[r])))
		]

		for (let j = 0; j < n; j += gap) {

			let st1 = j;
			let st2 = j + i + 1;

			const st1i = st1 + i;
			const st2i = st2 + i;
			const e1 = st1i <= nless ? st1i : nless;
			const e2 = st2i <= nless ? st2i : nless;

			

			while ((st1 <= e1) && (st2 <= e2)) {
				k++;
				const idx1 = idx[r][st1];
				const idx2 = idx[r][st2];

				if (ySort[idx1] >= ySort[idx2]) {
					idx[s][k-1] = idx1;
					st1++;
				} else {
					idx[s][k-1] = idx2;
					st2++;

					iv1[idx2] += e1 - st1 + 1;
					iv2[idx2] += csumv[0][e1 + 1] - csumv[0][st1];
					iv3[idx2] += csumv[1][e1 + 1] - csumv[1][st1];
					iv4[idx2] += csumv[2][e1 + 1] - csumv[2][st1];
				}
			}

			if (st1 <= e1) {
				const kf = e1 - st1 + 1;
				for (let l = 0; l < kf; l++) {
					idx[s][k+l] = idx[r][st1+l];
				}
				k += kf;
			} else if (st2 <= e2) {
				const kf = e2 - st2 + 1;
				for (let l = 0; l < kf; l++) {
					idx[s][k+l] = idx[r][st2+l];
				}
				k += kf;
			}
		}

		i = gap - 1;
		r = 1 - r;
		s = 1 - s;

	}

	const mx = sx[nless]/n;
	const my = sum(ySort)/n;

	const covterm = n * computeMeanDiffProduct(xSort,ySort,mx,my);

	const c1 = computeInnerProduct(iv1, v[2]);
	const c2 = sum(iv4);
	const c3 = computeInnerProduct(iv2, ySort);
	const c4 = computeInnerProduct(iv3, xSort);

	const d = 4 * (c1 + c2 - c3 - c4) - 2 * covterm;


	const ySort2 = reorderByIndex(ySort, idx[r].reverse());
	const sy = computeCumulativeArray(ySort2);
	const b = assignByIndexOrder(computeRowMean(ySort2, sy), idx[r]);
	

	const nsq = n**2;
	const ncb = nsq*n;
	const nq = ncb*n;
	const term1 = d / nsq;
	const term2 = 2 * computeInnerProduct(a,b) / ncb;
	const term3 = sum(a) * sum(b) / nq;

	return (term1 + term3 - term2);

}

export default function distanceCorrelation(x:number[], y:number[]) {

	return (Math.sqrt(distanceCovariance(x,y))) / Math.sqrt(Math.sqrt(distanceCovariance(x,x)) * Math.sqrt(distanceCovariance(y,y)));

}