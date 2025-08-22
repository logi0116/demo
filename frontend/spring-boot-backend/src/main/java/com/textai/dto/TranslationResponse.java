package com.textai.dto;

import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Builder
public class TranslationResponse {
    private String translatedText;
    private String sourceLang;
    private String targetLang;
    private Integer originalLength;
    private Integer translatedLength;
    private LocalDateTime timestamp;
    private String error;
}
