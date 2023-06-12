package com.ixtx.projectmoviesq.controllers;


import com.ixtx.projectmoviesq.entities.RecoverCodeEntity;
import com.ixtx.projectmoviesq.entities.RegisterCodeEntity;
import com.ixtx.projectmoviesq.entities.UserEntity;
import com.ixtx.projectmoviesq.enums.*;
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


    // ID 찾기, 비밀번호 재설정
    @RequestMapping(value = "recover", method = RequestMethod.GET)
    public ModelAndView getRecover() {
        return new ModelAndView("home/recover");
    }

    //회원가입 휴대폰 인증번호 보내기
    @ResponseBody
    @RequestMapping(value = "contactCode",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public String getContactCode(RegisterCodeEntity registerCode) {
        RegisterSendCodeResult result = this.userService.registerSendContactCode(registerCode);
        JSONObject responseObject = new JSONObject();
        responseObject.put("result", result.name().toLowerCase());

        if (result == RegisterSendCodeResult.SUCCESS) {
            responseObject.put("salt", registerCode.getSalt());
            responseObject.put("expired", registerCode.isExpired());
        }

        return responseObject.toString();
    }

    // 아이디 찾기 휴대폰 인증번호 보내기
    @ResponseBody
    @RequestMapping(value = "contactCodeRec",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public String getContactCodeRec(RecoverCodeEntity recoverCode) {
        RecoverSendCodeResult result = this.userService.recoverSendContactCode(recoverCode);
        JSONObject responseObject = new JSONObject();
        responseObject.put("result", result.name().toLowerCase());

        if (result == RecoverSendCodeResult.SUCCESS) {
            responseObject.put("salt", recoverCode.getSalt());
        }

        return responseObject.toString();
    }

    // 아이디 찾기
    @ResponseBody
    @RequestMapping(value = "searchId",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public String postContactCodeRec(UserEntity user, @RequestParam(value = "birthStr") String birthStr) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date birth = sdf.parse(birthStr);
        user.setBirthday(birth);

        RecoverIdResult result = this.userService.findId(user) ;
        JSONObject responseObject = new JSONObject();
        responseObject.put("result",result);

        if(result == RecoverIdResult.SUCCESS){
            responseObject.put("name",user.getName());
            responseObject.put("name",user.getEmail());
        }

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

    // 회원가입 진행 완료
    @ResponseBody
    @RequestMapping(value = "register",
            method = RequestMethod.POST)
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


    // 회원가입 휴대폰 인증번호 확인
    @ResponseBody
    @RequestMapping(value = "contactCode",
            method = RequestMethod.PATCH,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public String patchContactCode(RegisterCodeEntity registerCode) {
        VerifyRegisterCodeResult result = this.userService.registerCodeResult(registerCode);
        JSONObject responseObject = new JSONObject();
        responseObject.put("result", result.name().toLowerCase());

        if (result == VerifyRegisterCodeResult.SUCCESS) {
            responseObject.put("salt", registerCode.getSalt());
            responseObject.put("expired", !registerCode.isExpired());
        }
        return responseObject.toString();
    }

    // 아이디 찾기 휴대폰 인증번호 확인
    @ResponseBody
    @RequestMapping(value = "contactCodeRec",
            method = RequestMethod.PATCH,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public String patchContactCodeRec(RecoverCodeEntity recoverCode) {
        VerifyRecoverCodeResult result = this.userService.recoverCodeResult(recoverCode);

        JSONObject responseObject = new JSONObject();
        responseObject.put("result", result.name().toLowerCase());

        return responseObject.toString();
    }


}
