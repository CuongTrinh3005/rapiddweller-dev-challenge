package com.dev.compiler.controller;

import com.dev.compiler.model.CodeContent;
import com.dev.compiler.model.ExecutedResponse;
import com.dev.compiler.model.SupportedLanguages;
import com.dev.compiler.service.CompilerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("api/v1/execute")
@RequiredArgsConstructor
public class CompilerController {

    private final CompilerService compilerService;

    @GetMapping("list")
    private SupportedLanguages getSupportedLanguages() throws IOException {
        return compilerService.getSupportedLanguages();
    }

    @PostMapping
    private ExecutedResponse executeCode(@RequestBody CodeContent codeContent) throws IOException {
        return compilerService.execute(codeContent);
    }
}
