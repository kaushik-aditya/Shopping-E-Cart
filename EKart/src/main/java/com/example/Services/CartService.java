package com.example.Services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Entities.Cart;
import com.example.Repository.CartRepository;

@Service
public class CartService {
	@Autowired
	public CartRepository cartRepo;
	
	
	//API  for getting cart of a particular user
	public Cart getUserCart(int userID) {
		Optional<Cart> userCart =  cartRepo.findByUserId(userID);
		if(userCart.isPresent()) return userCart.get();
		else return null;
	}
		
}
