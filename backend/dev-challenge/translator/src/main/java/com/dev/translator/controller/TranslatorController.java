package com.dev.translator.controller;

import com.dev.translator.model.ContentTranslation;
import com.dev.translator.model.SupportedLanguage;
import com.dev.translator.model.TranslatedResponse;
import com.dev.translator.service.TranslateService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.naming.ServiceUnavailableException;
import java.io.IOException;

@RestController
@RequestMapping("api/v1/translate")
@RequiredArgsConstructor
public class TranslatorController {
    private final TranslateService translateService;

    @GetMapping("languages")
    private SupportedLanguage[] getSupportedLanguages() throws IOException {
        return translateService.getSupportedLanguages();
    }

    @PostMapping
    private TranslatedResponse translate(@RequestBody ContentTranslation contentTranslation) throws IOException, ServiceUnavailableException {
        return translateService.translate(contentTranslation);
    }
}
