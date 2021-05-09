# distance-correlation-fast

Performs distance correlation in around O(n lg(n)) time.

Distance correlation is a very appropriate method for getting the correlation between two sets of numbers when the correlation may or may not be linear.

Please avoid the Pearson or the Spearman rho for these purposes, use this instead.

For more reading about various correlation methods, I recommend https://m-clark.github.io/docs/CorrelationComparison.pdf

Traditionally, a limitation of distance correlation has been that it has only been computable in O(n^2) time.

However, in recent years O(n lg(n)) algorithms have been found.

This library uses the O(n lg(n)) algorithm of Arin Chaudhuri and Wenhao Hu of the SAS institute.

Their paper on this algorithm can be accessed here: https://arxiv.org/pdf/1810.11332.pdf

However I believe this implementation might be slightly slower for various reasons. It is, however, still far faster than O(n^2)


To use, simply install with `yarn add distance-correlation-fast` or `npm i distance-correlation-fast`, then use:
```ts
import distanceCorrelation from "distance-correlation-fast";
console.log(distanceCorrelation(x,y)) //0-1
```

As a result of being O(n lg(n)), this library performs far better than `distance-correlation`.

Here is a basic benchmark result, though note that it wasn't exactly scientific. The differences are big enough that it is clear though.

There are some slight differences to the result, but that is simply because of floating point math. The operations are normally equivalent.

| (index) | distance-correlation | distance-correlation-fast | distance-correlation-result | distance-correlation-fast-result |
|---------|----------------------|---------------------------|-----------------------------|----------------------------------|
|   10    |        '1 ms'        |          '0 ms'           |     0.4898562093920331      |       0.48985620939203356        |
|   100   |        '6 ms'        |          '2 ms'           |     0.2244221894135614      |       0.22442218941356748        |
|  1000   |       '47 ms'        |          '15 ms'          |     0.04386004835225739     |       0.04386004835217815        |
|  10000  |      '3365 ms'       |         '128 ms'          |    0.014794254884836001     |       0.014794254885692014       |
|  20000  |      '5748 ms'       |         '191 ms'          |     0.00746265078923838     |       0.007462650788729342       |
|  30000  |      '14221 ms'      |         '154 ms'          |    0.009445588609526505     |       0.009445588604352323       |
|  40000  |      '25188 ms'      |         '245 ms'          |    0.006753041558315111     |      0.0067530415598551444       |
|  50000  |      '82184 ms'      |         '295 ms'          |    0.007388288289726608     |       0.007388288298405638       |
| 100000  |         '--'         |         '648 ms'          |             -1              |       0.004515544359417369       |
| 200000  |         '--'         |         '1474 ms'         |             -1              |      0.0022154920842022297       |
| 500000  |         '--'         |         '4326 ms'         |             -1              |       0.00148175876298925        |
| 1000000 |         '--'         |        '10504 ms'         |             -1              |      0.0018096514306481354       |
| 2000000 |         '--'         |        '26608 ms'         |             -1              |      0.0010204620547444201       |
| 3000000 |         '--'         |        '47139 ms'         |             -1              |      0.0008061945878161586       |
| 4000000 |         '--'         |        '72399 ms'         |             -1              |      0.0007994542065281887       |
| 5000000 |         '--'         |        '101520 ms'        |             -1              |      0.0007128976429778718       |
