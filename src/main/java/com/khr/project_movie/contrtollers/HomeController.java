package com.khr.project_movie.contrtollers;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;


@Controller
public class HomeController {

    @RequestMapping(value = "login", method = RequestMethod.GET)
    public ModelAndView getIndex() {
        ModelAndView modelAndView = new ModelAndView("user/login");
        System.out.println("가능");
        return modelAndView;
    }


    @RequestMapping(value = "loginDo", method = RequestMethod.POST)
    public ModelAndView postIndex() {
//        ModelAndView modelAndView = new ModelAndView("user/login");


        return null;
    }
}
