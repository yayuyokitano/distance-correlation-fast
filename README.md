# distance-correlation-fast

Performs distance correlation in around O(n lg(n)) time.

Distance correlation is a very appropriate method for getting the correlation between two sets of numbers when the correlation may or may not be linear.

Please avoid the Pearson or the Spearman rho for these purposes, use this instead.

For more reading about various correlation methods, I recommend https://m-clark.github.io/docs/CorrelationComparison.pdf

Traditionally, a limitation of distance correlation has been that it has only been computable in O(n^2) time.

However, in recent years O(n lg(n)) algorithms have been found.

This library uses the O(n lg(n)) algorithm of Arin Chaudhuri and Wenhao Hu of the SAS institute.

Their paper on this algorithm can be accessed here: https://arxiv.org/pdf/1810.11332.pdf

However I believe this implementation might be slightly slower for various reasons. It is, however, still far faster than O(n^2).

This is a purely TS library, not native.

To use, simply install with `yarn add distance-correlation-fast` or `npm i distance-correlation-fast`, then use:
```ts
import distanceCorrelation from "distance-correlation-fast";
console.log(distanceCorrelation(x,y)) //0-1
```

As a result of being O(n lg(n)), this library performs far better than `distance-correlation`.

Here is a basic benchmark result, though note that it wasn't exactly scientific. The differences are big enough that it is clear though.

There are some slight differences to the result, but that is simply because of floating point math. The operations are normally equivalent.

| iterations | distance-correlation | distance-correlation-fast | distance-correlation-result | distance-correlation-fast-result |
|------------|----------------------|---------------------------|-----------------------------|----------------------------------|
|    10      |        '1 ms'        |          '1 ms'           |      0.382825287690042      |        0.3828252876900454        |
|    100     |        '6 ms'        |          '2 ms'           |     0.13829996604117056     |       0.13829996604116315        |
|   1000     |       '50 ms'        |          '15 ms'          |     0.03628753210507448     |       0.036287532105186635       |
|   10000    |      '1549 ms'       |         '114 ms'          |     0.02095419967874481     |       0.020954199678122964       |
|   20000    |      '5818 ms'       |         '175 ms'          |    0.016086395312417248     |       0.016086395312258472       |
|   30000    |      '14288 ms'      |         '134 ms'          |    0.015620504059051582     |       0.015620504059304258       |
|   40000    |      '25449 ms'      |         '179 ms'          |    0.009919314920790408     |       0.009919314924033206       |
|   50000    |      '83536 ms'      |         '205 ms'          |    0.014774905864089687     |       0.014774905865482699       |
|  100000    |         '--'         |         '508 ms'          |             -1              |       0.004405316342355193       |
|  200000    |         '--'         |         '1072 ms'         |             -1              |       0.002828554074877791       |
|  500000    |         '--'         |         '3038 ms'         |             -1              |       0.004200976314319337       |
|  1000000   |         '--'         |         '6875 ms'         |             -1              |      0.0014860766319187509       |
|  2000000   |         '--'         |        '14726 ms'         |             -1              |      0.0008937027074066065       |
|  3000000   |         '--'         |        '23555 ms'         |             -1              |      0.0008617030226743158       |
|  4000000   |         '--'         |        '32270 ms'         |             -1              |      0.0007113003632073607       |
|  5000000   |         '--'         |        '43564 ms'         |             -1              |      0.0005252420613586389       |
