var routes = [
	{
		path: '/',
		component: {
			template: `
				<div>
					<h1>首页</h1>
				</div>
			`
		}
	},
	{
		path: '/login',
		component:{
			template: `
				<div>
					<h1>登录</h1>
				</div>
			`
		}
	},
	{
		path: '/post',
		component: {
			template: `
				<div>
					<h1>帖子管理</h1>
				</div>
			`
		}
	}
]

var router = new VueRouter({
	routes : routes
});

router.beforeEach(function(to, from , next){
	var logged_in = true;
	if(!logged_in && to.path == "/post"){
		next('/login');
	}else{
		next();
	}
})

new Vue({
	el: "#app",
	router: router
})