$(function(){
	var allKey = $(".calc-wrap li");
	var conditionShow = $(".condition-show");
	var chooesData = null;

	/* 关闭面板 */
	$(".close-panel").on("click", function(){
		$(".calc-container").remove();
	 	$(".mask").remove();
	})

	$(window).on("resize", function(){
	 	posCala();
	})

	posCala();
	function posCala(){
	 	var oMargin = ($(window).height() - $(".calc-container").innerHeight()) / 2;
	 	$(".calc-container").css("margin-top", oMargin);
	}

	/* 获取点击的数据 */
	allKey.on("click",function(){
		var keyVal = $(this).attr("data-val");

		switch(keyVal){
			case "delete":
				var reg = /MaxEdge$|MidEdge$|MinEdge$|Weight$/; 
				
				var regNum = /\d|=|>|<|\./;
				if(regNum.test($(".show-box").val().substring($(".show-box").val().length-1))){

					$(".show-box").val($(".show-box").val().substring(0,$(".show-box").val().length-1));
				}else{
					$(".show-box").val($(".show-box").val().replace(reg,""));
				}
				
			break;
			case "And":
				addData("And");
			break;
			case "Or":
				addData("Or");
			break;
			case "Enter":
				if($(".show-box")[0].value != "" && $(".condition-show").children().length != ""){
					if($(".condition-show").children().length % 3 == 0 || ($(".condition-show").children().length - 1) % 3 == 0 )
					{
						return;
					}
					addContItem();
				}else{
					return;
				}
			break;
			default:
				$(".show-box").val($(".show-box").val()+keyVal);	
		}

		/* 添加右侧数据函数 针对And与Or两项做处理*/
		function addData(Symbol){
			if($(".show-box")[0].value != ""){
				if(!($(".condition-show").children().length % 3 == 0)){
					if($(".condition-show").children().length % 3 == 1){
						addContItem(Symbol);
					}
					return;
				}else{
					addContItem(Symbol);
				}
			}else{
				return;
			}
		}
	})

	/* 添加条件项函数 */
	function addContItem(condition){
		chooesData = $(".show-box").val();
		var str = $('<a class="condition-flag" href="javascript:;">'+chooesData+'<i></i></a>');
		
		if(conditionShow.children().length % 3 == 0 ){
			conditionShow.append(str);
			conditionShow.append($('<span class="condition-flag">'+condition+'</span>'));
		}else if(conditionShow.children().length % 3 == 1){ 
			conditionShow.append($('<span class="condition-flag">'+condition+'</span>'));
			conditionShow.append(str);
		}else{
			conditionShow.append(str);
		}
		$(".show-box").val("");
	}
      
	/* 删除条件项 */ 
	$(".condition-show").on("click","i",function(){
		var delConti = $(".condition-show").find("span");
		
		var _index = $(".condition-show").children().index($(this).parent());
		
		if(_index % 3 == 0){
			$(this).parent().next("span").remove();
		}else{
			$(this).parent().prev("span").remove();
		}
			
		$(this).parent().remove();
	})

	// 获取单位
	$(".calc-company input").each(function(index,element){
		getCompany($(this));
	})
	
	$(".calc-company input").on("click", function(){
		getCompany($(this));
	})

	function getCompany(obj){
		var chooesStr = "";
		if(obj.is(":checked")){
			var company = obj.parent().parent().find("label").html();
			chooesStr = company+""+obj.val();
			// 获取用户所选(默认)单位
			console.log(chooesStr);
		}
	}

	//获取用户输入的数据
	$(".storage").on("click", function(){

		if($(".condition-show")[0].children.length != 0){
			var dataArr = [];
			var dataEle = $(".condition-show").children();
			dataEle.each(function(index, element){
				dataArr.push($(this).text());
			})
			for(var i = 0; i < dataArr.length; i++){
				if(dataArr[i] == "And"){
					dataArr.splice(i,1,"&&");
				}else if(dataArr[i] == "Or"){
					dataArr.splice(i,1,"||");
				}
			}

			// 获取数据并清空
			console.log(dataArr.join(" ")); 
			$(".condition-show").empty();

		}else{
			return;
		}
	});		
})