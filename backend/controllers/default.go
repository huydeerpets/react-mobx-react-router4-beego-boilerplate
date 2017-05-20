package controllers

import (
	"encoding/json"

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
	Id       int
	Username string `json:"username"`
	Password string `json:"password"`
}

func (c *UserController) Get() {
	u := &User{}
	_, ok := c.Ctx.Input.Session("uid").(int)
	if !ok {
		u = &User{Username: "anonymous"}
	} else {
		u = &User{Username: "user", Id: 1}
	}
	c.Data["json"] = &u
	c.ServeJSON()
}

type AuthController struct {
	beego.Controller
}

func (c *AuthController) Login() {
	u := &User{}

	if err := json.Unmarshal(c.Ctx.Input.RequestBody, &u); err != nil {
		c.Data["json"] = err.Error()
	} else {
		if u.Username == "user" && u.Password == "pass" {
			c.SetSession("uid", 1)
			u.Id = 1
			c.Data["json"] = u
		} else {
			c.Data["json"] = &User{Username: "anonymous"}
		}
	}
	c.ServeJSON()
}

func (c *AuthController) Logout() {
	c.SetSession("uid", nil)
	c.Data["json"] = "ok"
	c.ServeJSON()
}
