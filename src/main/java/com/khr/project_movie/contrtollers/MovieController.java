package com.khr.project_movie.contrtollers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@RequestMapping(value = "charge")
@Controller
public class MovieController {
    @RequestMapping(value = "/", method = RequestMethod.GET)
    public ModelAndView getCharge() {

        return new ModelAndView("charge/charge");
    }

    @RequestMapping(value = "payment", method = RequestMethod.GET)
    public ModelAndView getPayment() {

        return new ModelAndView("charge/payment");
    }



}
