package com.mhieu100.blog.controller;

import com.mhieu100.blog.entity.Article;
import com.mhieu100.blog.service.ArticleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/articles")
@RequiredArgsConstructor
public class ArticleController {

    private final ArticleService articleService;

    @GetMapping
    public ResponseEntity<List<Article>> getAllArticles() {
        return ResponseEntity.ok(articleService.getAllApprovedArticles());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Article> getArticle(@PathVariable Long id) {
        return ResponseEntity.ok(articleService.getArticleById(id));
    }

    @GetMapping("/public")
    public ResponseEntity<List<Article>> getApprovedArticles() {
        return ResponseEntity.ok(articleService.getAllApprovedArticles());
    }

    @GetMapping("/public/{id}")
    public ResponseEntity<Article> getArticleById(@PathVariable Long id) {
        return ResponseEntity.ok(articleService.getArticleById(id));
    }

    @GetMapping("/public/search")
    public ResponseEntity<List<Article>> searchArticles(@RequestParam("query") String query) {
        return ResponseEntity.ok(articleService.searchArticles(query));
    }

    @PostMapping
    public ResponseEntity<Article> createArticle(
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam(value = "image", required = false) MultipartFile image) {
        return ResponseEntity.ok(articleService.createArticle(title, content, image));
    }

    @GetMapping("/my-articles")
    public ResponseEntity<List<Article>> getMyArticles() {
        String email = org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication()
                .getName();
        return ResponseEntity.ok(articleService.getArticlesByAuthor(email));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteArticle(@PathVariable Long id) {
        articleService.deleteArticle(id);
        return ResponseEntity.ok().build();
    }
}
