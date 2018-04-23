var routes = [
	{
		path: '/',
		component:{
			template: `
				<div>
					<h1>首页</h1>
				</div>
			`
		}
	},
	{
		path: '/user',
		components: {
			sidebar: {
				template: `
					<div>
						<ul>
							<li>用户管理</li>
							<li>权限管理</li>
						</ul>
					</div>
				`
			},
			content: {
				template: `
					<div>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia molestias repellat excepturi, perspiciatis voluptatem totam adipisci, aliquid nam possimus quas ipsam, quis, eos beatae voluptate! Molestias, minus. Officia, nisi, ex!
					</div>
				`
			}
		}
	},
	{
		path: '/post',
		components: {
			sidebar: {
				template: `
					<div>
						<ul>
							<li>用户管理</li>
							<li>文章管理</li>
						</ul>
					</div>
				`
			},
			content: {
				template: `
					<div>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia molestias repellat excepturi, perspiciatis voluptatem totam adipisci, aliquid nam possimus quas ipsam, quis, eos beatae voluptate! Molestias, minus. Officia, nisi, ex!
						consectetur adipisicing elit. Facere tempore consectetur, repellendus iste cumque placeat fugiat perferendis voluptas laborum aut atque, accusantium! Earum tempore nulla dolor, excepturi, cumque recusandae natus.
					</div>
				`
			}
		}
	}
]

var router = new VueRouter({
	routes : routes
})

new Vue({
	el: '#app',
	router : router
})