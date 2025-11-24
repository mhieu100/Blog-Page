package com.mhieu100.blog.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mhieu100.blog.entity.Article;
import com.mhieu100.blog.entity.ArticleStatus;
import com.mhieu100.blog.entity.User;
import com.mhieu100.blog.repository.ArticleRepository;
import com.mhieu100.blog.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ArticleService {

    private final ArticleRepository articleRepository;
    private final UserRepository userRepository;
    private final CloudinaryService cloudinaryService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public Article createArticle(String title, String content, MultipartFile image, String tagsJson) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElseThrow();

        String imageUrl = null;
        if (image != null && !image.isEmpty()) {
            imageUrl = cloudinaryService.uploadFile(image);
        }

        List<String> tags = new ArrayList<>();
        if (tagsJson != null && !tagsJson.isEmpty()) {
            try {
                tags = objectMapper.readValue(tagsJson, new TypeReference<List<String>>() {});
            } catch (Exception e) {
                // Log error but continue without tags
                System.err.println("Error parsing tags: " + e.getMessage());
            }
        }

        Article article = Article.builder()
                .title(title)
                .content(content)
                .imageUrl(imageUrl)
                .tags(tags)
                .author(user)
                .status(ArticleStatus.PENDING)
                .build();

        return articleRepository.save(article);
    }

    public List<Article> getAllApprovedArticles() {
        return articleRepository.findByStatus(ArticleStatus.APPROVED);
    }

    public Article getArticleById(Long id) {
        return articleRepository.findById(id)
                .filter(article -> article.getStatus() == ArticleStatus.APPROVED)
                .orElseThrow(() -> new RuntimeException("Article not found or not approved"));
    }

    public List<Article> getAllPendingArticles() {
        return articleRepository.findByStatus(ArticleStatus.PENDING);
    }

    public Article approveArticle(Long id) {
        Article article = articleRepository.findById(id).orElseThrow();
        article.setStatus(ArticleStatus.APPROVED);
        return articleRepository.save(article);
    }

    public Article rejectArticle(Long id) {
        Article article = articleRepository.findById(id).orElseThrow();
        article.setStatus(ArticleStatus.REJECTED);
        return articleRepository.save(article);
    }

    public List<Article> getArticlesByAuthor(String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        return articleRepository.findByAuthorId(user.getId());
    }

    public List<Article> getAllArticles() {
        return articleRepository.findAll();
    }

    public void deleteArticle(Long id) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElseThrow();
        Article article = articleRepository.findById(id).orElseThrow();

        if (user.getRole().name().equals("ADMIN") || article.getAuthor().getId().equals(user.getId())) {
            articleRepository.delete(article);
        } else {
            throw new RuntimeException("You are not authorized to delete this article");
        }
    }

    public List<Article> searchArticles(String query) {
        return articleRepository.searchArticles(query);
    }
}
