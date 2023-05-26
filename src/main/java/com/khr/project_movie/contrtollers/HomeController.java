package com.khr.project_movie.contrtollers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@RequestMapping(value="movie")
@Controller
public class HomeController {

    @RequestMapping(value="login" , method = RequestMethod.GET)
    public ModelAndView getIndex(){
        return new ModelAndView("user/login");
    }

    @RequestMapping(value="login" , method = RequestMethod.POST)
    public ModelAndView postIndex(){
//        return new ModelAndView("user/login");
        return null;
    }
}
