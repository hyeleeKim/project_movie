package com.khr.project_movie.mappers;

import com.khr.project_movie.entities.RegisterCodeEntity;
import com.khr.project_movie.entities.UserEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface UserMapper {

    UserEntity selectUserByContact(@Param(value="contact")String contact);

    int insertRegisterContactCode(RegisterCodeEntity registerCode);

}
