var app = angular.module('app', []);

function donutChart(callback){
	var visitData1=[];
	var visitData2=[];
	var visitData3=[];

	app.controller('DonutCtrl', function ($http){
		$http.get('/initialTime')
		.success(function (number2){
			initMin = number2[0].minute;
			initHour = number2[0].hour;
			//initMin = 43;
			//initHour = 5;
			setInterval(function(){
				visitData1=[];
				visitData2=[];
				visitData3=[];
				$http.get('/visitCount/'+initMin+'/'+initHour)
				.success(function(data){
					visitData1.push(data.visit1);
					visitData2.push(data.visit2);
					visitData3.push(data.visit3);
					callback(visitData1, visitData2, visitData3);
				});
			},500);
		});
	});
}