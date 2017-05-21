package routers

import (
	"react-mobx-react-router4-beego-boilerplate/backend/controllers"

	"github.com/astaxie/beego"
)

func init() {

	ns := beego.NewNamespace("/api",
		beego.NSRouter("/user", &controllers.UserController{}),
		beego.NSRouter("/auth/login", &controllers.AuthController{}, "post:Login"),
		beego.NSRouter("/auth/logout", &controllers.AuthController{}, "post:Logout"),
	)

	beego.Router("*", &controllers.MainController{})

	beego.AddNamespace(ns)
}
