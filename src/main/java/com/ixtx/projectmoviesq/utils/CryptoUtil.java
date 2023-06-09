package com.ixtx.projectmoviesq.utils;

import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class CryptoUtil {

    public static String hashSha512(String input) {
        return hashSha512(input, null);
    }

    public static String hashSha512(String input, String fallback) {
        try {
            // 해시 알고리즘 ,  SHA-512 알고리즘에 대한 MessageDigest 객체 가져오기
            MessageDigest md = MessageDigest.getInstance("SHA-512");

            // 입력된 문자열을 UTF-8 인코딩으로 변환하기
            md.update(input.getBytes(StandardCharsets.UTF_8));

            // 해시 결과를 BigInteger(양수)로 변환 -> SHA-512 해시 값을 16진수 문자열로 표현
            return String.format("%128x",new BigInteger(1, md.digest()));

        } catch (NoSuchAlgorithmException e) {
            return fallback;
        }
    }
}
