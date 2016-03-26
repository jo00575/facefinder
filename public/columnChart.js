var app = angular.module('app', []);

function columnChart(callback){
	var initMin;
	var initHour;
	var peopleData=[];
	var labels=[];

	app.controller('ColumnCtrl', function ($http){
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

			$http.get('/time/people/'+initHour+'/'+initMin+'/0')
			.success(function (people){
				peopleData.push(people.length);
				$http.get('/time/people/'+initHour+'/'+initMin+'/1')
				.success(function (people){
					peopleData.push(people.length);
					$http.get('/time/people/'+initHour+'/'+initMin+'/2')
					.success(function (people){
						peopleData.push(people.length);
						$http.get('/time/people/'+initHour+'/'+initMin+'/3')
						.success(function (people){
							peopleData.push(people.length);
							$http.get('/time/people/'+initHour+'/'+initMin+'/4')
							.success(function (people){
								peopleData.push(people.length);
								$http.get('/time/people/'+initHour+'/'+initMin+'/5')
								.success(function (people){
									peopleData.push(people.length);
									$http.get('/time/people/'+initHour+'/'+initMin+'/6')
									.success(function (people){
										peopleData.push(people.length);
										$http.get('/time/people/'+initHour+'/'+initMin+'/7')
										.success(function (people){
											peopleData.push(people.length);
											$http.get('/time/people/'+initHour+'/'+initMin+'/8')
											.success(function (people){
												peopleData.push(people.length);
												$http.get('/time/people/'+initHour+'/'+initMin+'/9')
												.success(function (people){
													peopleData.push(people.length);
													callback(peopleData, labels);
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