package com.dev.compiler.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ExecutedResponse {
    private String timeStamp;
    private Integer status;
    private String output;
    private String error;
    private String language;
    private String info;
}
