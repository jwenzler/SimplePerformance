var Performance = function() {
    var pub = {};
    var pri = {};   
    
    pub.monitors = {};
    
    pub.wrap = function(name, fxn) {
    	pri.startMonitor(name);
    	var ret = fxn();
    	pri.endMonitor(name);
    	return ret;
    }
    
    pri.startMonitor = function(name) {
    	//Create an object if it doesn't exist
    	if (typeof pub.monitors[name] == "undefined") pub.monitors[name] = {};
    	
    	//Start log
    	pub.monitors[name].lastStart = performance.now();
    }
    
    pri.endMonitor = function(name) {
    	var mon = pub.monitors[name];
    	
    	//Create array if it doesn't exist
    	if (typeof mon.times == "undefined") mon.times = [];
    	
    	//End log
    	var lastTime = performance.now() - mon.lastStart;
    	mon.times.push(lastTime);
    	pri.calculateMonitor(mon);
    	
    	//If performance seems odd, show user
		var lastTimeFormat = (lastTime>10000) ? Math.round(lastTime)+" ms" : Math.round(lastTime*1000)+" μs";
    	var sway = name+": sway="+mon.lastSway+"% @ "+lastTimeFormat;
    	if (mon.lastSway > 150) {
    		console.warn(sway);
    	} else if (mon.lastSway > 400) {
    		console.warn(sway);
    	}
    }
    
    pri.calculateMonitor = function(mon){
		mon.avg = d3.mean(mon.times, function(d){return d*1;})*1000;
		mon.min = d3.min(mon.times, function(d){return d*1;})*1000;
		mon.max = d3.max(mon.times, function(d){return d*1;})*1000;
		mon.sway = Math.round(((mon.max-mon.min)/mon.avg)*100);	
		var lastTime = mon.times[mon.times.length-1]*1000;
		mon.lastSway = Math.round(((lastTime-mon.min)/mon.avg)*100);	
    }
    
    pub.calculate = function(){
    	for (i in pub.monitors) {
    		var mon = pub.monitors[i];
    		pri.calculateMonitor(mon);
    	};
    }
    
    pub.display = function(){
    	
    	pub.calculate();
    	
    	console.log("------------------------------------");
    	console.log("          PERFORMANCE DATA           ");
    	console.log("------------------------------------");
    	for (i in pub.monitors) {
    		var mon = pub.monitors[i];
    		console.log("------------------------------------");
    		console.log("Action: "+i);
    		var avgTime = (mon.avg>10000) ? Math.round(mon.avg/1000)+" ms" : Math.round(mon.avg)+" μs";
    		var minTime = (mon.min>10000) ? Math.round(mon.min/1000)+" ms" : Math.round(mon.min)+" μs";
    		var maxTime = (mon.max>10000) ? Math.round(mon.max/1000)+" ms" : Math.round(mon.max)+" μs";
    		var sway = "Sway: "+mon.sway+"%";
    		
    		console.log("Avg Time: "+avgTime);
    		console.log("Min Time: "+minTime);
    		console.log("Max Time: "+maxTime);
    		if (mon.sway < 150) {
    			console.log(sway);
    		} else if (mon.sway < 400){
    			console.warn(sway);
    		} else {
    			console.error(sway);
    		}
    		console.log("Occurences: "+mon.times.length)
    	};
    	console.log("------------------------------------");
    	
    	return null;
    }
    
    return pub;
}();