package com.hareeshy.portfolio.analytics.web;

import com.hareeshy.portfolio.analytics.service.AnalyticsService;
import com.hareeshy.portfolio.common.ApiResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class AnalyticsController {

    private final AnalyticsService service;

    public AnalyticsController(AnalyticsService service) {
        this.service = service;
    }

    @PostMapping("/api/public/analytics/pageview")
    public ResponseEntity<ApiResponse<Void>> recordPageView(@RequestBody Map<String, String> body, HttpServletRequest request) {
        String path = body.getOrDefault("path", "/");
        service.recordPageView(path, request);
        return ResponseEntity.ok(ApiResponse.ok("Page view recorded", null));
    }

    @GetMapping("/api/analytics/stats")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getStats() {
        return ResponseEntity.ok(ApiResponse.ok(service.getStats()));
    }
}