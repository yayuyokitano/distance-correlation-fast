# distance-correlation-fast

Performs distance correlation in around O(n lg(n)) time.

Distance correlation is a very appropriate method for getting the correlation between two sets of numbers when the correlation may or may not be linear.

Please avoid the Pearson or the Spearman rho for these purposes, use this instead.

For more reading about various correlation methods, I recommend https://m-clark.github.io/docs/CorrelationComparison.pdf

Traditionally, a limitation of distance correlation has been that it has only been computable in O(n^2) time.

However, in recent years O(n lg(n)) algorithms have been found.

This library uses the O(n lg(n)) algorithm of Arin Chaudhuri and Wenhao Hu of the SAS institute.

Their paper on this algorithm can be accessed here: https://arxiv.org/pdf/1810.11332.pdf

There might be some difference from the algorithm complexity due to implementation, but I think it might no longer be the case.

This is a purely TS library, not native.

To use, simply install with `yarn add distance-correlation-fast` or `npm i distance-correlation-fast`, then use:
```ts
import distanceCorrelation from "distance-correlation-fast";
console.log(distanceCorrelation(x,y)) //0-1
```

As a result of being O(n lg(n)), this library performs far better than `distance-correlation`.

Here is a basic benchmark result, though note that it wasn't exactly scientific. The differences are big enough that it is clear though.

There are some slight differences to the result, but that is simply because of floating point math. The operations are normally equivalent.

| (index)  | distance-correlation | distance-correlation-fast | distance-correlation-result | distance-correlation-fast-result |
|----------|----------------------|---------------------------|-----------------------------|----------------------------------|
|    10    |        '1 ms'        |          '1 ms'           |     0.5747830105244421      |        0.5747830105244454        |
|   100    |        '6 ms'        |          '2 ms'           |     0.19744451245203617     |       0.19744451245202876        |
|   1000   |       '48 ms'        |          '14 ms'          |     0.05169451778595419     |       0.051694517785985133       |
|  10000   |      '1536 ms'       |         '110 ms'          |    0.013863197314888316     |       0.01386319731627763        |
|  20000   |      '5713 ms'       |         '149 ms'          |    0.008901539969255705     |       0.008901539962876669       |
|  30000   |      '14121 ms'      |         '114 ms'          |    0.012292353476485062     |       0.012292353475511308       |
|  40000   |      '25096 ms'      |         '151 ms'          |    0.011822971901799584     |       0.011822971902881054       |
|  50000   |      '82462 ms'      |         '190 ms'          |    0.006029711340305374     |       0.006029711342246058       |
|  100000  |         '--'         |         '439 ms'          |             -1              |       0.005114315938060392       |
|  200000  |         '--'         |         '960 ms'          |             -1              |       0.002527787500522957       |
|  500000  |         '--'         |         '2771 ms'         |             -1              |      0.0035845709831482924       |
| 1000000  |         '--'         |         '5950 ms'         |             -1              |      0.0014530022694211207       |
| 2000000  |         '--'         |        '13342 ms'         |             -1              |      0.0008087837565719341       |
| 3000000  |         '--'         |        '21525 ms'         |             -1              |      0.0011251886693957884       |
| 4000000  |         '--'         |        '28751 ms'         |             -1              |      0.0008083368517333731       |
| 5000000  |         '--'         |        '37530 ms'         |             -1              |      0.0007008802813679654       |
| 10000000 |         '--'         |        '82341 ms'         |             -1              |      0.0003942226553583085       |
