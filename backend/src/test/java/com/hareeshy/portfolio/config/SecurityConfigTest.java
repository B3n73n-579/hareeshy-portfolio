package com.hareeshy.portfolio.config;

import com.hareeshy.portfolio.analytics.service.AnalyticsService;
import com.hareeshy.portfolio.analytics.web.AnalyticsController;
import com.hareeshy.portfolio.blog.service.BlogPostService;
import com.hareeshy.portfolio.blog.web.BlogController;
import com.hareeshy.portfolio.HealthController;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.flyway.FlywayAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;
import org.springframework.boot.autoconfigure.data.jpa.JpaRepositoriesAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(classes = SecurityConfigTest.TestAppConfig.class)
@AutoConfigureMockMvc
class SecurityConfigTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private BlogPostService blogPostService;

    @MockitoBean
    private AnalyticsService analyticsService;

    @SpringBootConfiguration
    @EnableAutoConfiguration(exclude = {
        DataSourceAutoConfiguration.class,
        HibernateJpaAutoConfiguration.class,
        JpaRepositoriesAutoConfiguration.class,
        FlywayAutoConfiguration.class
    })
    @Import({SecurityConfig.class, HealthController.class, BlogController.class, AnalyticsController.class})
    static class TestAppConfig {}

    @Test
    void healthEndpointIsPublic() throws Exception {
        mockMvc.perform(get("/api/health"))
                .andExpect(status().isOk());
    }

    @Test
    void publicBlogEndpointIsPublic() throws Exception {
        mockMvc.perform(get("/api/public/blog"))
                .andExpect(status().isOk());
    }

    @Test
    void analyticsStatsRequiresAuth() throws Exception {
        mockMvc.perform(get("/api/analytics/stats"))
                .andExpect(status().isUnauthorized());
    }
}