package com.textai.dto;

import lombok.Data;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
public class TranslationRequest {
    
    @NotBlank(message = "번역할 텍스트를 입력해주세요.")
    @Size(max = 10000, message = "텍스트는 최대 10,000자까지 입력 가능합니다.")
    private String text;
    
    @NotBlank(message = "소스 언어를 선택해주세요.")
    private String sourceLang;
    
    @NotBlank(message = "타겟 언어를 선택해주세요.")
    private String targetLang;
}
