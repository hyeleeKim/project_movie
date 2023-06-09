package com.ixtx.projectmoviesq.controllers;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping(value = "/")
public class HomeController {
    @RequestMapping(value = "/", method = RequestMethod.GET, produces = MediaType.TEXT_HTML_VALUE)
    public ModelAndView getIndex() {
        ModelAndView modelAndView = new ModelAndView("home/index"); // http://localhost:6795/
        return modelAndView;
    }

    // 로그인 화면 보이기
    @RequestMapping(value = "login", method = RequestMethod.GET)
    public ModelAndView getLogin(){
        return new ModelAndView("home/login");
    }

}
