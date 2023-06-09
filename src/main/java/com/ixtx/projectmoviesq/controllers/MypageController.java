package com.ixtx.projectmoviesq.controllers;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping(value = "/mypage")
public class MypageController {
    @RequestMapping(value = "", method = RequestMethod.GET, produces = MediaType.TEXT_HTML_VALUE)
    public ModelAndView getMovie() {
        ModelAndView modelAndView = new ModelAndView("/pages/mypage");
        return modelAndView;
    }
}
