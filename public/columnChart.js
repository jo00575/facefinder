var app = angular.module('app', []);

function columnChart(callback){
	var initMin;
	var peopleData=[];

	app.controller('ColumnCtrl', function ($http){
		$http.get('/initialTime')
		.success(function (number2){
			//initMin = number2[0].minute;
			initMin = 43;

			$http.get('/time/people/'+initMin+'/0')
			.success(function (people){
				peopleData.push(people.length);
				$http.get('/time/people/'+initMin+'/1')
				.success(function (people){
					peopleData.push(people.length);
					$http.get('/time/people/'+initMin+'/2')
					.success(function (people){
						peopleData.push(people.length);
						$http.get('/time/people/'+initMin+'/3')
						.success(function (people){
							peopleData.push(people.length);
							$http.get('/time/people/'+initMin+'/4')
							.success(function (people){
								peopleData.push(people.length);
								$http.get('/time/people/'+initMin+'/5')
								.success(function (people){
									peopleData.push(people.length);
									$http.get('/time/people/'+initMin+'/6')
									.success(function (people){
										peopleData.push(people.length);
										$http.get('/time/people/'+initMin+'/7')
										.success(function (people){
											peopleData.push(people.length);
											$http.get('/time/people/'+initMin+'/8')
											.success(function (people){
												peopleData.push(people.length);
												$http.get('/time/people/'+initMin+'/9')
												.success(function (people){
													peopleData.push(people.length);
													callback(peopleData);
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
