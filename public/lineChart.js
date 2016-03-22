var app = angular.module('app', []);

function lineChart(callback){
	var initMin;
	var people5=[];
	var people10=[];
	var people15=[];
	var people20=[];

	app.controller('LineCtrl', function ($http){
		$http.get('/initialTime')
		.success(function (number2){
			//initMin = number2[0].minute;
			initMin = 43;
			$http.get('/time/stay/'+initMin+'/0')
			.success(function (record){
				people5.push(record.data5);
				people10.push(record.data10);
				people15.push(record.data15);
				people20.push(record.data20);
				$http.get('/time/stay/'+initMin+'/1')
				.success(function (record){
					people5.push(record.data5);
					people10.push(record.data10);
					people15.push(record.data15);
					people20.push(record.data20);
					$http.get('/time/stay/'+initMin+'/2')
					.success(function (record){
						people5.push(record.data5);
						people10.push(record.data10);
						people15.push(record.data15);
						people20.push(record.data20);
						$http.get('/time/stay/'+initMin+'/3')
						.success(function (record){
							people5.push(record.data5);
							people10.push(record.data10);
							people15.push(record.data15);
							people20.push(record.data20);
							$http.get('/time/stay/'+initMin+'/4')
							.success(function (record){
								people5.push(record.data5);
								people10.push(record.data10);
								people15.push(record.data15);
								people20.push(record.data20);
								$http.get('/time/stay/'+initMin+'/5')
								.success(function (record){
									people5.push(record.data5);
									people10.push(record.data10);
									people15.push(record.data15);
									people20.push(record.data20);
									$http.get('/time/stay/'+initMin+'/6')
									.success(function (record){
										people5.push(record.data5);
										people10.push(record.data10);
										people15.push(record.data15);
										people20.push(record.data20);
										$http.get('/time/stay/'+initMin+'/7')
										.success(function (record){
											people5.push(record.data5);
											people10.push(record.data10);
											people15.push(record.data15);
											people20.push(record.data20);
											$http.get('/time/stay/'+initMin+'/8')
											.success(function (record){
												people5.push(record.data5);
												people10.push(record.data10);
												people15.push(record.data15);
												people20.push(record.data20);
												$http.get('/time/stay/'+initMin+'/9')
												.success(function (record){
													people5.push(record.data5);
													people10.push(record.data10);
													people15.push(record.data15);
													people20.push(record.data20);
													callback(people5,people10,people15,people20);
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