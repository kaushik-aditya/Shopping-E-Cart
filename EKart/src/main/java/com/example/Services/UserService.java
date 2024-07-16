package com.example.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Entities.User;
import com.example.Repository.UserRepository;

import java.util.Optional;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepo;

	// signUp API
	public void addNewUser(User user) {
		userRepo.save(user);
	}

	// Get Profile (user id)
	public User getUserProfile(int id) {
		if (userRepo.findById(id) != null) {
			return userRepo.findById(id).get();
		}else {
			throw new RuntimeException("User not found with ID: " + id);
		}
		
	}

	// Modify User API
	public void updateUserProfile(User user) {
		int id = user.getUserId();
		Optional<User> optionalUser = userRepo.findById(id);

		if (optionalUser.isPresent()) {
			User oldUser = optionalUser.get();
			oldUser.setUserAddress(user.getUserAddress());
			oldUser.setUserEmail(user.getUserEmail());
			oldUser.setUserName(user.getUserName());
			oldUser.setUserPhoneNumber(user.getUserPhoneNumber());
			oldUser.setUserAddress(user.getUserAddress());

			userRepo.save(oldUser);
		} else {
			throw new RuntimeException("User not found with ID: " + id);
		}
	}
}
