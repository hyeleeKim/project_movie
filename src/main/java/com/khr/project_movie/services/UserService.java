package com.khr.project_movie.services;

import com.khr.project_movie.entities.RegisterCodeEntity;
import com.khr.project_movie.enums.RegisterSendCodeResult;
import com.khr.project_movie.mappers.UserMapper;
import com.khr.project_movie.utils.CryptoUtil;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.time.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class UserService {
    private final UserMapper userMapper;

    @Autowired
    public UserService(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    public RegisterSendCodeResult sendContactCode(RegisterCodeEntity registerCode) {
        // 값이 없거나 정규식이 틀린 경우
        if (registerCode == null
                || registerCode.getContact() == null
                || registerCode.getContact().matches("/^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/")) {
            return RegisterSendCodeResult.FAILURE;
        }

        // 이미 가입된 번호가 있는 경우
        if (this.userMapper.selectUserByContact(registerCode.getContact()) != null) {
            return RegisterSendCodeResult.FAILURE_DUPLICATE;
        }

        String code = RandomStringUtils.randomNumeric(6); // 6자리의 임의의 숫자 문자열을 생성하는 기능
        String salt = CryptoUtil.hashSha512(String.format("%s%s%f%f",
                registerCode.getContact(),
                code,
                Math.random(),
                Math.random()));


        Date createdAt = new Date();
        Date expiresAt = DateUtils.addMinutes(createdAt,5);
        registerCode.setCode(code)
                .setSalt(salt)
                .setCreatedAt(createdAt)
                .setExpiresAt(expiresAt)
                .setExpired(false);


        return this.userMapper.insertRegisterContactCode(registerCode) > 0
                ? RegisterSendCodeResult.SUCCESS
                : RegisterSendCodeResult.FAILURE;

    }


}
