var weather;
var city;
// 请求太原天气情况
$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/data/?city=太原",
	dataType:"jsonp",
	type:"get",
	success:function(obj){
		weather=obj.data.weather;
		console.log(weather);
	}
})
// 请求城市
$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/city/",
	dataType:"jsonp",
	type:"get",
	success:function(obj){
		city=obj.data;
		console.log(obj);
	}
})

//渲染数据
function updata(){
	// 当前城市
    var cityName=document.getElementsByClassName("header")[0];
    cityName.innerHTML=weather.city_name;
    // 当前空气
    var city1=document.getElementsByTagName("h3")[0];
    city1.innerHTML=weather.quality_level;
    // 当前温度
    var citytem=document.getElementsByClassName("temperature")[0];
    citytem.innerHTML=weather.current_temperature+"°";
    // 当前天气
    var citywea=document.getElementsByClassName("weather")[0];
    citywea.innerHTML=weather.dat_condition;
    //当前风向
    var citywind=document.getElementsByClassName("wind_direction")[0];
    citywind.innerHTML=weather.wind_direction;
    //当前最高温
    var dat_high_temperature=document.getElementById("dat_high_temperature");
    dat_high_temperature.innerHTML=weather.dat_high_temperature; 
    //当前最低温
    var dat_low_temperature=document.getElementById("dat_low_temperature");
    dat_low_temperature.innerHTML=weather.dat_low_temperature;
    var weather1=document.getElementsByClassName("weather1")[0];
    weather1.innerHTML=weather.dat_condition;
    // 今天的图片
    var dat_weather_icon_id=document.getElementById("dat_weather_icon_id");
    dat_weather_icon_id.style=`background-image:url(img/${weather.dat_weather_icon_id}.png);`;
    // 明天最高温
    var tomorrow_high_temperature=document.getElementById("tomorrow_high_temperature");
    tomorrow_high_temperature.innerHTML=weather.tomorrow_high_temperature; 
    //明天最低温
    var tomorrow_low_temperature=document.getElementById("tomorrow_low_temperature");
    tomorrow_low_temperature.innerHTML=weather.tomorrow_low_temperature;
    var tomorrow_condition=document.getElementById("tomorrow_condition");
    tomorrow_condition.innerHTML=weather.tomorrow_condition;
    // 明天的图片
    var tomorrow_weather_icon_id=document.getElementById("tomorrow_weather_icon_id");
    tomorrow_weather_icon_id.style=`background-image:url(img/${weather.tomorrow_weather_icon_id}.png);`;
    
    // console.log(weather.hourly_forecast);
    for(var i in weather.hourly_forecast){
    	// 创建父元素div
    	var now=document.createElement("div");
    	// 给父元素div加样式
    	now.className="now";
    	// 获取now的父元素
    	var nowp=document.getElementById("now");
    	// 把now插入到父元素中
    	nowp.appendChild(now);

    	var now_time=document.createElement("h2");
    	now_time.className="now_time";
    	now_time.innerHTML=weather.hourly_forecast[i].hour+":00";
    	now.appendChild(now_time);

    	var now_icon=document.createElement("div");
    	now_icon.className="now_icon";
    	now_icon.style=`background-image:url(img/${weather.hourly_forecast[i].weather_icon_id}.png);`;
    	now.appendChild(now_icon);

    	var temperature=document.createElement("h3");
    	temperature.className="now_temperature";
    	temperature.innerHTML=weather.hourly_forecast[i].temperature+"°";
    	now.appendChild(temperature);
    }
    for(var j in weather.forecast_list){
    	var forecast_list=document.createElement("div");
    	forecast_list.className="forecast_list";
    	var forecast_listp=document.getElementById("forecast_list")
    	forecast_listp.appendChild(forecast_list);

        var data=document.createElement("div");
    	data.className="data";
    	data.innerHTML=weather.forecast_list[j].date.substring(5,7)+"/"+weather.forecast_list[j].date.substring(8);
        forecast_list.appendChild(data);

    	var condition=document.createElement("h2");
    	condition.className="condition";
    	condition.innerHTML=weather.forecast_list[j].condition;
    	forecast_list.appendChild(condition);

    	var weather_icon_id=document.createElement("weather_icon_id");
    	weather_icon_id.className="weather_icon_id";
    	weather_icon_id.style=`background-image:url(img/${weather.forecast_list[j].weather_icon_id}.png);`;
    	forecast_list.appendChild(weather_icon_id);


    	var high_temperature=document.createElement("high_temperature");
    	high_temperature.className="high_temperature";
    	high_temperature.innerHTML=weather.forecast_list[j].high_temperature+"°";
    	forecast_list.appendChild(high_temperature);

    	var low_temperature=document.createElement("low_temperature");
    	low_temperature.className="low_temperature";
    	low_temperature.innerHTML=weather.forecast_list[j].low_temperature+"°";
    	forecast_list.appendChild(low_temperature);

    	var wind_direction=document.createElement("wind_direction");
    	wind_direction.className="wind_direction";
    	wind_direction.innerHTML=weather.forecast_list[j].wind_direction;
    	forecast_list.appendChild(wind_direction);

    	var wind_level=document.createElement("wind_level");
    	wind_level.className="wind_level";
    	wind_level.innerHTML=weather.forecast_list[j].wind_level+"级";
    	forecast_list.appendChild(wind_level);
    }

        var header=document.getElementsByClassName("header")[0];
        var city_box=document.getElementsByClassName("city_box")[0];

        header.onclick=function(){
        	$(".text").val("");
        	$(".buttom").html("取消");
        	city_box.style="display:block";
        }

    // 渲染城市
    for(var k in city){
		// console.log(k);
		var cityp=document.getElementById("city");
		var title=document.createElement("h1");
		title.className="title";
		title.innerHTML=k;
		cityp.appendChild(title);

		var con=document.createElement("div");
		con.className="con";
		// 二级城市
		for(var y in city[k]){
			// console.log(y);
			var erji=document.createElement("div");
			erji.className="son";
			erji.innerHTML=y;
			con.appendChild(erji);
	    }
	    cityp.appendChild(con);
    }

}


// 查找各城市天气信息
function AJAX(str){
	// 各个城市天气情况
	$.ajax({
		url:`https://www.toutiao.com/stream/widget/local_weather/data/?city=${str}`,
		dataType:"jsonp",
		type:"get",
		success:function(obj){
			weather=obj.data.weather;
			// 渲染
			updata();
			$(".city_box").css({"display":"none"});
		}
    })
}
//当页面加载完成执行的代码
window.onload=function(){
    updata();
    // 
    $(".son").on("click",function(){
    	var cityh=this.innerHTML;
    	AJAX(cityh);
    })

    // 当input获取焦点，button变确认
    // focus 获取焦点
    // html 设置或改变元素的内容
    $(".text").on("focus",function(){
        $(".button").html("确认");
    })
    // 操作按钮
    var button=document.getElementsByClassName("button")[0];
    console.log(button);

    button.onclick=function(){
    	// 获取button重的内容
    	var btn=this.innerHTML;
    	if(btn=="取消"){
    		var city_box=document.getElementsByClassName("city_box")[0];
    		city_box.style="display:none";
    	}
    	else{
    		var str=document.getElementsByClassName("text")[0].value;
    		console.log(str);
    		for(var i in city){
    			if(i==str){
    				AJAX(str);
    				return;
    			}else{
    				for(var j in city[i]){
    					// console.log(j)
    					if(j==str){
    						AJAX(str);
    						return;
    					}
    				}
    			} 
    		}
    		alert("没有该城市的气象天气");
    	}	
    }
}