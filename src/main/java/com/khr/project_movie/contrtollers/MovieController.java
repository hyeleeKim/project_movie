package com.khr.project_movie.contrtollers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@RequestMapping(value = "movie")
@Controller
public class MovieController {
    @RequestMapping(value = "pay", method = RequestMethod.GET)
    public ModelAndView getPay() {

        return new ModelAndView("movie/movie.pay");
    }
}
