package com.khr.project_movie.contrtollers;

import com.khr.project_movie.entities.RegisterCodeEntity;
import com.khr.project_movie.enums.RegisterSendCodeResult;
import com.khr.project_movie.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping(value = "/")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }


    @RequestMapping(value = "login", method = RequestMethod.GET)
    public ModelAndView getLogin(){
        return new ModelAndView("home/login");
    }


    @RequestMapping(value = "register", method = RequestMethod.GET)
    public ModelAndView getRegister() {
        return new ModelAndView("home/register");
    }


    @RequestMapping(value="registerSendCode", method = RequestMethod.POST)
    public RegisterSendCodeResult postRegisterSendCode(RegisterCodeEntity registerCode){
        return RegisterSendCodeResult.SUCCESS;
    }

    @ResponseBody
    @RequestMapping(value = "register", method = RequestMethod.POST)
    public String postRegister(){


        return null;
    }

    @RequestMapping(value = "recover", method = RequestMethod.GET)
    public ModelAndView getRecover() {
        return new ModelAndView("home/recover");
    }

}
