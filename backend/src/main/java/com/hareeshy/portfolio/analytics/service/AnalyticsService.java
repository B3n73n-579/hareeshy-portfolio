package com.hareeshy.portfolio.analytics.service;

import com.hareeshy.portfolio.analytics.domain.PageView;
import com.hareeshy.portfolio.analytics.repository.PageViewRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Map;

@Service
@Transactional
public class AnalyticsService {

    private final PageViewRepository repository;

    public AnalyticsService(PageViewRepository repository) {
        this.repository = repository;
    }

    public void recordPageView(String path, HttpServletRequest request) {
        PageView view = new PageView();
        view.setPath(path);
        view.setIpAddress(request.getRemoteAddr());
        view.setUserAgent(request.getHeader("User-Agent"));
        view.setReferrer(request.getHeader("Referer"));
        view.setTimestamp(LocalDateTime.now());
        repository.save(view);
    }

    @Transactional(readOnly = true)
    public Map<String, Object> getStats() {
        long totalViews = repository.count();
        LocalDateTime todayStart = LocalDate.now().atStartOfDay();
        long todayViews = repository.countByTimestampBetween(todayStart, LocalDateTime.now());
        return Map.of(
                "totalViews", totalViews,
                "todayViews", todayViews
        );
    }
}