package com.example.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.Entities.OrderProduct;
import com.example.Services.OrderProductService;

@RestController
public class OrderController {
	@Autowired
	private OrderProductService orderProductService;
	
	//Get order history
	@GetMapping("/order/{userId}/getOrders")
	public ResponseEntity<?> getAllOrdersHistory(@PathVariable("userId") int userId){
		try {
			List<OrderProduct>orderedProduct = orderProductService.getUserOrderHistory(userId);
			if(orderedProduct!=null) return ResponseEntity.ok(orderedProduct);   
			else return ResponseEntity.notFound().build();
		}catch(DataAccessException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Database error: " + e.getMessage());

		}
	}
	
	// Order proper anf GET order Summary
	@GetMapping("/order/{userId}/createOrder")
	public ResponseEntity<?> orderProductAndGetOrderSummary(@PathVariable("userId") int userId){
		try {
			List<OrderProduct>orderedProduct = orderProductService.orderTheCartProducts(userId);
			if(orderedProduct!=null) return ResponseEntity.ok(orderedProduct);   
			else return ResponseEntity.notFound().build();
		}catch(DataAccessException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Database error: " + e.getMessage());

		}
	}
	

}
