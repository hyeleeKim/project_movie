package com.ixtx.projectmoviesq.mappers;

import com.ixtx.projectmoviesq.entities.RecoverCodeEntity;
import com.ixtx.projectmoviesq.entities.RegisterCodeEntity;
import com.ixtx.projectmoviesq.entities.UserEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface UserMapper {
    // 인증번호 전송 (회원가입)
    int insertRegisterContactCode(RegisterCodeEntity registerCode);

    // 회원가입
    int insertUser(UserEntity user);

    // 인증번호 전송 (아이디 찾기)
    int insertRecoverContactCode(RecoverCodeEntity recoverCode);

    // 인증번호 전송(회원가입, 연락처 중복확인)
    UserEntity selectUserByContact(@Param(value="contact") String contact);

    // 인증번호 확인 (회원가입)
    RegisterCodeEntity selectRegisterByContactCodeSalt(@Param(value ="contact")String contact , @Param(value="code")String code, @Param(value="salt")String salt);

    // 회원가입 이메일 중복, 로그인
    UserEntity selectUserByEmail(@Param("email")String email);

    // 인증번호 확인후 상태 변경
    int updateRegisterExpired(RegisterCodeEntity registerCode);

}
