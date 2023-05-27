package com.khr.project_movie.contrtollers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@RequestMapping(value = "user")
@Controller
public class HomeController {

    @RequestMapping(value = "login", method = RequestMethod.GET)
    public ModelAndView getLogin() {
        ModelAndView modelAndView = new ModelAndView("user/login");
        System.out.println("가능");
        return modelAndView;
    }


    @RequestMapping(value = "login", method = RequestMethod.POST)
    public ModelAndView postLogin(@RequestParam("email")String email,
                                  @RequestParam("password")String password) {
        ModelAndView modelAndView = new ModelAndView("user/login");
        modelAndView.addObject("email",email);
        modelAndView.addObject("password",password);
        System.out.println(email);
        System.out.println(password);
        return modelAndView;
    }
}
