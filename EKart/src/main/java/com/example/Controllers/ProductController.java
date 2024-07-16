package com.example.Controllers;

import java.util.List;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.Entities.FIlterTags;
import com.example.Entities.Product;
import com.example.Services.ProductService;

import jakarta.transaction.Transactional;

@RestController
@RequestMapping("")
public class ProductController {
	@Autowired
	private ProductService prodService;

	// ADD PRODUCT
	// only accessible to SELLER

	@PostMapping("/products/addProduct")
	@Transactional
	public ResponseEntity<?> addNewProduct(@RequestBody Product product, @RequestParam("sellerEmail") String sellerEmail) { // ? represents any return type
		try {
			// Validate the user registration request
			Product newProduct = prodService.addAndRegisterNewProduct(product,sellerEmail);

			return ResponseEntity.status(HttpStatus.CREATED).body(newProduct);
		} catch (DataIntegrityViolationException e) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body("Product already exists.");
		} catch (DataAccessException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Database error: " + e.getMessage());
		}
	}

	// MODIFY PRODUCT
	// only accessible to SELLER
	@PostMapping("/products/update")
	@Transactional // rolling back in case of an error
	public ResponseEntity<?> updateSellerProduct(@RequestBody Product product, @RequestParam("sellerEmail") String email){
		try {
			// Validate the user registration request
			Product updatedProduct = prodService.updateAndRegisterExistingProduct(product,email);
			return ResponseEntity.status(HttpStatus.CREATED).body(updatedProduct);
		} catch (DataIntegrityViolationException e) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body("Product already exists.");
		} catch (DataAccessException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Database error: " + e.getMessage());
		}
	}

	// GET Product API
	@GetMapping("/products/getById/{productId}")
	public ResponseEntity<?> getProductDetails(@PathVariable("productId") int productId) {
		// return prodService.getExistingProduct(productId);
		try {
			Product product = prodService.getExistingProduct(productId);;
			if (product == null)
				return ResponseEntity.notFound().build();
			else
				return ResponseEntity.ok(product);
		} catch (DataAccessException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Database error: " + e.getMessage());
		}
	}

	// GET PRODUCTS BY CATEGORY
	@GetMapping("/products/{category}")
	public ResponseEntity<?> getProductByCategory(@PathVariable("category") String category) {
		try {
			List<Product> categorizedProduct = prodService.getProductsByCategory(category);
			if (categorizedProduct == null)
				return ResponseEntity.notFound().build();
			else
				return ResponseEntity.ok(categorizedProduct);
		} catch (DataAccessException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Database error: " + e.getMessage());
		}
	}

	// Get Product by Search String
	@GetMapping("/products/search/{searchString}")
	public ResponseEntity<?> getProductBykeyword(@PathVariable("searchString") String keyString) {
		try {
			List<Product> SearchedByKeywordProduct = prodService.findProductsByKeyword(keyString);
			if (SearchedByKeywordProduct == null)
				return ResponseEntity.notFound().build();
			else
				return ResponseEntity.ok(SearchedByKeywordProduct);
		} catch (DataAccessException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Database error: " + e.getMessage());
		}
	}

	// Get Filtered Product by category
	@PostMapping("/products/{category}/getFilteredProducts")
	public ResponseEntity<?> getFilteredProducts(FIlterTags tags) {

		try {
			List<Product> filteredProducts = prodService.findProductsByFilterTags(tags);
			if (filteredProducts == null)
				return ResponseEntity.notFound().build();
			else
				return ResponseEntity.ok(filteredProducts);
		} catch (DataAccessException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Database error: " + e.getMessage());
		}

	}

}
