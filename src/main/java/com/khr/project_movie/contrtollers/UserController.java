package com.khr.project_movie.contrtollers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping(value = "/")
public class UserController {



    @RequestMapping(value = "login", method = RequestMethod.POST)
    public ModelAndView postLogin(@RequestParam("email") String email,
                                  @RequestParam("password") String password) {
        ModelAndView modelAndView = new ModelAndView("login");
        modelAndView.addObject("email", email);
        modelAndView.addObject("password", password);
        System.out.println(email);
        System.out.println(password);
        return modelAndView;
    }

    @RequestMapping(value = "register", method = RequestMethod.GET)
    public ModelAndView getRegister() {
        return null;
    }

    @RequestMapping(value = "recover", method = RequestMethod.GET)
    public ModelAndView getRecover() {
        return null;
    }

}
