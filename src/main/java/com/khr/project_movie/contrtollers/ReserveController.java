package com.khr.project_movie.contrtollers;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@RequestMapping(value = "reserve")
@Controller
public class ReserveController {

    @RequestMapping(value = "payment", method = RequestMethod.GET,
    produces = MediaType.TEXT_HTML_VALUE)
    public ModelAndView getPayment() {

        return new ModelAndView("pages/reserve");
    }


}
