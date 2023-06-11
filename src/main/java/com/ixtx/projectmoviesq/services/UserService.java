package com.ixtx.projectmoviesq.services;


import com.ixtx.projectmoviesq.entities.RecoverCodeEntity;
import com.ixtx.projectmoviesq.entities.RegisterCodeEntity;
import com.ixtx.projectmoviesq.entities.UserEntity;
import com.ixtx.projectmoviesq.enums.*;
import com.ixtx.projectmoviesq.mappers.UserMapper;
import com.ixtx.projectmoviesq.utils.CryptoUtil;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.time.DateUtils;
import org.json.JSONObject;
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
    public RegisterSendCodeResult registerSendContactCode(RegisterCodeEntity registerCode) {

        // 값이 없거나 정규식이 틀린 경우
        if (registerCode == null
                || registerCode.getContact() == null
                || !registerCode.getContact().matches("^01(?:0|1|[6-9])(?:\\d{3}|\\d{4})\\d{4}$")) {
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

    // 회원가입 인증번호 확인
    public VerifyRegisterCodeResult verifyRegisterCode(RegisterCodeEntity registerCode) {

        // DB 인증번호인지 확인
        RegisterCodeEntity existingRegister = this.userMapper.selectRegisterByContactCodeSalt(registerCode.getContact(),
                registerCode.getCode(),
                registerCode.getSalt());

        // 인증번호 발송한 회원이 아닌 경우
        if (existingRegister == null) {
            return VerifyRegisterCodeResult.FAILURE;
        }

        // 유효시간이 지난경우

        Date current = new Date();
        if (current.compareTo(existingRegister.getExpiresAt()) > 0) {
            return VerifyRegisterCodeResult.FAILURE_EXPIRED;
        }

        // 인증완료
        existingRegister.setExpired(true);

        return existingRegister.isExpired()
                ? VerifyRegisterCodeResult.SUCCESS
                : VerifyRegisterCodeResult.FAILURE;

    }

    // 회원가입 완료
    public RegisterResult registerUser(UserEntity user) {

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

    // 로그인
    public LoginResult loginUser(HttpSession session, UserEntity user) {
        UserEntity existingUser = this.userMapper.selectUserByEmail(user.getEmail());

        // 가입된 이메일이 없을 때
        if (existingUser == null) {
            return LoginResult.FAILURE_WRONG_ID;
        }

        // 입력받은 비밀번호 암호화
        user.setPassword(CryptoUtil.hashSha512(user.getPassword()));

        // 가입된 이메일의 비밀번호와 입력받은 비밀번호 동일 여부
        if (!user.getPassword().equals(existingUser.getPassword())) {
            return LoginResult.FAILURE_WRONG_PWD;
        }
        // 삭제된 계정
        if (existingUser.getStatus().equals("DELETED")) {
            return LoginResult.FAILURE_DELETED;
        }
        // 사용 중지된 계정
        if (existingUser.getStatus().equals("SUSPENDED")) {
            return LoginResult.FAILURE_SUSPENDED;
        }

        user.setName(existingUser.getName())
                .setBirthday(existingUser.getBirthday())
                .setContact(existingUser.getContact())
                .setRegisteredAt(existingUser.getRegisteredAt());

        return LoginResult.SUCCESS;
    }

    // 아이디 찾기 휴대폰 인증번호 보내기
    public RecoverSendCodeResult recoverSendContactCode(RecoverCodeEntity recoverCode) {
        if (recoverCode == null
                || recoverCode.getContact() == null
                || !recoverCode.getContact().matches("^01(?:0|1|[6-9])(?:\\d{3}|\\d{4})\\d{4}$")) {
            return RecoverSendCodeResult.FAILURE;
        }

        String code = RandomStringUtils.randomNumeric(6);
        String salt = CryptoUtil.hashSha512(String.format("%s%s%f%f",
                recoverCode.getContact(),
                code,
                Math.random(),
                Math.random()));
        recoverCode.setCreatedAt(new Date());

        Date createdAt = new Date();
        Date expiresAt = DateUtils.addMinutes(createdAt, 5);

        recoverCode.setCode(code)
                .setSalt(salt)
                .setCreatedAt(createdAt)
                .setExpiresAt(expiresAt)
                .setExpired(false);


        return this.userMapper.insertRecoverContactCode(recoverCode) > 0
                ? RecoverSendCodeResult.SUCCESS
                : RecoverSendCodeResult.FAILURE;

    }

}
