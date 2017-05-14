package routers

import (
	"react-mobx-react-router4-beego-boilerplate/controllers"
	"github.com/astaxie/beego"
)

func init() {
    beego.Router("/", &controllers.MainController{})
}
