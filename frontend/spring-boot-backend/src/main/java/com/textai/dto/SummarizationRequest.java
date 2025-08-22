package com.textai.dto;

import lombok.Data;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import javax.validation.constraints.Min;
import javax.validation.constraints.Max;

@Data
public class SummarizationRequest {
    
    @NotBlank(message = "요약할 텍스트를 입력해주세요.")
    @Size(max = 50000, message = "텍스트는 최대 50,000자까지 입력 가능합니다.")
    private String text;
    
    @NotBlank(message = "요약 타입을 선택해주세요.")
    private String summaryType; // brief, detailed, keywords, bullets
    
    @Min(value = 10, message = "요약 길이는 최소 10% 이상이어야 합니다.")
    @Max(value = 80, message = "요약 길이는 최대 80% 이하여야 합니다.")
    private Integer summaryLength;
}
