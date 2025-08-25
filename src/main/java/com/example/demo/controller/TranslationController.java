package com.example.demo.controller;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.HashMap;

@RestController
public class TranslationController {

    private final ChatClient chatClient;

    public TranslationController(ChatClient.Builder chatClientBuilder) {
        this.chatClient = chatClientBuilder.build();
    }

    @PostMapping("/api/translate")
    public Map<String, String> translate(@RequestBody Map<String, String> request) {
        String textToTranslate = request.get("text");
        String targetLanguage = request.getOrDefault("targetLanguage", "English"); // Default to English

        String prompt = String.format("Translate the following text into %s. Provide only the translated text, without any additional comments or explanations.\n\nText to translate: \"%s\"", targetLanguage, textToTranslate);

        String translatedText = chatClient.prompt()
                .user(prompt)
                .call()
                .content();

        Map<String, String> result = new HashMap<>();
        result.put("translatedText", translatedText);
        return result;
    }
}
