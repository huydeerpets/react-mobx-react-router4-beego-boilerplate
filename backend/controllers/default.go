package controllers

import (
	"github.com/astaxie/beego"
)

type MainController struct {
	beego.Controller
}

func (c *MainController) Get() {
	c.Data["Website"] = "beego.me"
	c.Data["Email"] = "astaxie@gmail.com"
	c.TplName = "index.tpl"
}

type UserController struct {
	beego.Controller
}

type User struct {
	Username string
}

func (c *UserController) Get() {
	c.Data["json"] = &User{Username: "foo"}
	c.ServeJSON()
}
