package com.khr.project_movie.contrtollers;

import com.khr.project_movie.entities.RegisterCodeEntity;
import com.khr.project_movie.enums.RegisterSendCodeResult;
import com.khr.project_movie.services.UserService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
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


    @ResponseBody
    @RequestMapping(value="sendContactCode",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public String postSendContactCode(RegisterCodeEntity registerCode){
        RegisterSendCodeResult result = this.userService.sendContactCode(registerCode);
        JSONObject responseObject = new JSONObject();
        responseObject.put("result",result.name().toLowerCase());
        return responseObject.toString() ;
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
