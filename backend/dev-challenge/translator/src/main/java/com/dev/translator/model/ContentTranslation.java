package com.dev.translator.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class ContentTranslation {
    private String q;
    private String source;
    private String target;
    private String format;
    private String apiKey;
}
