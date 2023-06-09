package com.ixtx.projectmoviesq.utils;

import org.json.JSONArray;
import org.json.JSONObject;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Date;

/* 인증 SMS 전송 유틸 */
public class NCloudUtil {
    private static final String URL_PREFIX = "https://sens.apigw.ntruss.com";
    private static final String ACCESS_KEY = "Vu7Mt4HDUcaSJGzNKLnb";
    private static final String SECRET_KEY = "pVE7tZ24NdLQdd7O7ijkmgUKh3NX1rSfK969zoju";
    private static final String SERVICE_ID = "ncp:sms:kr:307475075334:portfolio";

    private static String generateSignature(String requestMethod, String requestUrl, long timestamp) {
        String signature = String.format("%s %s\n%d\n%s",
                requestMethod,
                requestUrl.replace(NCloudUtil.URL_PREFIX, ""),
                timestamp,
                NCloudUtil.ACCESS_KEY);
        SecretKeySpec spec = new SecretKeySpec(NCloudUtil.SECRET_KEY.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
        try {
            Mac mac = Mac.getInstance("HmacSHA256");
            mac.init(spec);
            byte[] hmacBytes = mac.doFinal(signature.getBytes(StandardCharsets.UTF_8));
            return Base64.getEncoder().encodeToString(hmacBytes);
        } catch (NoSuchAlgorithmException | InvalidKeyException e) {
            throw new RuntimeException(e);
        }
    }

    // 인증 SMS 전송
    public static void sendSms(String to, String content) {
        final String requestMethod = "POST";
        final String requestUrl = String.format("%s/sms/v2/services/%s/messages", NCloudUtil.URL_PREFIX, NCloudUtil.SERVICE_ID);
        JSONObject requestBody = new JSONObject() {{
            put("type", "SMS");
            put("contentType", "COMM");
            put("from", "01052532997");
            put("content", content);
            put("messages", new JSONArray() {{
                put(new JSONObject() {{
                    put("to", to);
                }});
            }});
        }};

        try {
            long timestamp = new Date().getTime();
            String signature = NCloudUtil.generateSignature(requestMethod, requestUrl, timestamp);
            URL url = new URL(requestUrl);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod(requestMethod);
            connection.setRequestProperty("Content-Type", "application/json; charset=utf-8");
            connection.setRequestProperty("x-ncp-apigw-timestamp", String.valueOf(timestamp));
            connection.setRequestProperty("x-ncp-iam-access-key", NCloudUtil.ACCESS_KEY);
            connection.setRequestProperty("x-ncp-apigw-signature-v2", signature);
            connection.setDoOutput(true);
            try (BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(connection.getOutputStream()))) {
                writer.write(requestBody.toString());
                writer.flush();
            }
            try (BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()))) {
                String response = reader.readLine();
                System.out.println(response);
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public NCloudUtil() {
        super();
    }
}