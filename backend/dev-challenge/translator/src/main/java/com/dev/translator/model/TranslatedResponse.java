package com.dev.translator.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class TranslatedResponse {
    private DetectedLanguage detectedLanguage;
    private String translatedText;
}
