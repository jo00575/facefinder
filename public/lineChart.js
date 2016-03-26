var app = angular.module('app', []);

function lineChart(callback){
	var initMin;
	var people5=[];
	var people10=[];
	var people15=[];
	var people20=[];
	var labels=[];

	app.controller('LineCtrl', function ($http){
		$http.get('/initialTime')
		.success(function (number2){
			initMin = number2[0].minute;
			initHour = number2[0].hour;
			//initMin = 43;
			//initHour = 5;

			stringMake(initHour, initMin, 0, function(data){
				labels.push(data);
				stringMake(initHour, initMin, 1, function(data){
					labels.push(data);
					stringMake(initHour, initMin, 2, function(data){
						labels.push(data);
						stringMake(initHour, initMin, 3, function(data){
							labels.push(data);
							stringMake(initHour, initMin, 4, function(data){
								labels.push(data);
								stringMake(initHour, initMin, 5, function(data){
									labels.push(data);
									stringMake(initHour, initMin, 6, function(data){
										labels.push(data);
										stringMake(initHour, initMin, 7, function(data){
											labels.push(data);
											stringMake(initHour, initMin, 8, function(data){
												labels.push(data);
												stringMake(initHour, initMin, 9, function(data){
													labels.push(data);
												});
											});
										});
									});
								});
							});
						});
					});
				});
			});
			$http.get('/time/stay/'+initHour+'/'+initMin+'/0')
			.success(function (record){
				people5.push(record.data5);
				people10.push(record.data10);
				people15.push(record.data15);
				people20.push(record.data20);
				$http.get('/time/stay/'+initHour+'/'+initMin+'/1')
				.success(function (record){
					people5.push(record.data5);
					people10.push(record.data10);
					people15.push(record.data15);
					people20.push(record.data20);
					$http.get('/time/stay/'+initHour+'/'+initMin+'/2')
					.success(function (record){
						people5.push(record.data5);
						people10.push(record.data10);
						people15.push(record.data15);
						people20.push(record.data20);
						$http.get('/time/stay/'+initHour+'/'+initMin+'/3')
						.success(function (record){
							people5.push(record.data5);
							people10.push(record.data10);
							people15.push(record.data15);
							people20.push(record.data20);
							$http.get('/time/stay/'+initHour+'/'+initMin+'/4')
							.success(function (record){
								people5.push(record.data5);
								people10.push(record.data10);
								people15.push(record.data15);
								people20.push(record.data20);
								$http.get('/time/stay/'+initHour+'/'+initMin+'/5')
								.success(function (record){
									people5.push(record.data5);
									people10.push(record.data10);
									people15.push(record.data15);
									people20.push(record.data20);
									$http.get('/time/stay/'+initHour+'/'+initMin+'/6')
									.success(function (record){
										people5.push(record.data5);
										people10.push(record.data10);
										people15.push(record.data15);
										people20.push(record.data20);
										$http.get('/time/stay/'+initHour+'/'+initMin+'/7')
										.success(function (record){
											people5.push(record.data5);
											people10.push(record.data10);
											people15.push(record.data15);
											people20.push(record.data20);
											$http.get('/time/stay/'+initHour+'/'+initMin+'/8')
											.success(function (record){
												people5.push(record.data5);
												people10.push(record.data10);
												people15.push(record.data15);
												people20.push(record.data20);
												$http.get('/time/stay/'+initHour+'/'+initMin+'/9')
												.success(function (record){
													people5.push(record.data5);
													people10.push(record.data10);
													people15.push(record.data15);
													people20.push(record.data20);
													callback(people5,people10,people15,people20, labels);
												});
											});
										});
									});
								});
							});
						});
					});
				});
			});
		});
	});
}

function stringMake(hour, min, num, callback){
	var temp = min+num;
	if(temp >= 60){
		var data = (hour+1)+':0'+(temp-60);
		callback(data);
	}
	else{
		if(temp < 10)
			temp = '0'+temp;
		var data = hour + ':' + temp;
		callback(data);
	}
}