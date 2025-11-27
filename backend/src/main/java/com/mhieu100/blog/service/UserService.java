package com.mhieu100.blog.service;

import com.mhieu100.blog.dto.ChangePasswordRequest;
import com.mhieu100.blog.dto.UpdateProfileRequest;
import com.mhieu100.blog.dto.UserProfileResponse;
import com.mhieu100.blog.entity.User;
import com.mhieu100.blog.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserProfileResponse getCurrentUserProfile() {
        User user = getCurrentUser();
        return UserProfileResponse.builder()
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole().name())
                .build();
    }

    public UserProfileResponse updateProfile(UpdateProfileRequest request) {
        User user = getCurrentUser();
        user.setName(request.getName());
        userRepository.save(user);

        return UserProfileResponse.builder()
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole().name())
                .build();
    }

    public void changePassword(ChangePasswordRequest request) {
        User user = getCurrentUser();

        // Verify current password
        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Current password is incorrect");
        }

        // Update to new password
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
    }

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public java.util.List<com.mhieu100.blog.dto.UserDto> getAllUsers() {
        return userRepository.findAll().stream()
                .map(user -> com.mhieu100.blog.dto.UserDto.builder()
                        .id(user.getId())
                        .name(user.getName())
                        .email(user.getEmail())
                        .role(user.getRole().name())
                        .build())
                .collect(java.util.stream.Collectors.toList());
    }
}
