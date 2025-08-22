package com.textai.dto;

import lombok.Data;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import javax.validation.constraints.Min;
import javax.validation.constraints.Max;

@Data
public class ParaphraseRequest {
    
    @NotBlank(message = "의역할 텍스트를 입력해주세요.")
    @Size(max = 10000, message = "텍스트는 최대 10,000자까지 입력 가능합니다.")
    private String text;
    
    @NotBlank(message = "의역 스타일을 선택해주세요.")
    private String style; // formal, casual, academic, creative, simple
    
    @Min(value = 0, message = "창의성 수준은 0 이상이어야 합니다.")
    @Max(value = 100, message = "창의성 수준은 100 이하여야 합니다.")
    private Integer creativity;
}
