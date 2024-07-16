package com.example.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Entities.User;
import com.example.Services.UserService;

import jakarta.transaction.Transactional;

@RestController
@RequestMapping("")
public class UserController {
	@Autowired
	private UserService userService;

	@GetMapping("/getprofile/{userId}")
	public ResponseEntity<?> getUserProfile(@PathVariable int userId ){
		try{
			User user = userService.getUserProfile(userId);
		
			if(user==null) return ResponseEntity.notFound().build();
			else return ResponseEntity.ok(user);
		}catch(DataAccessException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Database error: " + e.getMessage());

		}
		
	}

	@PostMapping("/updateprofile")
	@Transactional // rolling back in case of an error
	public ResponseEntity<String> updateUserProfile(@RequestBody User user) {
		userService.updateUserProfile(user);
		try {
			// Validate the user registration request
			userService.updateUserProfile(user);

			return ResponseEntity.status(HttpStatus.CREATED).body("User successfully registered");
		} catch (DataAccessException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Database error: " + e.getMessage());
		}

	}

	@PostMapping("/signup")
	@Transactional // it is used to roll back in case of an exception
	public ResponseEntity<?> registerUser(@RequestBody User request) {
		try {
			// Validate the user registration request
			userService.addNewUser(request);

			return ResponseEntity.status(201).body("User successfully registered");
		} catch (DataIntegrityViolationException e) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body("Product already exists.");
		} catch (DataAccessException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Database error: " + e.getMessage());
		}
	}

}
