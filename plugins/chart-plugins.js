//删除数组数据
function arrayRemoveItem(arry , item){
	var x = '';
    $.each(arry ,function(i, n){
        if(n ==item ){
        	temp=i;
        }
    });
    return arry.splice(x ,1);
}
//数组包含数据
function arrayContainItem(arry , item){
	var flag = false;
    $.each(arry ,function(i, n){
        if(n ==item ){
        	flag = true;
        	return false;
        }
    });
    return flag ;
}

//必需动态设置的属性
Highcharts.setOptions({
	global: {
		useUTC: false
		//timezoneOffset: -60 * (window.timeZone + 8) //设置时区偏差
	},	     
	colors: [
	  '#7cb5ec', '#f7a35c', '#90ed7d', '#8085e9', '#f15c80', '#e4d354', '#8085e8', '#8d4653', '#91e8e1', '#434348',  //Highcharts 4.x
	  '#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4', //demo
	  '#2f7ed8', '#0d233a', '#8bbc21', '#910000', '#1aadce', '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a',//Highcharts 3.x
	  '#4572A7', '#AA4643', '#89A54E', '#80699B', '#3D96AE', '#DB843D', '#92A8CD', '#A47D7C', '#B5CA92'  //Highcharts 2.x
	 ],
	credits: { enabled: false },
	lang: {
	  rangeSelectorFrom :'从',
	  rangeSelectorTo :'到',
	  rangeSelectorZoom : '',
      downloadJPEG:'导出为JPEG',
      downloadPDF:'导出为PDF',
      downloadPNG:'导出为PNG',
      downloadSVG:'导出为SVG',
      exportButtonTitle:'导出',
      printButtonTitle:'打印',
		months: ['一月', '二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],	
		shortMonths : ['1', '2','3','4','5','6','7','8','9','10','11','12'],		
		weekdays: ['周日','周一', '周二', '周三', '周四', '周五', '周六']
	}, 
	tooltip: {
		dateTimeLabelFormats: { 
			millisecond: '%m-%d %H:%M:%S',
			second: '%m-%d %H:%M:%S',
			minute: '%m-%d %H:%M',
			hour: '%m-%d %H:%M',
			day: '%Y-%m-%d',
			week: '%Y-%m-%d',
			month: '%Y-%m',
			year: '%Y'
		}
	},   			
	xAxis: {
		dateTimeLabelFormats: {
			millisecond: '%m-%d,%H:%M:%S.%L',
			second: '%m-%d %H:%M:%S',
			minute: '%m-%d %H:%M',
			hour: '%m-%d %H:%M',
			day: '%m-%d ',
			week: '%m-%d',
			month: '%Y-%m',
			year: '%Y'
		}
	}
});

//===============highstock图表start=========================	

//colors: ['#4572A7'蓝, '#AA4643'红, '#89A54E'绿,'#80699B'紫, '#3D96A浅蓝', '#DB843D黄', '#92A8CD雾蓝', '#A47D7C雾绿',	'#B5CA92雾棕']
	
//根据所选元素distinct
function distincByElement(inArray){
	var dic = {};
	$.each( inArray , function(i, field){
		 dic[field['recordTime']] = field;
		});
	var outArray=[];
	$.each( dic , function(n, v){
		outArray.push(v);
		});
	return outArray;
}


	function makeSeries(series){
		var colors = Highcharts.getOptions().colors;
		
		var tempPic=[];
		$.each(series, function(i,serie ){
			//去掉时间重复数据
			serie.items = distincByElement(serie.items);
			
			var picFFs= seriesOptions(serie, colors[i]);
			$.each(picFFs, function(i,picFF ){
				tempPic.push(picFF);
			});
			
		});

		return tempPic;
		
	}
	
//封装data数据==============================================

	function seriesOptions(serie, tipColor  ){		
		var resultSerie =[];
		var sonData=[];	
		var caculData=[];	
		var sonFlag=[];
			
		$.each(serie.items ,function(i,item){
			if(item.data != null ){
				sonData.push([item.recordTime, item.data ]);				
			}			
			var flag={};			
			//if(field[alarm_element]){			
				//flag['x']= Date.parse(DateFormat.parse(field[xzhou],'yyyy-MM-dd hh:mm:ss')) ;
				//flag['text']= '告警值：'+ new Number(field[alarm_element]).toFixed(4);
			//	flag['title']=  'A';
			///	sonFlag.push(flag);			
			//}		
		});
		if(serie.calculItems){
			$.each(serie.calculItems ,function(i,item){
				if(item.data!= null ){
					caculData.push([item.recordTime, item.data ]);
				}	
			});
		}
			
		
		if(serie.type=='dot'){	
			var tempserie = {id:'data'+serie.name, name: serie.name, data: sonData , lineWidth:0,marker : {enabled : true,  lineColor:tipColor ,radius : 2, lineWidth:2 ,fillColor:'#fff'}};
			resultSerie.push(tempserie);		
		}else if(serie.type=='line'){
			var tempserie = { name: serie.name , data: sonData ,  lineWidth : 1, color:tipColor , marker : {enabled : true, radius : 2} };
			resultSerie.push(tempserie);
			//添加告警flag
		/* 	resultData.push({type : 'flags', name:'告警', data : sonFlag1, onSeries : 'data'+serieText,	shape : 'circlepin', color : '#AA4643',fillColor : '#AA4643',  
				style : {color : 'white'}, 
				states : {hover : {	fillColor : '#AA4643'}	},
				width : 12, height:12	}); */			
		}
		//添加计算 数据点
		if(caculData.length > 0 ){
			var tempcacul = { name: serie.name+"cacul" , data: caculData ,  lineWidth : 1, color:tipColor , marker : {enabled : true, radius : 2} };
			resultSerie.push(tempcacul);
		}

		
		return resultSerie;	
	}
	

	
	
function showHighStock(chartObj) {

	 new Highcharts.StockChart({
		credits: { enabled: false },
		chart : {
			renderTo : chartObj.chartDiv
			//,    height: 500
		},
		title :{
			text : chartObj.titleText
		},
		rangeSelector : {
			buttons: [
			    {type: 'day', count: 3, text: '3d' },
				{type: 'week', count: 1, text: '1w'},
				{type: 'month', count: 1, text: '1m'}
			    ],
			selected : 1,
			inputEnabled: false
		},
		xAxis: {
			opposite :false,
			title: {
				text: chartObj.xAxisTitleText
			}
		},
		yAxis: {
			title: {
				text: chartObj.yAxisTitleText
			},
            labels: {
                align: 'right',
                x: -3
            }
		},
		tooltip: {
			xDateFormat : '%Y-%m-%d %H:%M',
            //crosshairs: true,
            //shared: true,
			valueDecimals: 3
	   },    			
		series :  makeSeries(chartObj.series)			
		
	}); 
	
}  		

//=====================================================================================================


function showHighCharts(chartObj) {
	
	new Highcharts.Chart({
		credits: { enabled: false },
        chart: {
            renderTo: chartObj.chartDiv 
        },
        title: {
            text: chartObj.titleText
        },
        xAxis: {
            //categories: chartObj.categories
        },
        yAxis: {
            title: {
                text: chartObj.yAxisTitleText
            },
            labels: {
                formatter: function() {
                    return this.value ;
                }
            }
        },
        tooltip: {
            crosshairs: true,
            valueDecimals: 3,
            shared: true
        },
        plotOptions: {
            spline: {
                marker: {
                    radius: 2,
                    lineColor: '#666666',
                    lineWidth: 1
                }
            }
        },
        series: makeSeries(chartObj.series)
    });

}
//=====================================================================================================
/**
 * Highcharts plugin for axis crossing at specific value
 * Last revision: 2013-06-10
 * Note: xAxis must have opposite: true
 */

(function (H) {
    H.wrap(H.Axis.prototype, 'render', function (proceed) {
        var chart = this.chart, 
        otherAxis;  
        
        if (typeof this.options.crossing === 'number') {
            otherAxis = chart[this.isXAxis ? 'yAxis' : 'xAxis'][0];
			this.offset = otherAxis.toPixels(this.options.crossing, true);
            chart.axisOffset[this.side] = 10;
            //console.log(this.offset);
        }
        proceed.call(this);
        
    });
    
}(Highcharts));
