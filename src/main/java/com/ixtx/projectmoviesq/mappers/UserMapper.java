package com.ixtx.projectmoviesq.mappers;

import com.ixtx.projectmoviesq.entities.RegisterCodeEntity;
import com.ixtx.projectmoviesq.entities.UserEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface UserMapper {

    UserEntity selectUserByContact(@Param(value="contact") String contact);


    int insertRegisterContactCode(RegisterCodeEntity registerCode);

    RegisterCodeEntity selectRegisterByContactCodeSalt(@Param(value ="contact")String contact , @Param(value="code")String code, @Param(value="salt")String salt);

    int updateRegisterExpired(RegisterCodeEntity registerCode);


    UserEntity selectUserByEmail(@Param("email")String email);

    int insertUser(UserEntity user);


}
