package com.mhieu100.blog.controller;

import com.mhieu100.blog.entity.Article;
import com.mhieu100.blog.service.ArticleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final ArticleService articleService;
    private final com.mhieu100.blog.service.UserService userService;

    @GetMapping("/users")
    public ResponseEntity<List<com.mhieu100.blog.dto.UserDto>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/pending-articles")
    public ResponseEntity<List<Article>> getPendingArticles() {
        return ResponseEntity.ok(articleService.getAllPendingArticles());
    }

    @GetMapping("/articles")
    public ResponseEntity<List<Article>> getAllArticles() {
        return ResponseEntity.ok(articleService.getAllArticles());
    }

    @PutMapping("/articles/{id}/approve")
    public ResponseEntity<Article> approveArticle(@PathVariable Long id) {
        return ResponseEntity.ok(articleService.approveArticle(id));
    }

    @PutMapping("/articles/{id}/reject")
    public ResponseEntity<Article> rejectArticle(@PathVariable Long id) {
        return ResponseEntity.ok(articleService.rejectArticle(id));
    }
}
