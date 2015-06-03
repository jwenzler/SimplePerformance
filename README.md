# SimplePerformance
A very simple javascript performance tester.

Simple examples

```javascript
Performance.wrap("Calculate sum of n where n = 1 to 100,000", function() {
	var total = 0;
	for (var i=0; i<=100000;i++) {
		total += i;
	}
});

Performance.wrap("Calculate sum of n where n = 1 to 1,000,000", function() {
	var total = 0;
	for (var i=0; i<=1000000;i++) {
		total += i;
	}
});

for (var j=0;j<100;j++) {
	Performance.wrap("Calculate sum of n where n = 1 to Math.random()*100000000", function() {
		var total = 0;
		for (var i=0; i<=Math.random()*100000000;i++) {
			total += i;
		}
		console.log(total);
	});
}

Performance.display();

```

This will perform all of the above functions and store information about their performance. 

Performance.display() will then display some basic performance info to the console.

```
------------------------------------
          PERFORMANCE DATA           
------------------------------------
------------------------------------
Action: Calculate sum of n where n = 1 to 100,000
Avg Time: 1458 μs
Min Time: 1458 μs
Max Time: 1458 μs
Sway: 0%
Occurences: 1
------------------------------------
Action: Calculate sum of n where n = 1 to 1,000,000
Avg Time: 2630 μs
Min Time: 2630 μs
Max Time: 2630 μs
Sway: 0%
Occurences: 1
------------------------------------
Action: Calculate sum of n where n = 1 to Math.random()*100000000
Avg Time: 279 μs
Min Time: 15 μs
Max Time: 1296 μs
Sway: 460%
Occurences: 100
------------------------------------
```

#NOTE: To use this with Node you will need: 
https://www.npmjs.com/package/perfnow

```
npm install performance-now
```
