package com.dev.compiler.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class SupportedLanguages {
    private String timeStamp;
    private Integer status;
    private List<LanguageInfo> supportedLanguages;
}
