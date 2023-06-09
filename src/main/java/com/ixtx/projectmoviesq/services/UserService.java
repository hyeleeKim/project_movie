package com.ixtx.projectmoviesq.services;


import com.ixtx.projectmoviesq.entities.RegisterCodeEntity;
import com.ixtx.projectmoviesq.entities.UserEntity;
import com.ixtx.projectmoviesq.enums.RegisterResult;
import com.ixtx.projectmoviesq.enums.RegisterSendCodeResult;
import com.ixtx.projectmoviesq.enums.VerifyRegisterCodeResult;
import com.ixtx.projectmoviesq.mappers.UserMapper;
import com.ixtx.projectmoviesq.utils.CryptoUtil;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.time.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.util.Date;

@Service
public class UserService {
    private final UserMapper userMapper;

    @Autowired
    public UserService(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    // 회원가입 휴대폰 인증번호 보내기
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
        Date expiresAt = DateUtils.addMinutes(createdAt, 5);
        registerCode.setCode(code)
                .setSalt(salt)
                .setCreatedAt(createdAt)
                .setExpiresAt(expiresAt)
                .setExpired(false);

        return this.userMapper.insertRegisterContactCode(registerCode) > 0
                ? RegisterSendCodeResult.SUCCESS
                : RegisterSendCodeResult.FAILURE;

    }

    public VerifyRegisterCodeResult verifyRegisterCode(RegisterCodeEntity registerCode) {

        // DB 인증번호인지 확인
        RegisterCodeEntity existingRegister = this.userMapper.selectRegisterByContactCodeSalt(registerCode.getContact(), registerCode.getCode(), registerCode.getSalt());

        if (existingRegister == null) {
            return VerifyRegisterCodeResult.FAILURE;
        }

        Date current = new Date();

        if (current.compareTo(existingRegister.getExpiresAt()) > 0) {
            return VerifyRegisterCodeResult.FAILURE_EXPIRED;
        }

        existingRegister.setExpired(true);


        return this.userMapper.updateRegisterExpired(existingRegister) > 0
                ? VerifyRegisterCodeResult.SUCCESS
                : VerifyRegisterCodeResult.FAILURE;

    }

    public RegisterResult putUser(UserEntity user) {

        if (this.userMapper.selectUserByEmail(user.getEmail()) != null) {
            return RegisterResult.FAILURE_EMAIL_DUPLICATE;
        }

        user.setPassword(CryptoUtil.hashSha512(user.getPassword()));
        user.setStatus("OKAY");
        user.setAdmin(false);
        user.setRegisteredAt(new Date());

        return this.userMapper.insertUser(user) > 0
                ? RegisterResult.SUCCESS
                : RegisterResult.FAILURE;
    }
}
