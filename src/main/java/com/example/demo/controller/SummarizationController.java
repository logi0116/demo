package com.example.demo.controller;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.HashMap;

@RestController
public class SummarizationController {

    private final ChatClient chatClient;

    public SummarizationController(ChatClient.Builder chatClientBuilder) {
        this.chatClient = chatClientBuilder.build();
    }

    @PostMapping("/api/summarize")
    public Map<String, String> summarize(@RequestBody Map<String, String> request) {
        String textToSummarize = request.get("text");

        String prompt = String.format("Summarize the following text: \"%s\"", textToSummarize);

        String summarizedText = chatClient.prompt()
                .user(prompt)
                .call()
                .content();

        Map<String, String> result = new HashMap<>();
        result.put("summarizedText", summarizedText);
        return result;
    }
}
