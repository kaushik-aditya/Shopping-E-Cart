package com.example.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.Entities.Cart;
import com.example.Entities.CartProduct;
import com.example.Entities.Product;
import com.example.Services.CartProductService;
import com.example.Services.CartService;
import com.example.Services.ProductService;

@RestController
public class CartController {
	@Autowired
	private CartService cartService;

	@Autowired
	private CartProductService cartProductService;
	
	@Autowired
	private ProductService productService;

	// GET cart
	@GetMapping("/cart/{userId}/getCart")
	public ResponseEntity<?> getCartOfUser(@PathVariable("userId") int userId) {

		try {
			Cart userCart = cartService.getUserCart(userId);
			if (userCart == null)
				return ResponseEntity.notFound().build();
			else
				return ResponseEntity.ok(userCart);
		} catch (DataAccessException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Database error: " + e.getMessage());
		}
	}

	// Get a particular cart Item with quantity 
	@GetMapping("/cart/{userId}/getCartItem/{cartitemId}")
	public ResponseEntity<?> getCartProductsAndQuantity(@PathVariable("userId") int userId,
			@PathVariable("cartitemId") int cartItemId) {
		try {
			CartProduct qunatizedProduct = cartProductService.getCartItemById(cartItemId);
			if (qunatizedProduct == null)
				return ResponseEntity.notFound().build();
			else
				return ResponseEntity.ok(qunatizedProduct);
		} catch (DataAccessException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Database error: " + e.getMessage());
		}
	}
	
	//API to add to cart
	@GetMapping("/cart/{userId}/add/{productId}")
	public ResponseEntity<?> addProductToCart(@PathVariable("userId") int userId, @PathVariable("productId") int productId){
		try {
			CartProduct newCartProduct = cartProductService.addProductInCart(userId,  productId);
			if(newCartProduct==null)  return ResponseEntity.badRequest().build();
			else return ResponseEntity.ok(newCartProduct);
		}catch (DataAccessException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Database error: " + e.getMessage());
		}
	}
	
	// remove from cart
	@GetMapping("/cart/{userId}/remove/{productId}")
	public ResponseEntity<?> deleteProductFromCart(@PathVariable("userId") int userId , @PathVariable("productId") int productId){
		try {
			Product product = productService.getExistingProduct(productId);
			cartProductService.removeProductFromCart(userId, productId);
			
			return ResponseEntity.ok(product.getProductName()+ " removed from cart");
		}catch(DataAccessException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Database error: " + e.getMessage());

		}
	}
	//decreasing quantity of product
	@GetMapping("/cart/{userId}/changeQuantity/{productId}/decrease")
	public ResponseEntity<?> decreaseProductQuantInCartProduct(@PathVariable("userId") int userId, @PathVariable("productId") int productId){
		try {
			CartProduct product = cartProductService.decreaseProductQuantity(productId, userId);
			return ResponseEntity.ok(product);
		}catch(DataAccessException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Database error: " + e.getMessage());

		}
	}
	@GetMapping("/cart/{userId}/changeQuantity/{productId}/increase")
	public ResponseEntity<?> IncreaseProductQuantInCartProduct(@PathVariable("userId") int userId, @PathVariable("productId") int productId){
		try {
			CartProduct product = cartProductService.increaseProductQuantity(productId, userId);
			return ResponseEntity.ok(product);
		}catch(DataAccessException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Database error: " + e.getMessage());

		}
	}
	
	
	
	

}
