package com.dev.translator.service;

import com.dev.translator.model.ContentTranslation;
import com.dev.translator.model.SupportedLanguage;
import com.dev.translator.model.TranslatedResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import okhttp3.OkHttpClient;
import okhttp3.MediaType;
import okhttp3.RequestBody;
import okhttp3.Request;
import okhttp3.Response;

import javax.naming.ServiceUnavailableException;
import java.io.IOException;
import java.net.SocketTimeoutException;

@Service
@RequiredArgsConstructor
public class TranslateService {
    private final ObjectMapper mapper;

    @Value("${application.executing-endpoint}")
    private String endpoint;

    private final OkHttpClient client = new OkHttpClient().newBuilder().build();

    public SupportedLanguage[] getSupportedLanguages() throws IOException {
        Request request = new Request.Builder()
                .addHeader("Content-Type", "application/json")
                .url(endpoint + "/languages").get()
                .build();
        String result;
        try (Response response = client.newCall(request).execute()) {
            assert response.body() != null;
            result = response.body().string();
        }

        return mapper.readValue(result, SupportedLanguage[].class);
    }

    public TranslatedResponse translate(ContentTranslation contentTranslation) throws IOException, ServiceUnavailableException {
        String translateUrl = endpoint + "/translate";
        MediaType mediaType = MediaType.parse("application/json");

        String codeContentJson = mapper.writeValueAsString(contentTranslation);
        RequestBody body = RequestBody.create(mediaType, codeContentJson);

        String result;
        try{
            Request request = new Request.Builder()
                    .url(translateUrl)
                    .method("POST", body)
                    .addHeader("Content-Type", "application/json")
                    .build();

            try (Response response = client.newCall(request).execute()) {
                assert response.body() != null;
                result = response.body().string();
            }
        } catch (SocketTimeoutException socketTimeoutException){
            throw new ServiceUnavailableException("Service Unavailable");
        }

        return mapper.readValue(result, TranslatedResponse.class);
    }
}
