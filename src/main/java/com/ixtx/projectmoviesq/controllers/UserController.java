package com.ixtx.projectmoviesq.controllers;


import com.ixtx.projectmoviesq.entities.RegisterCodeEntity;
import com.ixtx.projectmoviesq.entities.UserEntity;
import com.ixtx.projectmoviesq.enums.LoginResult;
import com.ixtx.projectmoviesq.enums.RegisterResult;
import com.ixtx.projectmoviesq.enums.RegisterSendCodeResult;
import com.ixtx.projectmoviesq.enums.VerifyRegisterCodeResult;
import com.ixtx.projectmoviesq.services.UserService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Controller
@RequestMapping(value = "/")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }


    // 회원가입 화면 보이기
    @RequestMapping(value = "register", method = RequestMethod.GET)
    public ModelAndView getRegister() {
        return new ModelAndView("home/register");
    }

    //회원가입 휴대폰 인증번호 보내기
    @ResponseBody
    @RequestMapping(value = "sendContactCode",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public String postSendContactCode(RegisterCodeEntity registerCode) {
        RegisterSendCodeResult result = this.userService.registerSendContactCode(registerCode);
        JSONObject responseObject = new JSONObject();
        responseObject.put("result", result.name().toLowerCase());

        if (result == RegisterSendCodeResult.SUCCESS) {
            responseObject.put("salt", registerCode.getSalt());
        }

        return responseObject.toString();
    }


    @ResponseBody
    @RequestMapping(value = "recoverSendCode",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public String postRecoverSendCode() {
        return null;
    }

    // 로그인
    @ResponseBody
    @RequestMapping(value = "login",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public String postLogin(HttpSession session, UserEntity user) {
        LoginResult result = this.userService.loginUser(session, user);

        if (result == LoginResult.SUCCESS) {
            session.setAttribute("user", user);
        }

        JSONObject responseObject = new JSONObject();
        responseObject.put("result", result.name().toLowerCase());
        return responseObject.toString();
    }

    // 회원가입 휴대폰 인증번호 확인
    @ResponseBody
    @RequestMapping(value = "contactCode",
            method = RequestMethod.PATCH,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public String patchContactCode(RegisterCodeEntity registerCode) {
        VerifyRegisterCodeResult result = this.userService.verifyRegisterCode(registerCode);
        JSONObject responseObject = new JSONObject();
        responseObject.put("result", result.name().toLowerCase());

        return responseObject.toString();
    }


    // 회원가입 진행 완료
    @ResponseBody
    @RequestMapping(value = "register", method = RequestMethod.POST)
    public String postRegister(UserEntity user, @RequestParam(value = "birthStr") String birthStr) throws ParseException {
        //birth type : String -> Date 바꾸기
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date birth = sdf.parse(birthStr);
        user.setBirthday(birth);

        RegisterResult result = this.userService.registerUser(user);
        JSONObject responseObject = new JSONObject();
        responseObject.put("result", result.name().toLowerCase());

        return responseObject.toString();
    }


    // ID 찾기, 비밀번호 재설정
    @RequestMapping(value = "recover", method = RequestMethod.GET)
    public ModelAndView getRecover() {
        return new ModelAndView("home/recover");
    }

}
