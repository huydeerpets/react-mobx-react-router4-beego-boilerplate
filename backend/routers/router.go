package routers

import (
	"react-mobx-react-router4-beego-boilerplate/backend/controllers"

	"github.com/astaxie/beego"
)

func init() {
	beego.Router("/", &controllers.MainController{})
	beego.Router("/user", &controllers.UserController{})
}
