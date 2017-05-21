package main

import (
	_ "react-mobx-react-router4-beego-boilerplate/backend/routers"

	"github.com/astaxie/beego"
)

func main() {
	beego.SetStaticPath("/assets", "../frontend/dist/assets")
	beego.BConfig.WebConfig.ViewsPath = "../frontend/dist"
	beego.Run()
}
