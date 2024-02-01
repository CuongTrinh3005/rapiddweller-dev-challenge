package com.dev.compiler.service;

import com.dev.compiler.model.CodeContent;
import com.dev.compiler.model.ExecutedResponse;
import com.dev.compiler.model.SupportedLanguages;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import okhttp3.OkHttpClient;
import okhttp3.MediaType;
import okhttp3.RequestBody;
import okhttp3.Request;
import okhttp3.Response;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class CompilerService {
    private final ObjectMapper mapper;

    @Value("${application.executing-endpoint}")
    private String endpoint;

    private final OkHttpClient client = new OkHttpClient().newBuilder().build();

    public ExecutedResponse execute(CodeContent codeContent) throws IOException {
        MediaType mediaType = MediaType.parse("application/json");

        String codeContentJson = mapper.writeValueAsString(codeContent);
        RequestBody body = RequestBody.create(mediaType, codeContentJson);
        Request request = new Request.Builder()
                .url(endpoint)
                .method("POST", body)
                .addHeader("Content-Type", "application/json")
                .build();

        String result;
        try (Response response = client.newCall(request).execute()) {
            assert response.body() != null;
            result = response.body().string();
        }

        return mapper.readValue(result, ExecutedResponse.class);
    }

    public SupportedLanguages getSupportedLanguages() throws IOException {
        Request request = new Request.Builder()
                .url(endpoint + "list").get()
                .build();
        String result;
        try (Response response = client.newCall(request).execute()) {
            assert response.body() != null;
            result = response.body().string();
        }

        return mapper.readValue(result, SupportedLanguages.class);
    }
}
