package com.textai.controller;

import com.textai.dto.*;
import com.textai.service.TextProcessingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"}) // React 개발 서버 주소
public class TextProcessingController {

    @Autowired
    private TextProcessingService textProcessingService;

    /**
     * 텍스트 번역 API
     */
    @PostMapping("/translate")
    public ResponseEntity<TranslationResponse> translateText(@Valid @RequestBody TranslationRequest request) {
        try {
            TranslationResponse response = textProcessingService.translateText(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(TranslationResponse.builder()
                    .error("번역 처리 중 오류가 발생했습니다: " + e.getMessage())
                    .build());
        }
    }

    /**
     * 텍스트 요약 API
     */
    @PostMapping("/summarize")
    public ResponseEntity<SummarizationResponse> summarizeText(@Valid @RequestBody SummarizationRequest request) {
        try {
            SummarizationResponse response = textProcessingService.summarizeText(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(SummarizationResponse.builder()
                    .error("요약 처리 중 오류가 발생했습니다: " + e.getMessage())
                    .build());
        }
    }

    /**
     * 텍스트 의역 API
     */
    @PostMapping("/paraphrase")
    public ResponseEntity<ParaphraseResponse> paraphraseText(@Valid @RequestBody ParaphraseRequest request) {
        try {
            ParaphraseResponse response = textProcessingService.paraphraseText(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ParaphraseResponse.builder()
                    .error("의역 처리 중 오류가 발생했습니다: " + e.getMessage())
                    .build());
        }
    }

    /**
     * 지원 언어 목록 조회
     */
    @GetMapping("/languages")
    public ResponseEntity<List<LanguageInfo>> getSupportedLanguages() {
        List<LanguageInfo> languages = textProcessingService.getSupportedLanguages();
        return ResponseEntity.ok(languages);
    }

    /**
     * 서비스 상태 확인
     */
    @GetMapping("/health")
    public ResponseEntity<HealthCheckResponse> healthCheck() {
        HealthCheckResponse response = HealthCheckResponse.builder()
            .status("UP")
            .message("TextAI API 서버가 정상 작동 중입니다.")
            .timestamp(java.time.LocalDateTime.now())
            .build();
        return ResponseEntity.ok(response);
    }
}
